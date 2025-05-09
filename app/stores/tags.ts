import { defineStore } from 'pinia'

type newStore = {
    tags: Array<string>
}
  
export const useTagsStore = defineStore('TagsStore', () => {

    const state = ref<newStore>({

        // TODO: Make global source-of-truth for tags
        // https://github.com/kalnode/Kreation/issues/1
        tags: [
            'Vue', 'Nuxt', 'React', 'Javascript', 'Typescript',
            'Tailwind', 'HTML/CSS', 'Canvas', 'WebSocket',
            'UI/UX', 'Figma', 'Design', 'Storybook',
            'Database', 'MySQL', 'SQLite',
            'CMS', 'Strapi', 'Wordpress', 'Nuxt Content',
            'Elasticsearch',
            'Podcast'
        ]
    })

    return { ...state.value }
})