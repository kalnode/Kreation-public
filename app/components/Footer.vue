<script setup lang="ts">
const appConfig = useAppConfig()
</script>
<template>
    <footer class="footerContainer w-full flex flex-col items-center gap-4 mt-12 color-mode-invert bg-(--color-bg-page) text-(--ui-text)">

        <div class="w-full py-10">
            <UContainer class="p-4 flex justify-center">
                <div class="flex flex-col justify-center items-center gap-6">
                    <h2>Let's talk</h2>
                    <NuxtLink to="/contact">
                        <UButton aria-label="Link to Contact Page" size="xl" variant="solid" color="primaryMain" trailing-icon="mingcute:send-plane-fill"
                        class="px-8 lg:px-6 cursor-pointer">
                            Get in touch
                        </UButton>
                    </NuxtLink>
                </div>
            </UContainer>
        </div>

        <hr class="w-full max-w-sm" />

        <UContainer class="w-full max-w-3xl flex flex-col md:flex-row md:justify-between items-center md:items-end gap-6 md:gap-8 my-6">
            <div class="flex flex-col items-center md:items-start md:ml-10">
                <h2 class="mb-2">{{ appConfig.nameFull }}</h2>
                <p class="mb-2">{{ appConfig.nameTitle }}; web apps</p>
                <ul class="ml-0 pl-12 md:pl-8">
                    <li>Toronto, ON, Canada</li>
                    <li>60% front-end, 40% back-end</li>
                    <li>+7 years experience</li>
                </ul>
            </div>

            <div class="flex flex-col items-center md:items-start gap-4">

                <div class="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                    <NuxtLink to="/" tabindex="-1"><UButton size="xl" class="cursor-pointer" variant="outline" color="primary">Home</UButton></NuxtLink>
                    <NuxtLink to="/projects" tabindex="-1"><UButton size="xl" class="cursor-pointer" variant="outline" color="primary">Work</UButton></NuxtLink>
                    <NuxtLink to="/about" tabindex="-1"><UButton size="xl" class="cursor-pointer" variant="outline" color="primary">About</UButton></NuxtLink>
                    <NuxtLink to="/contact"><UButton size="xl" class="cursor-pointer" variant="outline" color="primary">Contact</UButton></NuxtLink>
                </div>

                <ExternalProfiles class="flex flex-row text-2xl md:text-base" />
            </div>

        </UContainer>

        <hr class="w-full max-w-sm" />

        <NuxtLink to="/qr" :prefetch="false">QR Codes</NuxtLink>

        <UContainer class="text-center p-4">
            Copyright © {{ new Date().getFullYear() }} {{ appConfig.nameFull }}
        </UContainer>

    </footer>
</template>