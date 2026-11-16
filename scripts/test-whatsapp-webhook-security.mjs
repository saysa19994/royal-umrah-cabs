import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { verifyWhatsAppSignature, detectIncomingLanguage } from '../src/lib/whatsapp-signature.js';
const src = readFileSync(new URL('../src/app/api/webhooks/whatsapp/route.ts', import.meta.url),'utf8');
test('Meta HMAC verifies exact raw bytes and rejects invalid or missing signatures',()=>{
  const body=Buffer.from('{"object":"whatsapp_business_account","entry":[]}');
  const secret='integration-test-app-secret';
  const good='sha256='+createHmac('sha256',secret).update(body).digest('hex');
  assert.equal(verifyWhatsAppSignature(body,good,secret),true);
  assert.equal(verifyWhatsAppSignature(Buffer.concat([body,Buffer.from(' ')]),good,secret),false);
  assert.equal(verifyWhatsAppSignature(body,good,'wrong'),false);
  assert.equal(verifyWhatsAppSignature(body,'sha256=abcd',secret),false);
  assert.equal(verifyWhatsAppSignature(body,null,secret),false);
});
test('Message language takes priority over phone country',()=>{
  assert.equal(detectIncomingLanguage('Merhaba, havalimanı fiyat nedir?', '966500000000'),'tr');
  assert.equal(detectIncomingLanguage('Hello, how much to Makkah?', '966500000000'),'en');
  assert.equal(detectIncomingLanguage('Bonjour, quel tarif ?', '966500000000'),'fr');
  assert.equal(detectIncomingLanguage('السلام عليكم','905000000000'),'ar');
  assert.equal(detectIncomingLanguage('سلام کیا کرایہ ہے؟','923000000000'),'ur');
});
test('Webhook stays off by default and requires signature, phone ID and idempotency',()=>{
  assert.match(src,/WHATSAPP_CLOUD_API_ENABLED === 'true'/);
  assert.match(src,/x-hub-signature-256/);
  assert.match(src,/verifyWhatsAppSignature\(rawBody/);
  assert.match(src,/cfg\.phoneNumberId/);
  assert.match(src,/whatsapp_webhook_events/);
  assert.match(src,/error\?\.code === '23505'/);
  assert.doesNotMatch(src,/duyuf_alrahman_vip_token/);
  assert.match(src,/Türkçe konuşan şoför hizmetimiz bulunmamaktadır/);
});
