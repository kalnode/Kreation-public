<script setup lang="ts">
import Fuse from 'fuse.js'

const { data:data_projects, status:status_projects } = useAsyncData('search-project-data', () => queryCollection('project').all())
const { data:data_blogs, status:status_blogs } = useAsyncData('search-blog-data', () => queryCollection('blog').all())

let fuseClient: Fuse<{ id: string; title: string; titles: string[]; level: number; content: string; }>
const query = ref('')
const firstOpening = ref(true)
const results = ref()

onMounted(() => {
    if (dataMerged.value) {
        fuseClient = new Fuse(dataMerged.value, {
            keys: ['title', 'subtitle', 'description', 'role', 'tags', 'timeline']
        })
    }
})

const dataMerged = computed( () => {
    let output: any[] = []
    if (data_projects.value) {
        output = [...output, ...data_projects.value.map( (x:any) => { return { ...x, type: 'project' } })]
    }
    if (data_blogs.value) {
        output = [...output, ...data_blogs.value.map( (x:any) => { return { ...x, type: 'blog' } })]
    }
    return output
})

const runSearch = () => {
    firstOpening.value = false
    if (fuseClient && query.value) {
        const work = fuseClient.search(toValue(query.value)).slice(0, 10)
        // Fuse.js results have some meta. Here we flatten them here to properly feed <Results />.
        // <Results /> is used by other parts of the app in non-Fuse contexts.
        results.value = work.map( (x:any) => x.item)
    }
}

const resetSearch = () => {
    results.value = undefined
    query.value = ''
}
</script>

<template>
    <div class="w-full h-full flex flex-col gap-6">

        <UInput
        v-model="query"
        @input="runSearch()"
        size="xl"
        autofocus
        :loading="status_projects === 'pending' || status_blogs === 'pending' ? true : false"
        loading-icon="svg-spinners:90-ring-with-bg"
        :ui="{ trailing: 'pe-1' }"
        icon="lucide:search"
        variant="subtle"
        placeholder="Search for anything, like 'typescript', 'database', 'design', etc..."
        class="w-full mb-2">
            <template v-if="query?.length" #trailing>
                <UButton
                    color="neutral" variant="outline"
                    size="sm"
                    icon="ic:baseline-close"
                    aria-label="Clear input"
                    class="cursor-pointer rounded-full"
                    @click="resetSearch()"
                />
            </template>
        </UInput>

        <div v-if="query">
            Searching for: "{{ query }}"
        </div>

        <div v-if="results" class="flex-1 overflow-y-auto overflow-x-hidden pr-1">
            <Results :data="results" />
        </div>
        <div v-if="results && results.length < 1" class="w-full h-full flex flex-col items-center p-4 mb-4">
            <h3 class="mb-3">No results found</h3>
            <p class="pb-4">Try something else</p>
            <hr />
        </div>

        <div v-if="!results || results.length < 1">
            <div class="flex flex-col gap-6 w-full">
                <div class="max-w-xl m-auto">
                    <TagsBrowse />
                </div>

                <div class="flex flex-wrap gap-2 md:gap-4 justify-center items-center">

                    <div class="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                        <NuxtLink to="/" tabindex="-1"><UButton size="xl" class="px-2 sm:px-4 cursor-pointer" color="primaryMain" variant="solid">Home</UButton></NuxtLink>
                        <NuxtLink to="/projects" tabindex="-1"><UButton size="xl" class="px-2 sm:px-4 cursor-pointer" color="primaryMain" variant="solid">Work</UButton></NuxtLink>
                        <NuxtLink to="/about" tabindex="-1"><UButton size="xl" class="px-2 sm:px-4 cursor-pointer" color="primaryMain" variant="solid">About</UButton></NuxtLink>
                        <NuxtLink to="/contact" tabindex="-1"><UButton size="xl" class="px-2 sm:px-4 cursor-pointer" color="primaryMain" variant="solid">Contact</UButton></NuxtLink>
                    </div>

                    <ExternalProfiles />
                </div>
            </div>
        </div>

    </div>
</template>