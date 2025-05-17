<script setup lang="ts">
import { useAppStore } from '@/stores/app'

preloadComponents('TagsBrowse')

const store = useAppStore()
const route = useRoute()
const desktopEnableStickySidebar = ref()

definePageMeta({
    pageTransition: false
})

defineOgImageComponent('Kreation', {
    headline: "Search"
})

watch( route, value => {
    closeSidebar()
})

const openSidebar = () => {
    store.sidebar.open = true
}

const closeSidebar = () => {
    store.sidebar.open = false
}
</script>
<template>
    <UContainer class="w-full h-full max-w-4xl flex flex-col justify-stretch sm:flex-row gap-4 relative">

        <!-- DESK SIDEBAR -->
        <div :class="{ 'sticky top-0 h-full max-h-screen overflow-auto' : desktopEnableStickySidebar }" class="text-right hidden sm:block">
            <p class="font-bold mb-4">Explore topics</p>
            <TagsBrowse :showActive="true" class="flex-col" />
        </div>

        <!-- MOBILE BUTTON -->
        <!-- Opens sidebar drawer (lives in app.vue) -->
        <div>
            <UButton aria-label="Open topics menu" icon="lucide:menu" size="xl" color="primaryMain" variant="solid" @click="openSidebar()" class="sm:hidden cursor-pointer">
                Topics
            </UButton>
        </div>

        <!-- CONTENT VIEW -->
        <div class="flex-1 p-4 px-6 rounded-xl containerBG justify-stretch" :style="[
            desktopEnableStickySidebar ? 'min-height: 150vh' : '',
            'min-height: 75vh;'
        ]">
            <NuxtPage :pageKey="route.fullPath" @openTopicDrawer="closeSidebar()" />
        </div>

    </UContainer>
</template>