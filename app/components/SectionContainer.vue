<script setup lang="ts">
const props = defineProps(["title", "subtitle", "url", "imgAlt", "imgSrc"])
</script>
<template>
    <NuxtLink :to="props.url" class="specialContainer !p-0 link group flex-1 flex flex-col items-end transform transition-transform hover:-translate-y-1">
        <div class="text text-right flex flex-col max-w-md">
            <h3 class="font-bold"><MDCSlot name="title" unwrap="p" /></h3>
            <p><MDCSlot name="subtitle" unwrap="p" /></p>
        </div>
        <div class="imageWrapper w-full h-full bg-inherit">
            <MyImage v-if="props.imgSrc"
            :src="props.imgSrc"
            :useImgix="true"
            sizes="50vw md:30vw"
            densities="x1 x2"
            :quality="70"
            :alt="props.imgAlt"
            class="image w-full h-full !absolute transform transition-transform group-hover:translate-y-1.5" />
        </div>
    </NuxtLink>
</template>

<style scoped>
.link {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 18rem;
    position: relative;
}

.imageWrapper {
    display: inline;
    mix-blend-mode: luminosity;
}

.image {
    margin-left: 3rem;
    position: absolute;
}

.text {
    justify-self: flex-end;
    overflow-wrap: anywhere;
    padding: 1rem;
}
</style>