'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Locale } from '@/i18n/config';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          language?: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (error?: any) => void;
          size?: 'normal' | 'compact' | 'flexible';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileWidgetRef {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onSuccess?: (token: string) => void;
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  onError?: (err?: any) => void;
  locale?: string;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

// Cloudflare Turnstile Always-Pass test key for development/staging
const DEV_TEST_SITE_KEY = '1x00000000000000000000AA';

const EXPIRED_MESSAGES: Record<Locale, string> = {
  ar: 'انتهت صلاحية رمز التحقق الأمني. يرجى إعادة التحقق.',
  en: 'Security check expired. Please verify again.',
  ms: 'Pengesahan keselamatan tamat tempoh. Sila sahkan semula.',
  id: 'Verifikasi keamanan kedaluwarsa. Silakan verifikasi ulang.',
  ur: 'سیکیورٹی تصدیق کی میعاد ختم ہوگئی۔ برائے مہربانی دوبارہ تصدیق کریں۔',
  fr: 'Vérification de sécurité expirée. Veuillez réessayer.',
  es: 'Verificación de seguridad expirada. Por favor, verifique de nuevo.',
  de: 'Sicherheitsprüfung abgelaufen. Bitte erneut bestätigen.',
  tr: 'Güvenlik doğrulaması süresi doldu. Lütfen tekrar deneyin.',
  hi: 'सुरक्षा सत्यापन समाप्त हो गया। कृपया पुन: सत्यापित करें।',
};

const ERROR_MESSAGES: Record<Locale, string> = {
  ar: 'تعذر إكمال التحقق الأمني. يرجى المحاولة مرة أخرى.',
  en: 'Security challenge failed. Please try again.',
  ms: 'Cabaran keselamatan gagal. Sila cuba lagi.',
  id: 'Tantangan keamanan gagal. Silakan coba lagi.',
  ur: 'سیکیورٹی تصدیق مکمل نہ ہو سکی۔ برائے مہربانی دوبارہ کوشش کریں۔',
  fr: 'Le contrôle de sécurité a échoué. Veuillez réessayer.',
  es: 'Falló el desafío de seguridad. Por favor, inténtelo de nuevo.',
  de: 'Sicherheitsüberprüfung fehlgeschlagen. Bitte erneut versuchen.',
  tr: 'Güvenlik doğrulaması başarısız oldu. Lütfen tekrar deneyin.',
  hi: 'सुरक्षा सत्यापन विफल रहा। कृपया पुन: प्रयास करें।',
};

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  ({ onSuccess, onVerify, onExpire, onError, locale = 'en', theme = 'auto', className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const siteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.includes('placeholder')
        ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
        : DEV_TEST_SITE_KEY;

    const resetWidget = () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    };

    useImperativeHandle(ref, () => ({
      reset: resetWidget,
    }));

    useEffect(() => {
      let isMounted = true;

      const initTurnstile = () => {
        if (!isMounted || !containerRef.current || !window.turnstile || !siteKey) return;

        // Clean up previous widget instance if container already has one
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme,
            language: locale,
            callback: (token: string) => {
              if (!isMounted) return;
              setStatusMessage(null);
              onSuccess?.(token);
              onVerify?.(token);
            },
            'expired-callback': () => {
              if (!isMounted) return;
              setStatusMessage(EXPIRED_MESSAGES[locale as Locale] || EXPIRED_MESSAGES.en);
              onExpire?.();
              resetWidget();
            },
            'error-callback': (err: any) => {
              if (!isMounted) return;
              setStatusMessage(ERROR_MESSAGES[locale as Locale] || ERROR_MESSAGES.en);
              onError?.(err);
              resetWidget();
            },
          });
          widgetIdRef.current = id;
        } catch (renderError) {
          console.warn('Turnstile render warning:', renderError);
        }
      };

      // Check if script is already present
      if (window.turnstile) {
        initTurnstile();
      } else {
        const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            initTurnstile();
          };
          document.head.appendChild(script);
        } else {
          // Poll until turnstile is available
          const interval = setInterval(() => {
            if (window.turnstile) {
              clearInterval(interval);
              initTurnstile();
            }
          }, 100);
          return () => clearInterval(interval);
        }
      }

      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
        }
      };
    }, [siteKey, locale, theme, onSuccess, onExpire, onError]);

    return (
      <div
        className={`turnstile-container pointer-events-none fixed -top-[9999px] -left-[9999px] w-0 h-0 opacity-0 overflow-hidden ${className}`}
        aria-hidden="true"
        tabIndex={-1}
      >
        <div ref={containerRef} />
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
