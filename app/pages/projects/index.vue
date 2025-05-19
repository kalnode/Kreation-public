<script setup lang="ts">
import { twoSequence, isEven } from '@/scripts/utils'

// TODO: (desktop bug?) Scrutinize whether there's a cache issue with the generated pattern,
// and the thumbnail grid breaking when going in-and-out of the Work page.
// https://github.com/kalnode/Kreation/issues/12

const patternThumbnails = ref()
const subtitle = "Adventures and battles"

useSeoMeta({
    description: subtitle,
})

defineOgImageComponent('Kreation', {
    headline: "Projects"
})

const { data: projects, status } = await useAsyncData('projects', () => queryCollectionNavigation('project', ['title', 'subtitle', 'description', 'thumbnail', 'thumbnailAlt', 'color']))
.then( (response) => {
    if (response.data.value && response.data.value[0] && response.data.value[0].children) {
        let work = twoSequence(0, response.data.value[0].children.length, 3, 1)
        patternThumbnails.value = work
    }
    return response
})
</script>

<template>
    <UContainer class="w-full flex flex-col items-center">

        <Hero>
            <template v-slot:title>
                Work
            </template>
            <template v-slot:subtitle>
                {{ subtitle }}
            </template>
        </Hero>

        <ul v-if="projects && projects[0]" class="gridProjects gridCore list_unstyled w-full max-w-4xl">
            <li v-for="(project, index) in projects[0].children" :key="'project-'+index"
            :class="[
                patternThumbnails && patternThumbnails.includes(index+1) ? 'wide' : '',
                projects[0].children && projects[0].children.length === index+1 ? 'last' : '',
                projects[0].children && projects[0].children.length === index+1 && isEven(index) ? 'fullWidth' : ''
            ]"
            class="project text-(--green-lighter) saturate-90">
                <section-container
                :class="project.color === 'white' || project.color === 'black' ? 'bg-'+project.color : 'bg-'+project.color+'-200'"
                :imgSrc="project.thumbnail"
                :imgAlt="project.thumbnailAlt"
                :url="project.path">
                    <template v-slot:title>
                        {{ project.title }}
                    </template>
                    <template v-slot:subtitle>
                        {{ project.subtitle }}
                    </template>                
                </section-container>
            </li>

        </ul>

    </UContainer>
</template>
<style scoped>
ul {
    position: relative;
    width: 100%;
}
</style>