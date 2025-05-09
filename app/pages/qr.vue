<script setup lang="ts">
const appConfig = useAppConfig()
definePageMeta({
    title: 'QR codes'
})
</script>
<template>
    <UContainer class="w-full max-w-lg flex flex-col gap-10 py-4 text-center">
        <div class="flex flex-col items-center">
            <img
            src="public/qr_kreation.ca.svg"
            alt="QR code for Kal's portfolio website"
            class="w-full max-w-52 aspect-square mb-2" />
            <h4>This website</h4>
            <p>{{ appConfig.links.website }}</p>
        </div>

        <div class="flex flex-col items-center">
            <img
            src="public/qr_linkedin.svg"
            alt="QR code for Kal's LinkedIn profile"
            class="w-full max-w-52 aspect-square mb-2" />
            <h4>LinkedIn</h4>
            <p>{{ appConfig.links.linkedin }}</p>
        </div>
    </UContainer>
</template>