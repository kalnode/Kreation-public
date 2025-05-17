<script setup lang="ts">
import { useAppStore } from '@/stores/app'

preloadComponents('Search')

const store = useAppStore()
const route = useRoute()

watch( route, value => {
    closeSearch()
})

const closeSearch = () => {
    store.search.openDrawer = false
}

// ===================================
// TODO: Tailwind whitelist
// This is temporary until TW v4 safelist feature is stable
// https://github.com/kalnode/Kreation/issues/2
const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'stone', 'slate', 'neutral', 'zinc', 'gray', 'white', 'black']
// ===================================

</script>
<template>
    <div class="w-full h-full">


        <!-- ================================== -->
        <!-- BACKGROUND STUFF -->
        <!-- ================================== -->
        <!-- Subtle animated colour blobs -->
        <RandomBlobs class="absolute" style="z-index: -1;" />

        <!-- Gradient fade-out to app main background color -->
        <div class="appBG absolute z-0"></div>

        <!-- ================================== -->
        <!-- LAYOUT -->
        <!-- ================================== -->
        <div class="layout">

            <Header class="header" />

            <!-- ================================= -->
            <!-- MAIN VIEW -->
            <!-- ================================= -->
            <div class="inner flex flex-col items-center">

                <!-- ================================= -->
                <!-- CONTENT -->
                <!-- ================================= -->
                <main class="flex justify-center relative z-0 w-full h-full min-h-screen">
                    <slot />
                </main>


                <!-- ================================= -->
                <!-- PRE-FOOTER -->
                <!-- ================================= -->

                <UContainer class="max-w-4xl mt-20 pb-20">
                    <DividerEnd />
                </UContainer>

                <UContainer class="w-full max-w-4xl mt-6 lg:mt-10 flex flex-col md:flex-row justify-center gap-6 mb-6">
                    <div v-if="route.path != '/ai'" class="specialContainer specialContainerRegularBG text-center flex flex-col justify-between items-center !px-6" style="flex: 2;padding-top: 1.5rem;">
                        <div class="mb-3.5 text-center max-w-sm">
                            <h3 class="!text-2xl font-bold mb-1">
                                AI Stuff
                            </h3>
                            <p>AI is a paradigm shift and is part of my tool chest, however it must be used <span class="whitespace-nowrap">with care!</span></p>
                        </div>
                        <div class="flex-1 flex justify-center items-center">
                            <NuxtLink to="/ai" tabindex="-1">
                                <UButton aria-label="Link to AI page" variant="solid" color="primaryMain" size="xl" class="px-8 lg:px-6">
                                    <UIcon name="healthicons:artificial-intelligence" class="mr-1" style="transform: scale(2)" />
                                    My thoughts on AI
                                </UButton>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="specialContainer specialContainerRegularBG text-center flex flex-col justify-between items-center !px-6" style="flex: 2;padding-top: 1.5rem;">
                        <div class="mb-3.5 max-w-sm self-center">
                            <h3 class="!text-2xl font-bold mb-1">
                                A variety of projects
                            </h3>
                            <p>I've worked in tech and <br class="hidden md:block" /><span class="whitespace-nowrap">tangent industries</span> for +7 years</p>
                        </div>
                        <div>
                            <NuxtLink to="/projects" tabindex="-1">
                                <UButton aria-label="Link to Projects page" icon="ic:round-grid-view" variant="solid" color="primaryMain" class="px-4 py-3">
                                    See my work
                                </UButton>
                            </NuxtLink>
                        </div>
                    </div>
                </UContainer>

                <UContainer class="max-w-2xl">
        
                    <div class="specialContainer specialContainerRegularBG text-center flex flex-col justify-center items-center gap-6">
                        <div>
                            <h1>Explore Topics</h1>
                        </div>
                        <TagsBrowse />
                    </div>

                </UContainer>

            </div>


            <!-- ================================= -->
            <!-- FOOTER -->
            <!-- ================================= -->
            <Footer />

        </div>



        <!-- ================================= -->
        <!-- SEARCH DRAWER (FROM VIEWPORT TOP) -->
        <!-- ================================= -->
        <UDrawer id="searchDrawer"
        v-model:open="store.search.openDrawer"
        direction="top"
        inset
        :content="{ trapFocus: true }"
        title="Drawer with description"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        class="searchDrawer containerBG max-w-2xl m-auto"
        @update:open="() => store.addScrollPadding()"
        @close="() => store.removeScrollPadding()">

            <!-- TODO: Scrutinize inset bug
            https://github.com/kalnode/Kreation/issues/13 -->

            
            <!-- TODO: Background zoom effect when drawers are opened.
            https://github.com/kalnode/Kreation/issues/15
            shouldScaleBackground
            setBackgroundColorOnScale="false" -->

            <template #content>
                <div class="p-4 min-h-32 flex flex-col gap-4 overflow-hidden">
                    <Search @close="closeSearch()" class="flex-1 overflow-hidden" />
                </div>
            </template>

        </UDrawer>


        <!-- ================================= -->
        <!-- TAG EXPLORER DRAWER (FROM LEFT SIDE, MOBILE) -->
        <!-- ================================= -->

        <!-- This drawer lives here (globally) as opposed to inside a nested page view,
        because NuxtUI drawer seems to have trouble with focus-trapping
        if the drawer is not in the root of the layout. -->

        <UDrawer id="topicsDrawer"
        v-model:open="store.sidebar.open"
        :content="{ trapFocus: true }"
        :scrollLockTimeout="2000"
        preventScrollRestoration
        direction="left"
        title="Explore site topics"
        description="Explore site topics"
        @update:open="() => store.addScrollPadding()"
        @close="() => store.removeScrollPadding()">
            <template #content>
                <div class="py-4 pl-8 overflow-y-auto">

                    <!-- TODO: This is a hidden trick to force focus capture when the drawer opens -->
                    <!-- https://github.com/kalnode/Kreation/issues/14 -->
                    <!-- <UInput autofocus class="absolute opacity-0 pointer-events-none" /> -->

                    <p class="font-bold mb-4">Explore topics</p>
                    <TagsBrowse :showActive="true" class="flex-col" />
                </div>
            </template>
        </UDrawer>


        <!-- ========================================================== -->
        <!--
            FORCE TAILWIND CLASSES WHITELIST
            https://github.com/kalnode/Kreation/issues/2

            THis is temporary until TW v4's whitelist feature is stable.            
            Below we force the build system to include certain TW classes in the final output.
            This is because we use dynamic color classes in runtime.
            Initially tried a loop, but even that is problematic for the compiler.
            Ended up with brute force divs as below.
        -->

        <!-- Ideally we have a loop for this, but it's problematic. -->
        <!-- <div v-for="(color, index) in colors" :key="'color-'+index"
        :class="color === 'white' || color === 'black' ? 'bg-'+color : 'bg-'+color+'-200'"
        class="">
            {{  color }}
        </div> -->

        <!-- WORST-CASE: We blunt-force this like below. SILLY! -->
        <div class="hidden">
            <div class="bg-red-200"></div>
            <div class="bg-orange-200"></div>
            <div class="bg-amber-200"></div>
            <div class="bg-yellow-200"></div>
            <div class="bg-lime-200"></div>
            <div class="bg-green-200"></div>
            <div class="bg-emerald-200"></div>
            <div class="bg-teal-200"></div>
            <div class="bg-cyan-200"></div>
            <div class="bg-sky-200"></div>
            <div class="bg-blue-200"></div>
            <div class="bg-indigo-200"></div>
            <div class="bg-violet-200"></div>
            <div class="bg-purple-200"></div>
            <div class="bg-fuchsia-200"></div>
            <div class="bg-pink-200"></div>
            <div class="bg-rose-200"></div>
            <div class="bg-stone-200"></div>
            <div class="bg-slate-200"></div>
            <div class="bg-slate-200"></div>
            <div class="bg-zinc-200"></div>
            <div class="bg-gray-200"></div>
            <div class="bg-white"></div>
            <div class="bg-black"></div>
            <div class="bg-red-800"></div>
            <div class="bg-orange-800"></div>
            <div class="bg-amber-800"></div>
            <div class="bg-yellow-800"></div>
            <div class="bg-lime-800"></div>
            <div class="bg-green-800"></div>
            <div class="bg-emerald-800"></div>
            <div class="bg-teal-800"></div>
            <div class="bg-cyan-800"></div>
            <div class="bg-sky-800"></div>
            <div class="bg-blue-800"></div>
            <div class="bg-indigo-800"></div>
            <div class="bg-violet-800"></div>
            <div class="bg-purple-800"></div>
            <div class="bg-fuchsia-800"></div>
            <div class="bg-pink-800"></div>
            <div class="bg-rose-800"></div>
            <div class="bg-stone-800"></div>
            <div class="bg-slate-800"></div>
            <div class="bg-slate-800"></div>
            <div class="bg-zinc-800"></div>
            <div class="bg-gray-800"></div>
        </div>

    </div>
</template>
<style>

.appBG {
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, var(--ui-bg-page) 0%, rgb(from var(--ui-bg-page) r g b / 0) 120%);
}
.layout {
    position: relative;
    width: 100%;
}

.layout > .inner {
    flex: 1;
    position: relative;
    z-index: 0;
    display: flex;
}

.header {
    position: sticky;
    top: 0;
    z-index: 50;
}

/* ---------------------- */
/* DRAWER STUFF */
/* ---------------------- */

/* To make search drawer _not_ full width in desktop, and centered  */
div[vaul-drawer][vaul-drawer-visible=true][vaul-drawer-direction=top] {
    max-width: 800px;
    margin: 0 auto;
}

/* TODO: This is a workaround until Nuxt UI fixes their inset Drawer spacing issue */
/* https://github.com/kalnode/Kreation/issues/13 */
.searchDrawer[data-state='closed'] {
    top: calc(var(--spacing) * 0);
}

</style>