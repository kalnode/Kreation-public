<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
    return queryCollection('content').path(route.path).first()
})

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const pageContent = ref()
const title = computed(() => page.value && page.value.title ? page.value.title : 'Project')
const description = computed(() => page.value && page.value.description ? page.value.description : '')
const disableSubtitle = computed(() => page.value && page.value.ogimageDisableSubtitle ? page.value.ogimageDisableSubtitle : false)

useSeoMeta({
    title: title,
    description: description
})

defineOgImageComponent('Kreation', {
    headline: title,
    headline2: description,
    disableSubtitle: disableSubtitle
})
</script>

<template>
    <div class="page pageProject w-full flex flex-col items-center">

        <Hero v-if="page">
            <template v-slot:title>
                {{ page.title }}
            </template>
            <template v-slot:subtitle>
                {{ page.description }}
            </template>
        </Hero>

        <Gallery v-if="page" :gallerySourceTarget="pageContent" />

        <div ref="pageContent" class="pageWrapper">
            <ContentRenderer class="pageContent" v-if="page" :value="page" />
        </div>

    </div>
</template>
