<script setup lang="ts">

const props = defineProps(["src", "useImgix", "fullSize", "hover", "alt", "sizes", "densities", "quality"])
const emit = defineEmits(['isLoaded', 'error', 'animationend'])
const img = ref()

onMounted(() => {
    rawImageCheck()
})

const rawImageCheck = () => {
    const element = img.value.$el as HTMLImageElement

    if (element) {
        element.onerror = (event) => emit('error', event)
        element.onanimationend = (event) => emit('animationend', event)
    }

    nextTick(() => {
        if (!element || !element.complete) return

        emit('isLoaded')

        if (element.naturalWidth === 0) {
            emit('error')
        }
    })
}
</script>

<template>
    <div :class="props.fullSize ? 'w-full h-full' : 'w-auto h-auto'" class="relative">
        <NuxtImg ref="img"
        :data-orig-src="props.src"
        :provider="'imgix'"
        :src="props.src"
        @load="emit('isLoaded')"
        :quality="props.quality ? props.quality : 80"
        :sizes="props.sizes"
        :densities="props.densities"
        :alt="props.alt ? props.alt : 'Image'"
        :class="props.hover ? 'transition-transform transform hover:scale-105' : ''"
        :modifiers="props.useImgix ? { auto: 'format,compress' } : undefined"
        class="image" />
    </div>
</template>

<style scoped>
.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--ui-bg);
}
</style>