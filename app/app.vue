<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()


// =========================================================
// TODO: Abstract scroll listener object to composable
// https://github.com/kalnode/Kreation/issues/6

const previousScrollTop = ref(0)

onMounted(() => {
    if (document.readyState !== 'loading') {
        document.addEventListener('scroll', handleScroll)
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('scroll', handleScroll)
        })
    }

    handleScroll()
})

onUnmounted( () => {
    document.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
    const currentScrollTop = document.documentElement.scrollTop
    store.scrolling.isAtTopOfPage = currentScrollTop === 0 ? true : false
    store.scrolling.scrollTop = currentScrollTop
    previousScrollTop.value = currentScrollTop
}
// =========================================================

</script>
<template>
    <UApp>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>