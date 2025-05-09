<script setup lang="ts">
import { useSlots } from 'vue'
const slots = useSlots()
const props = defineProps<{
    tags?: Array<string>
    links?: Array<{
        url: string
        title: boolean
        disabled: boolean
        icon: string
    }>
}>()
</script>
<template>
    <div class="HeroProject w-full text-center mb-8">

        <Hero>
            <template v-slot:title>
                <MDCSlot name="title" unwrap="p" />
            </template>
            <template v-slot:subtitle>
                <MDCSlot name="subtitle" unwrap="p" />
            </template>
        </Hero>

        <UContainer class="max-w-4xl">
            <div class="grid_Info">

                <div v-if="slots.timeline" class="grid_Timeline">
                    <h6>
                        Timeline
                    </h6>
                    <span class="font-bold">
                        <MDCSlot name="timeline" />
                    </span>
                </div>

                <div v-if="slots.role" class="grid_Role">
                    <h6>
                        Role
                    </h6>
                    <span class="font-bold sm:whitespace-nowrap">
                        <MDCSlot name="role" />
                    </span>
                </div>

                <div v-if="props.links" class="grid_Links">
                    <h6 class="mb-1 flex justify-center items-center gap-2">
                        Links <UIcon name="lucide:external-link" />
                    </h6>
                    <span class="font-bold sm:whitespace-nowrap">
                        <ul class="list_unstyled flex justify-center flex-wrap gap-4">
                            <li v-for="(link, index) in props.links" :key="'link-'+index">
                                <NuxtLink :to="link.url" target="_blank" tabindex="-1">
                                    <UButton :aria-label="'Link to' + link.title" size="xl" class="cursor-pointer" :disabled="link.disabled" color="secondary" variant="subtle"
                                    :icon="link.disabled ? 'lucide:link-2-off' : link.icon ? link.icon : ''">
                                        {{ link.title }}
                                    </UButton>
                                </NuxtLink>
                            </li>
                        </ul>
                    </span>
                </div>

                <div v-if="props.tags" class="grid_Technologies justify-self-center max-w-lg">
                    <h6 class="mb-1">
                        Technologies
                    </h6>
                    <Tags :tags="props.tags" />
                </div>

            </div>
        </UContainer>
    </div>
</template>
<style scoped>
.grid_Info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* grid-template-rows: repeat(3, 1fr); */
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}

.grid_Timeline { grid-area: 1 / 1 / 2 / 2; }
.grid_Role { grid-area: 1 / 2 / 2 / 3; }
.grid_Links { grid-area: 2 / 1 / 3 / 3; }
.grid_Technologies { grid-area: 3 / 1 / 4 / 3; }


@media (width >= 52rem ) {

    .grid_Info {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }

    .grid_Technologies { grid-area: 1 / 3 / 3 / 4; }

}
</style>