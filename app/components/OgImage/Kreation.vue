<script setup lang="ts">

/*
NOTE:
This component is used exclusively by the Nuxt-SEO module to render opengraph (og) images.
OG images are preview images appear in various apps when web links are shared (e.g. FB messenger, linkedin, whatsapp, etc).
The Nuxt-SEO module makes use of Satori to render the ogimages, however it has CSS limitations.
*/

const appConfig = useAppConfig()

const props = defineProps<{
    barebones?: boolean
    headline?: string
    headline2?: string
    title?: string
    subtitle?: string
    imageSrc?: string
    disableSubtitle?: boolean
}>()

const showLargerFormat = computed( () => {
    return !props.barebones || !props.imageSrc
})

// TODO: CSS VARIABLES SUPPORT
// Currently we use hard hex colors here as Satori doesn't support CSS variables from the global app.
// https://github.com/kalnode/Kreation/issues/20
const ui_bg_1 = '#bdf6e1'
const ui_bg_2 = '#FAF4EB'
const ui_text = '#1D7266'
</script>
<template>
    <div class="w-full h-full flex flex-row justify-between ogimageKreation overflow-hidden font-[Noto Sans]"
    :style="`color: ${ui_text}; background-image: linear-gradient(to bottom, ${ui_bg_1}, ${ui_bg_2})`">
        <div class="flex-1 flex flex-col justify-center p-12 py-20">
            <!--
                NOTE: The py-20 above is for extra top-and-bottom padding to make the ogimage look better in Android messages.
                This is potentially better for other ogimage contexts... essentially just increeasing the safearea.
            -->
            <div class="flex flex-col h-full justify-between gap-4">
                <div class="flex flex-col gap-4">
                    <h1 v-if="!props.barebones" class="text-7xl font-bold m-0">
                        {{ props.headline }}
                    </h1>
                    <h2 v-if="!props.barebones && !props.disableSubtitle" class="text-4xl font-bold m-0 leading-loose">
                        {{ props.headline2 }}
                    </h2>
                </div>                
                <div class="flex flex-col gap-2">
                    <h2 :class="showLargerFormat ? 'text-4xl' : 'text-2xl'" class="m-0">
                        {{ appConfig.nameTitle }}
                    </h2>
                    <h1 :class="showLargerFormat ? 'text-8xl' : 'text-6xl'" class="text-6xl font-bold m-0">
                        {{ appConfig.nameFull }}
                    </h1>
                </div>
            </div>
        </div>
        <div v-if="props.imageSrc" class="flex justify-end items-end h-full">
            <div class="flex -mb-32 -mr-24 w-[40rem] h-[40rem] rounded-full overflow-hidden">
                <img width="100%" height="100%" class="opacity-90 object-cover object-center" :src="props.imageSrc" />
            </div>
        </div>
    </div>
</template>