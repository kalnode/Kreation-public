<script setup lang="ts">

const route = useRoute()
const pageContent = ref()

const { data: page, status } = await useAsyncData(
    'blog-' + route.path,
    () => queryCollection('blog')
    .path(route.path)
    .first()
)

const { data:data_surround } = await useAsyncData('surround-' + route.path, () => {
    return queryCollectionItemSurroundings('blog', route.path)
})

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = computed(() => page.value && page.value.title ? page.value.title : 'Blog Post')
const description = computed(() => page.value && page.value.description ? page.value.description : '')
const disableSubtitle = computed(() => page.value && page.value.ogimageDisableSubtitle ? page.value.ogimageDisableSubtitle : false)

useSeoMeta({
    title: title,
    description: description,
})

defineOgImageComponent('Kreation', {
    headline: title,
    headline2: description,
    disableSubtitle: disableSubtitle
})
</script>
<template>
    <div class="page pageBlog w-full flex flex-col items-center">

        <UContainer>
            <Hero v-if="page">
                <template v-slot:title>
                    {{ page.title }}
                </template>
                <template v-slot:subtitle>
                    {{ page.description }}
                </template>
            </Hero>
        </UContainer>

        <Gallery v-if="page" :gallerySourceTarget="pageContent" />

        <div ref="pageContent" class="pageWrapper">
            <ContentRenderer class="pageContent" v-if="page" :value="page" />

            <UContainer class="pageWidth spaceBelowGalleryThumbnails mt-20 pt-14">

                <div class="pager flex flex-row items-center justify-between gap-8">
                    <div class="w-full self-end">
                        <NuxtLink v-if="data_surround?.[0]" :to="data_surround[0].path" tabindex="-1">
                            <div class="flex flex-col items-start gap-1">
                                <span class="text-sm ml-2">{{data_surround[0].title}}</span>
                                <div>
                                    <UButton aria-label="Go to previous blog post" icon="lucide:arrow-left" color="primaryMain" variant="solid" class="px-4 py-3">
                                        <span class="md:hidden">Prev</span>
                                        <span class="hidden md:block">Previous</span>
                                    </UButton>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>

                    <div class="absolute left-1/2 -translate-x-1/2 self-end">
                        <NuxtLink to="/blog" tabindex="-1">
                            <UButton aria-label="See all blog posts" icon="mingcute:home-3-fill" color="primaryMain" variant="solid" class="px-4 py-3">
                                <span class="hidden sm:block whitespace-nowrap">Blog Home</span>
                            </UButton>
                        </NuxtLink>
                    </div>

                    <div class="w-full self-end">
                        <NuxtLink v-if="data_surround?.[1]" :to="data_surround[1].path" tabindex="-1">
                            <div class="flex flex-col items-end gap-1 text-right">
                                <span class="text-sm mr-2 pl-2">{{data_surround[1].title}}</span>
                                <div>
                                    <UButton aria-label="Go to next blog post" trailingIcon="lucide:arrow-right" color="primaryMain" variant="solid" class="px-4 py-3">
                                        Next
                                    </UButton>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                </UContainer>
        </div>
    </div>
</template>