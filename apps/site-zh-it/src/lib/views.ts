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

export function getReplyCount(seed: string): number {
  let hash = 17;

  for (const char of seed) {
    hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  }

  return 3 + (hash % 781);
}

export function getActivityLabel(seed: string): string {
  const options = ["1 分钟", "2 分钟", "41 分钟", "1 小时", "2 小时"];
  let hash = 11;

  for (const char of seed) {
    hash = (hash * 29 + char.charCodeAt(0)) >>> 0;
  }

  return options[hash % options.length];
}

export function getParticipants(seed: string): string[] {
  const pool = ["天", "码", "云", "栈", "AI", "Go", "TS", "DB", "Ops", "K"];
  let hash = 23;

  for (const char of seed) {
    hash = (hash * 37 + char.charCodeAt(0)) >>> 0;
  }

  return Array.from({ length: 5 }, (_, index) => pool[(hash + index * 3) % pool.length]);
}
