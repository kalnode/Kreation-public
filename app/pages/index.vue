<script setup lang="ts">

definePageMeta({
    title: 'Home'
})

// Default ogimage for entire website
defineOgImageComponent('Kreation', {
    barebones: true,
    // TODO: Can we eliminate this static URL?
    imageSrc: "https://kreation.imgix.net/images/photos/kal_driving_with_filter.png?auto=format,compress&w=460&q=80"
})

// TODO: Make tags global
// https://github.com/kalnode/Kreation/issues/1
const techStack = [ 'Vue', 'React', 'Nuxt', 'Typescript', 'Tailwind', 'NodeJS', 'AI', 'Elasticsearch', 'Strapi', 'Heroku', 'AWS', 'Ionic Capacitor' ]

const homepageProjects = ref([
    { id: 'eimu' },
    { id: 'vitalbio' },
    { id: 'inkbox' },
    { id: 'sportslit' },
])

const { data: projects, status } = await useAsyncData('projects-homepage', () => queryCollection('project').all())

const projectsFiltered = computed( () => {
    if (projects.value) {
        return projects.value
        .filter( (x:any) => homepageProjects.value.find( (y:any) => y.id === x.id_secondary) )
        // Sort based on homepageProjects; we use unique id (id_secondary) to do this
        .sort((a,b) => { 
            const indexA = homepageProjects.value.findIndex(type => a.id_secondary === type.id)
            const indexB = homepageProjects.value.findIndex(type => b.id_secondary === type.id)
            return indexA - indexB
        })
    }
})

const heroImageLoaded = ref()

const setHeroImageLoaded = () => {
    // TODO: Keeping this extra function now to help scrutinize loading jankyness
    console.log("Hero image loaded")
    heroImageLoaded.value = true
}
</script>

