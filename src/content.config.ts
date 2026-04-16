import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        category: z.string(),
        categoryClass: z.string().optional().default("bg-white text-black"),
        readTime: z.string(),
        date: z.coerce.date().optional(),
        
        // Media
        imageSrc: z.string(),
        imageAlt: z.string(),
        
        // Header info
        authorName: z.string().optional().default("BitPopulus Team"),
        authorAvatar: z.string().optional(),
        
        featured: z.boolean().optional().default(false),
        translationKey: z.string().optional()
    })
});

export const collections = { blog };
