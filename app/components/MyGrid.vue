<script setup lang="ts">
const props = defineProps<{
    fullSize?: boolean
    forceCols?: number
    images: Array<{
        url: string
        wide: boolean
        alt: string
    }>
}>()

const numberOfCols = computed( () => {
    if (props.forceCols) {
        return props.forceCols
    } else {
        const min = 1
        const max = 3
        const numItems = props.images.length
        return Math.min(Math.max(numItems, min), max)
    }
})
</script>
<template>
    <div class="spaceBelowGalleryThumbnails flex justify-center">
        <ul class="gridCore list_unstyled w-full max-w-4xl">
            <li v-for="(image, index) in images" :key="'project-'+index" :class="{'wide' : image.wide}">
                <MyImage :src="image.url" :useImgix="true"
                :fullSize="props.fullSize"
                :densities="'x1 x2'"
                :sizes="'100vw sm:50vw'"
                :alt="image.alt ? image.alt : 'Thumbnail of project'"
                class="transform transition-transform hover:translate-y-1.5" />
            </li>
        </ul>
    </div>
</template>
<style scoped>
.gridCore {
    grid-template-columns: repeat(v-bind(numberOfCols), auto);
}
</style>