export interface ArticleSection {
  id?: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  subsections?: {
    title: string;
    text: string;
  }[];
  bullets?: {
    title: string;
    text: string;
  }[];
  callout?: {
    type: 'warning' | 'tip' | 'info';
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LocalizedArticleBody {
  intro: {
    title: string;
    paragraphs: string[];
  };
  sections: ArticleSection[];
  faqTitle: string;
  faqSubtitle: string;
  cta: {
    title: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
    badges: string[];
  };
}
