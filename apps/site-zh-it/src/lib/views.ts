export function getArticleViews(seed: string): number {
  let hash = 0;

  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return 500 + (hash % 1001);
}

export function formatViews(views: number): string {
  return views.toLocaleString("zh-CN");
}
