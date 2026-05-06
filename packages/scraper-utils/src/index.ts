export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaFAQ {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export function formatToSchemaFAQ(data: FAQItem[]): SchemaFAQ {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data
      .filter((item) => item.question.trim() && item.answer.trim())
      .map((item) => ({
        "@type": "Question",
        name: sanitizeHtml(item.question),
        acceptedAnswer: {
          "@type": "Answer",
          text: sanitizeHtml(item.answer)
        }
      }))
  };
}

export function sanitizeHtml(content: string): string {
  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:.*?\2/gi, "")
    .trim();
}
