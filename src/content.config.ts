// Astro 5 content layer config. Collections defined here are queryable via
// `getCollection('posts')` anywhere in the codebase.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TAGS } from './consts';

const posts = defineCollection({
  // Each post is a folder under src/content/posts/ containing index.md +
  // its images. The folder name becomes the post slug.
  loader: glob({ pattern: '**/index.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      // --- Display ---
      title: z.string(),
      description: z.string(), // short teaser shown in cards + meta description
      body: z.string().optional(), // APOD-style writeup can live in markdown body instead

      // --- Dates ---
      capturedAt: z.coerce.date(),
      publishedAt: z.coerce.date(),

      // --- Classification ---
      target: z.string(), // e.g. "Antares (Alpha Scorpii)"
      tags: z.array(z.enum(TAGS)).min(1),

      // --- Images (paths relative to the post folder) ---
      beforeImage: image(),
      afterImage: image(),
      thumbnail: image().optional(), // falls back to afterImage if omitted
      stages: z
        .array(
          z.object({
            image: image(),
            caption: z.string(),
          })
        )
        .optional(),

      // --- Capture metadata ---
      location: z.string().optional(),
      direction: z.string().optional(),
      bortle: z.number().int().min(1).max(9).optional(),
      camera: z.string(), // e.g. "Google Pixel 9 Pro XL, Night Mode"
      exposure: z.string(), // e.g. "4 min single exposure"
      frames: z.number().int().positive().default(1),

      // --- Processing ---
      processingSoftware: z.array(z.string()).default([]),
      processingNotes: z.string().optional(),

      // --- Flags ---
      featured: z.boolean().default(false), // pin as homepage hero
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
