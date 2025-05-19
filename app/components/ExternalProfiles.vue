<script setup lang="ts">
const appConfig = useAppConfig()
</script>
<template>
    <ul class="list_unstyled leading-none flex gap-4 text-2xl">
        <li>
            <NuxtLink :to="appConfig.links.github" class="flex" tabindex="-1">
                <UButton aria-label="Kal's Github repo" variant="link" icon="cib:github" size="xl" color="primary" class="text-inherit" />
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="appConfig.links.linkedin" tabindex="-1">
                <UButton aria-label="Kal's LinkedIn profile" variant="link" icon="cib:linkedin" size="xl" color="primary" class="text-inherit" />
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="appConfig.links.stackoverflow" tabindex="-1">
                <UButton aria-label="Kal's StackOverflow profile" variant="link" icon="cib:stackoverflow" size="xl" color="primary" class="text-inherit" />
            </NuxtLink>
        </li>
    </ul>
</template>