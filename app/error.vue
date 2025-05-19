<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})
</script>

<template>
    <UApp>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <div class="page pageProject w-full flex flex-col items-center">
                <UContainer class="max-w-2xl flex flex-col items-center gap-4">
                    <h1>ERROR</h1>
                    <p v-if="props.error">Error code: {{ props.error.statusCode }}</p>
                    <p>Error body: {{ props.error }}</p>
                    <NuxtLink to="/">
                        <UButton>
                            Go back home
                        </UButton>
                    </NuxtLink>
                </UContainer>
            </div>
        </NuxtLayout>
    </UApp>
</template>