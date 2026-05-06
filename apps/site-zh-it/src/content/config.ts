import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(),
    publishedAt: z.coerce.date(),
    readingTime: z.string()
  })
});

export const collections = {
  articles
};
