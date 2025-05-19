<template>
    <UContainer class="flex flex-col items-center gap-2 max-w-2xl pt-8 pb-8">
        <h1>

            <!-- default slot -->
            <slot />
            
            <MDCSlot name="title" unwrap="p" />
        </h1>

        <h3>
            <MDCSlot name="subtitle" unwrap="p" />
        </h3>
    </UContainer>
</template>