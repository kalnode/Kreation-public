<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()
</script>
<template>
    <div style="--ui-text-muted: var(--color-text-primary)">
        <UButton
        aria-label="Color Mode Toggle"
        @click="() => store.toggleLightingMode()"
        tabindex="0" variant="link" color="neutral" icon="fluent:dark-theme-24-filled"
        class="hidden cursor-pointer rounded-full aspect-square">
        </UButton>
    </div>
</template>
<style scoped>
.toggle {
    font-size: 1rem; /* Change this to scale toggle control */
    border: .125em solid currentColor;
    border-radius: 2em;
    cursor: pointer;
    display: block;
    height: 2em;
    position: relative;
    width: 3.75em;
}
.toggle span {
    background-color: currentColor;
    border-radius: 2em;
    overflow: hidden;
    position: absolute;
    text-indent: -9999px;
    transition: left .25s;
    z-index: 2;
    display: flex;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    left: .25rem;
}

.toggle::before,
.toggle::after {
    content: '';
    display: block;
    border-radius: 1em;
    position: absolute;
    z-index: 1;
}

.toggle::after {
    box-shadow: .25em .25em #5901d8;
    height: 1.125em;
    right: .9em;
    top: .125em;
    width: 1.125em;
}

.toggle::before {
    background-color: #ffc409;
    height: .625em;
    outline: .25em dotted #ffc409;
    outline-offset: .125em;
    left: .7em;
    top: .7em;
    width: .625em;
}

input:checked ~ .toggle span {
    left: 2em;
}

.sr-only {
    position: absolute;
    left: -9999px;
    opacity: 0;
}
</style>