<script setup lang="ts">
import { useTagsStore } from '@/stores/tags'
const props = defineProps(["showActive"])
const store_tags = useTagsStore()
</script>
<template>
    <Tags :showActive="props.showActive" :tags="store_tags.tags.sort()" />
</template>