<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { delay } from '@/scripts/utils'

const props = defineProps({
    gallerySourceTarget: Object as PropType<HTMLElement>
})

const store = useAppStore()
const allImages = ref<NodeListOf<HTMLImageElement>>()
const allImages_Array = ref<Array<HTMLImageElement>>()
const eventBound = ref(false)
const imageGalleryOpen = ref()

const setupGallery = async () => {

    // TODO: Improve image scan on page load
    // https://github.com/kalnode/Kreation/issues/16

    if (!eventBound.value && props.gallerySourceTarget && props.gallerySourceTarget && props.gallerySourceTarget.hasChildNodes() && props.gallerySourceTarget.querySelectorAll('img')) {
        eventBound.value = true

        // TODO: Figure out why delay is needed here, lest images won't get processed.
        // because when hot reload occurs, allImages not available right away.
        // Something to do with order of events on page load.
        await delay(100)
        //await nextTick()

        allImages.value = props.gallerySourceTarget.querySelectorAll('img')

        allImages_Array.value = Array.from(allImages.value)

        for (let i = 0; i < allImages_Array.value.length; i++) {

            const element = allImages_Array.value[i]
            
            if (element && element.parentElement) {
                element.parentElement.addEventListener("click", () => handleImageClick(i))
                element.parentElement.classList.add("clickableGallery")
                element.classList.add("hoverImage")
                element.parentElement.setAttribute('data-clickableGallery-count', (i+1) + "/" + allImages.value.length)
            }
        }
    }    
}

const destroyGallery = () => {
    closeGallery()
    if (allImages.value) {
        allImages.value.forEach( (element: any) => {
            element.removeEventListener("click", () => handleImageClick)
        })
        eventBound.value = false
    }    
}

onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            setupGallery()            
        }, 100)
    })
})

onBeforeUnmount(() => {
    destroyGallery()
})

const imageGalleryStartIndex = ref()

const handleImageClick = (index?:number) => {
    imageGalleryStartIndex.value = index
    imageGalleryOpen.value = true
}

const closeGallery = () => {
    imageGalleryStartIndex.value = undefined
    store.removeScrollPadding()
}
</script>

<template>
    <div>

        <UModal
        v-model:open="imageGalleryOpen"
        fullscreen
        title="Image gallery for the page"
        description="All of the images in the article, displayed in a gallery format"
        @update:open="() => store.addScrollPadding()"
        @close="closeGallery()">

            <template #content>
                <div class="w-full h-full relative pb-16 flex justify-center items-center">
                    
                    <UButton aria-label="Close the gallery" color="neutral" variant="outline"
                    class="bg-transparent text-black absolute z-10 top-1 right-1 cursor-pointer rounded-full !p-0" @click="imageGalleryOpen = false">
                        <UIcon class="size-8" name="ic:baseline-close" />        
                    </UButton>

                    <UCarousel v-slot="{ item }" :items="allImages_Array"
                    arrows
                    dots
                    wheel-gestures
                    :startIndex="imageGalleryStartIndex"
                    class="carousel cursor-pointer">    
                        <NuxtImg v-if="item" :src="(item as HTMLImageElement).getAttribute('data-orig-src')" @click.self="imageGalleryOpen = false"
                        :alt="(item as HTMLImageElement).getAttribute('alt') ? (item as HTMLImageElement).getAttribute('alt') : 'Carousel image'"
                        class="w-full h-full" />
                    </UCarousel>
                    
                </div>
            </template>
            
        </UModal>

    </div>
</template>
<style>

/* --------------------------------- */
/* THUMBNAIL EXTRA ELEMENTS */
/* --------------------------------- */
.clickableGallery {
    cursor: pointer;
    position: relative;
    --iconSize: 0.9rem;
    --opacity: 0.75;
}

/* "FULLSCREEN" ICON */
.clickableGallery::before {
    visibility: hidden;
    position: absolute;
    bottom: -1.5rem;
    right: 0.75rem;
    opacity: var(--opacity);
    color: inherit;
    width: var(--iconSize);
    height: var(--iconSize);
    --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z'/%3E%3C/svg%3E");
    content:'';
    -webkit-mask: var(--un-icon) no-repeat;
    mask: var(--un-icon) no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    background-color: currentColor;
    z-index: 10;
}

/* IMAGE COUNT */
[data-clickableGallery-count]::after {
    visibility: hidden;
    content: attr(data-clickableGallery-count);
    position: absolute;
    bottom: -1.125rem;
    right: calc(var(--iconSize) + 2rem);
    width: var(--iconSize);
    height: var(--iconSize);
    font-size: var(--iconSize);
    opacity: var(--opacity);
}


/* --------------------------------- */
/* CAROUSEL */
/* --------------------------------- */

.carousel {
    height: 100%;
}

.carousel > * {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(193, 193, 193, 0.327);
}

.carousel > div:nth-child(1) {
    background-color: #00000012;
    border-bottom: 1px solid rgba(193, 193, 193, 0.327);
}

.carousel > div:nth-child(1) > * {
    width: 100%;
    height: 100%;

    /* margin-inline-start: calc(var(--spacing)* -4); */
}

.carousel > div:nth-child(2) {
    pointer-events: none;
}

.carousel button {
    pointer-events: auto;
}


.carousel [aria-roledescription="slide"] {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline-start: calc(var(--spacing) * 8);
}

.carousel [aria-roledescription="slide"] img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.carousel button[aria-label="Prev"] {
    inset-inline-start: 1rem;
}

.carousel button[aria-label="Next"] {
    inset-inline-end: 1rem;
}
</style>