<template>
    <div class="w-full h-full flex flex-col items-center">

        <UContainer class="heroContainer w-full flex-1 relative flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 lg:my-14">

            <div class="heroImage bordered w-full h-full max-w-1/2 lg:max-w-96 rounded-full overflow-hidden aspect-square">
                <Transition name="fadeQuickest" appear mode="out-in">
                    <MyImage
                    v-show="heroImageLoaded"
                    src="PXL_20230813_141553507.jpg"
                    sizes="50vw md:30vw"
                    densities="x1 x2"
                    :quality="70"
                    :fullSize="true"
                    :useImgix="true"
                    alt="Photo of Kal driving a car and not crashing"
                    @isLoaded="setHeroImageLoaded()"
                     />
                </Transition>
            </div>

            <div class="flex flex-col justify-center lg:justify-start items-center lg:items-start lg:gap-2 text-center lg:text-left">

                <div>
                    <h1 class="flex flex-col">
                        <span class="sm:text-5xl" style="white-space: nowrap;">
                            Hi I'm Kal...
                        </span>
                        <span class="text-3xl sm:text-4xl" style="white-space: nowrap;">
                            a software developer
                        </span>
                    </h1>
                </div>

                <h2 class="w-full flex flex-col pt-4">
                    <span class="text-2xl sm:text-3xl !font-normal whitespace-nowrap">I'm passionate about</span>
                    <span class="text-2xl sm:text-3xl font-bold whitespace-nowrap">transforming great ideas</span>
                    <span class="text-2xl sm:text-3xl !font-normal">into innovative <span class="whitespace-nowrap">products &amp; services!</span></span>
                </h2>

                <div class="mt-6 flex flex-col lg:flex-row items-center gap-6">
                    <NuxtLink to="/projects" tabindex="-1">
                        <UButton aria-label="Link to Projects page" size="xl" icon="ion:hammer" variant="solid" color="primaryMain" class="px-8 lg:px-6">
                            See work
                        </UButton>
                    </NuxtLink>

                    <ExternalProfiles />
                </div>
            </div>

        </UContainer>

        <UContainer class="w-full max-w-4xl mt-6 lg:mt-10 flex flex-col md:flex-row justify-center gap-6">
            <div class="specialContainer specialContainerRegularBG text-center flex flex-col items-center !px-6">
                <div class="mb-3.5">
                    <h3 class="!text-2xl font-bold mb-1">
                        AI & Me
                    </h3>
                    <p>AI is a paradigm shift for <span class="whitespace-nowrap">experienced programmers</span></p>
                </div>
                <div class="flex-1 flex justify-center items-center">
                    <NuxtLink to="/ai" tabindex="-1">
                        <UButton size="xl" color="primaryMain" variant="solid" class="px-8 lg:px-6">
                            <UIcon name="healthicons:artificial-intelligence" class="mr-1" style="transform: scale(2)" />
                            How I use AI
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
            <div class="specialContainer specialContainerRegularBG text-center flex flex-col justify-between !px-6">
                <div class="mb-3.5">
                    <h3 class="!text-2xl font-bold mb-1">
                        Tech Stack
                    </h3>
                    <p>I'm roughly 60% front-end, <span class="whitespace-nowrap">40% back-end</span></p>
                </div>
                <Tags :tags="techStack" />
            </div>
        </UContainer>

        <UContainer class="w-full md:max-w-lg mt-6 mb-14 flex justify-center">
            <div class="specialContainer specialContainerRegularBG flex flex-col justify-center place-content-around gap-2 text-center w-full">
                <div>
                    <h3 class="!text-2xl font-bold mb-1">
                        Location
                    </h3>
                    I work hybrid & remotely in...
                </div>
                <div class="relative">

                    <!-- LOCATION ICON -->
                    <!-- <div class="absolute left-0 top-1/2" style="transform: translate(-100%,-50%)">
                        <UIcon name="lucide:map-pin" style="transform: scale(1.5)" />
                    </div> -->

                    <!-- TODO: Make stealth link to google maps toronto
                    https://github.com/kalnode/Kreation/issues/10 -->
                    <h3 id="toronto"><span><strong>Toronto</strong></span></h3>
                    <h4 id="ontario-canada" class="!text-2xl"><span style="white-space:nowrap">Ontario, Canada</span></h4>
                </div>
            </div>
        </UContainer>

        <UContainer class="w-full max-w-4xl">
            <div class="text-center my-8 mt-8 mb-8 font-bold">
                <h3 id="some-of-my-recent-work">
                    Some of my recent work
                </h3>
            </div>

            <ul v-show="status != 'pending' && projectsFiltered" class="gridCore gridProjects list_unstyled w-full">
                <li v-for="(project, index) in projectsFiltered" :key="'projectMainList-'+index"
                :class="index === 0 || (index + 1) % 4 == 0 ? 'wide' : ''"
                class="project text-(--green-lighter) saturate-80">
                    <section-container                    
                    :class="project.color ? project.color === 'white' || project.color === 'black' ? 'bg-'+project.color : 'bg-'+project.color+'-200' : ''"
                    :imgSrc="project.thumbnail"
                    :imgAlt="project.thumbnailAlt"
                    style="flex: 2"
                    :url="project.path">
                        <template v-slot:title>
                            {{ project.title }}
                        </template>
                        <template v-slot:subtitle>
                            {{ project.subtitle }}
                        </template>                    
                    </section-container>
                </li>
            </ul>

            <div class="mt-16 flex justify-center">
                <NuxtLink to="/projects" tabindex="-1">
                    <UButton aria-label="Link to Projects page" icon="ic:round-grid-view" color="primaryMain" variant="solid" class="px-4 py-3">
                        <span class="whitespace-nowrap">All Work</span>
                    </UButton>
                </NuxtLink>
            </div>

        </UContainer>
    </div>
</template>
<style scoped>

.heroContainer .heroImage {
    max-width: clamp(12rem, calc(100% * log(1.35)), 20rem);
}
</style>