<script setup lang="ts">

const route = useRoute()
const pageContent = ref()

const { data: page, status } = await useAsyncData(
    'project-' + route.path,
    () => queryCollection('project')
    .path(route.path)
    .first()
)

const { data:data_surround } = await useAsyncData('surround-' + route.path, () => {
    return queryCollectionItemSurroundings('project', route.path)
})

const title = computed(() => page.value && page.value.title ? page.value.title : 'Project')
const description = computed(() => page.value && page.value.description ? page.value.description : '')
const disableSubtitle = computed(() => page.value && page.value.ogimageDisableSubtitle ? page.value.ogimageDisableSubtitle : false)

useSeoMeta({
    title: title,
    description: description,
    robots: page.value?.robotsExclude ? 'noindex, follow' : null
})

defineOgImageComponent('Kreation', {
    headline: title,
    headline2: description,
    disableSubtitle: disableSubtitle
})
</script>

<template>
    <div class="page pageProject w-full flex flex-col items-center">
        
        <UContainer>
            <HeroProject v-if="page" :tags=page.tags :links=page.links>
                <template v-slot:title>
                    {{ page.title }}
                </template>
                <template v-slot:subtitle>
                    {{ page.description }}
                </template>
                <template v-slot:timeline>
                    {{ page.timeline }}
                    <span v-if="page.duration" class="text-sm">({{ page.duration }})</span>
                </template>
                <template v-slot:role>
                    {{ page.role }}
                </template>
            </HeroProject>
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
                                    <UButton aria-label="Go to previous project page" icon="lucide:arrow-left" color="primaryMain" variant="solid" class="px-4 py-3">
                                        <span class="md:hidden">Prev</span>
                                        <span class="hidden md:block">Previous</span>
                                    </UButton>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>

                    <div class="absolute left-1/2 -translate-x-1/2 self-end">
                        <NuxtLink to="/projects" tabindex="-1">
                            <UButton aria-label="See all projects" icon="ic:round-grid-view" color="primaryMain" variant="solid" class="px-4 py-3">
                                <span class="hidden sm:block whitespace-nowrap">All Work</span>
                            </UButton>
                        </NuxtLink>
                    </div>

                    <div class="w-full self-end">
                        <NuxtLink v-if="data_surround?.[1]" :to="data_surround[1].path" tabindex="-1">
                            <div class="flex flex-col items-end gap-1 text-right">
                                <span class="text-sm mr-2 pl-2">{{data_surround[1].title}}</span>
                                <div>
                                    <UButton aria-label="Go to next project page" trailingIcon="lucide:arrow-right" color="primaryMain" variant="solid" class="px-4 py-3">
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