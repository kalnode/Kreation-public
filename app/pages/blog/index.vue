<script setup lang="ts">
import { twoSequence, isEven } from '@/scripts/utils'


defineOgImageComponent('Kreation', {
    headline: "Blog"
})

const { data: blogs, status } = await useAsyncData('blog', () => queryCollectionNavigation('blog', ['title', 'subtitle', 'description', 'thumbnail', 'thumbnailAlt']))
.then( (response) => {
    return response
})
</script>

<template>
    <UContainer class="w-full flex flex-col items-center">

        <Hero>
            <template v-slot:title>
                Blog
            </template>
        </Hero>

        <ul v-if="blogs && blogs[0]" class="gridProjects gridCore list_unstyled w-full max-w-4xl">
            <li v-for="(blog, index) in blogs[0].children" :key="'blog-'+index"
            :class="[
                blogs[0].children && blogs[0].children.length === index+1 ? 'last' : '',
                blogs[0].children && blogs[0].children.length === index+1 && isEven(index) ? 'fullWidth' : ''
            ]"
            class="project text-(--green-lighter) saturate-90">
                <section-container
                :imgSrc="blog.thumbnail"
                :imgAlt="blog.thumbnailAlt"
                :url="blog.path"
                class="bg-white">
                    <template v-slot:title>
                        {{ blog.title }}
                    </template>
                    <template v-slot:subtitle>
                        {{ blog.subtitle }}
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