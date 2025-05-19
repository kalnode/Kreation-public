<script setup lang="ts">
const route = useRoute()

let query: string

if (useRoute().query && useRoute().query.tags) {
    let work = JSON.parse(JSON.stringify(useRoute().query.tags))
    query = work.split(',')
} else if (route.params.query) {
    query = JSON.stringify(route.params.query)
}

const title = computed(() => query ? query : '(unknown)')

useSeoMeta({
    title: 'Query: ' + title.value,
    description: 'Searching for: ' + title.value,
})

const emit = defineEmits(['openTopicDrawer'])

// TODO: Support array of items in LIKE queries
// https://github.com/kalnode/Kreation/issues/11
const { data:data_projects, status:status_projects } = await useAsyncData('project-'+route.path, () => {
    return queryCollection('project')
    .where('tags', 'LIKE', `%${query}%`)
    .all()
})

const { data:data_blogs, status:status_blogs } = await useAsyncData('blog-'+route.path, () => {
    return queryCollection('blog')
    .where('tags', 'LIKE', `%${query}%`)
    .all()
})

const filterSelections = ref({
    projects: true,
    blog: true
})

const results = computed( () => {
    let output: any[] = []
    if (filterSelections.value.projects && data_projects.value) {
        output = [...output, ...data_projects.value.map( (x:any) => { return { ...x, type: 'project' } })]
    }
    if (filterSelections.value.blog && data_blogs.value) {
        output = [...output, ...data_blogs.value.map( (x:any) => { return { ...x, type: 'blog' } })]
    }
    return output
})
</script>
<template>
    <div class="w-full h-full">
        <div class="flex justify-between items-center gap-2 mb-4">
            <h4 v-for="(item, index) in query">
                {{ item }}{{ (query && query.length > 1) && index <= query.length ? ',' : ''  }}
            </h4>
            <div class="flex flex-wrap items-center gap-4">
                <div class="cursor-pointer">
                    <USwitch v-model="filterSelections.projects" checked-icon="lucide:check" aria-label="Toggle projects filter" label="Projects" />
                </div>
                <div class="cursor-pointer">
                    <USwitch v-model="filterSelections.blog" checked-icon="lucide:check" aria-label="Toggle blogs filter" label="Blog"  />
                </div>
            </div>
        </div>

        <div v-if="status_projects != 'pending' && status_blogs != 'pending'">

            <!-- RESULT FOUND -->
            <Results v-if="results && results.length > 0" :data="results" />

            <!-- NO RESULTS FOUND -->
            <div v-else class="w-full h-full flex flex-col items-center">                
                <h3 class="mt-24 mb-3">No results found</h3>
                <p class="hidden sm:block">Try something else</p>
                <UButton aria-label="Open topics menu" class="sm:hidden" color="neutral" variant="outline" @click="emit('openTopicDrawer')">
                    Open topics menu
                </UButton>
            </div>

        </div>

    </div>
</template>