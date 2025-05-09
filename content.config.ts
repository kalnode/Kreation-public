import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import TailwindColors from 'tailwindcss/colors'

// TODO: Reconcile this with the TW whitelist.
// https://github.com/kalnode/Kreation/issues/2
// Also: To satisfy TS, had to add "readonly string[]". Scrutinize this more. Is it optimal, or a workaround?
const colorValues: readonly [string, ...string[]] = ['', ...Object.keys(TailwindColors)]

export default defineContentConfig({
  collections: {

        content: defineCollection({
            type: 'page',
            source: '*.md',
            schema: z.object({
                ogimageDisableSubtitle: z.boolean()
            }),
        }),

        project: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                id_secondary: z.string().min(3).nonempty().regex(/^[a-z\\-_]+$/, { message: 'Only small caps, _, - and no spaces and!' }),
                title: z.string().min(3), // TODO: Test if this actually validates in Nuxt Content / Nuxt Studio.
                subtitle: z.string(),
                description: z.string(),
                thumbnail: z.string(),
                thumbnailAlt: z.string(),
                ogimageDisableSubtitle: z.boolean(),
                color: z.enum(colorValues), // TODO: This seems to work well; TW core color values are available at runtime.
                tags: z.array(z.string()),
                links: z.array(z.any()),
                role: z.string(),
                timeline: z.string(),
                duration: z.string(),
                robotsExclude: z.boolean()
            })
        }),

        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            schema: z.object({
                title: z.string(),
                subtitle: z.string(),
                ogimageDisableSubtitle: z.boolean(),
                description: z.string(),
                thumbnail: z.string(),
                thumbnailAlt: z.string(),
                tags: z.array(z.string()), // TODO: https://github.com/kalnode/Kreation/issues/1
                image: z.string(),
                datePublished: z.date()
            })
        })
    }
})




