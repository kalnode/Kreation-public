<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
const store = useAppStore()
const props = defineProps(["data"])
const router = useRouter()
const checkLink = (link:string) => {
    if (link === router.currentRoute.value.path) {
        store.search.openDrawer = false
    }
}
</script>
<template>
    <div>
        <ul v-if="data" class="list_unstyled flex flex-col gap-6">
            <li v-for="(link, index) of props.data" :key="'link-'+index">
                <NuxtLink :to="link.path" @click="checkLink(link.path)" class="w-full flex gap-4 items-center hover:bg-(--ui-bg-lighter) p-2 m-0.5">
                    <div class="justify-self-end text-right capitalize" style="flex: 1; min-width: 3.5rem;">
                        <UBadge :color="link.type === 'project' ? 'info': link.type === 'blog' ? 'warning' : 'neutral'" variant="outline"
                        class="bg-(--color-bg)">
                            {{ link.type }}
                        </UBadge>
                    </div>
                    <div class="flex flex-col justify-center p-2" style="flex: 7;">
                        {{ link.title }}
                        <span class="text-gray-500 text-xs">
                            {{ link.description?.slice(0, 100) }}...
                        </span>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>