<script setup lang="ts">
const route = useRoute()
const props = defineProps<{
    tags: Array<string>
    showActive?: boolean
}>()
</script>
<template>
    <ul class="color-mode-invert list_unstyled flex justify-center flex-wrap gap-2 sm:gap-1.5">
        <li v-for="(tag, index) in tags" :key="'tag'+index">
            <NuxtLink :to="'/search?tags='+tag"
            :class="[{'active-exact-query': props.showActive && route.query?.tags === tag }]"
            class="relative" tabindex="-1">
                <UButton :aria-label="'Link to' + tag" size="sm" class="capitalize bg-(--ui-bg-lighter) text-(--ui-text) hover:text-(--ui-bg-lighter)">{{ tag }}</UButton>
            </NuxtLink>
        </li>
    </ul>
</template>
<style scoped>
.active-exact-query > * {
    color: var(--ui-bg);
    background-color: var(--color-accent);
}

.active-exact-query > *::after {
    content: '';
    position: absolute;
    right: -0.25em;
    font-weight: bold;
    color: var(--ui-bg-lighter);
    border-right: solid 2px;
    height: 100%;
    opacity: 0.5;
}
</style>