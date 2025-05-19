<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { debounce } from 'perfect-debounce'

const store = useAppStore()
const route = useRoute()
const nav = ref<HTMLDivElement>()
const navIndicator = ref<HTMLDivElement>()
const navHover = ref<HTMLDivElement>()
const searchIcon = ref<HTMLDivElement>()
const isHovered = ref<boolean>()

onMounted(() => {
    checkNavIndicator()
    setResizeListener()
})

onBeforeUnmount(() => {
    destroyResizeListener()
})

watch(route, value => {
    checkNavIndicator()
    clearHover()
})

const setResizeListener = () => {
    window.addEventListener('resize', handleResize)
}
const destroyResizeListener = () => {
    window.removeEventListener('resize', handleResize)
}

const handleResize = debounce( () => checkNavIndicator(), 300)

const checkNavIndicator = () => {
    setTimeout(() => {
        if (nav.value) {
           
            const activeElements = nav.value.getElementsByClassName('router-link-active')
            const activeElement = store.search.openDrawer ? searchIcon.value : activeElements[0]

            if (navIndicator.value) {
                if (activeElement) {
                    if (!(activeElement instanceof HTMLElement)) {
                        throw new TypeError(`Expected a object of Type HTMLElement`)
                    }

                    navIndicator.value.style.visibility = 'visible'
                    navIndicator.value.style.width = activeElement.offsetWidth + 'px'
                    navIndicator.value.style.left = activeElement.offsetLeft + 'px'

                    setTimeout(() => {
                        if (navIndicator.value) {
                            navIndicator.value.style.opacity = '100'
                        }
                    }, 50)
                    
                } else {
                    navIndicator.value.style.visibility = 'hidden'
                }
            }
        }
    }, 10)
}

const setHover = (hoveredElement:MouseEvent) => {

    const activeElement = hoveredElement.target as HTMLElement

    if (activeElement && navHover.value) {

       if (isHovered.value) {
            navHover.value.classList.remove('noMovement')
       }

       isHovered.value = true

        if (activeElement.classList.contains('router-link-active')) {
            clearHover()
        } else {
            navHover.value.style.opacity = '100'
        }

        navHover.value.style.width = (activeElement.offsetWidth) + 'px'
        navHover.value.style.height = (activeElement.offsetHeight) + 'px'
        navHover.value.style.left = (activeElement.offsetLeft) + 'px'
        navHover.value.style.top = (activeElement.offsetTop) + 'px'

    }

}

const clearHovering = () => {
    if (navHover.value) {
        isHovered.value = false
        navHover.value.classList.add('noMovement')
        clearHover()
    }
}

const clearHover = () => {
    if (navHover.value) {
        navHover.value.style.opacity = '0'
    }
}
</script>
<template>
    <header class="header">

        <div :class="store.scrolling.scrollTop > 35 ? 'frostedGlass bordered' : ''" class="topbar pointer-events-auto" @mouseleave.self="clearHovering()">

            <nav class="relative">

                <div ref="navIndicator" class="z-10 navIndicator navItem"></div>
                <div ref="navHover" class="z-0 navIndicator navIndicator_hover navItem noMovement"></div>

                <ul ref="nav" class="list_unstyled">
                    <li tabindex="0" @mouseover="setHover($event)"><NuxtLink to="/" tabindex="-1">Home</NuxtLink></li>
                    <li tabindex="0" @mouseover="setHover($event)"><NuxtLink to="/projects" tabindex="-1">Work</NuxtLink></li>
                    <li tabindex="0" @mouseover="setHover($event)"><NuxtLink to="/about" tabindex="-1">About</NuxtLink></li>
                    <li tabindex="0" @mouseover="setHover($event)"><NuxtLink to="/contact" tabindex="-1">Contact</NuxtLink></li>
                    <li tabindex="0" @mouseover="setHover($event)" ref="searchIcon" class="cursor-pointer" @click="clearHovering();store.search.openDrawer = !store.search.openDrawer">
                        <UIcon name="lucide:search" class="navItem size-5 pointer-events-none min-w-12" />
                    </li>
                </ul>
            </nav>
        </div>


        <DarkLightToggle class="ColorModeToggle pointer-events-auto" />
    </header>
</template>
<style lang="scss" scoped>
/* ------------------------ */
/* GENERAL */
/* ------------------------ */

.header {
    --minPaddingH: 0.25em;
    --maxPaddingH: 2em;
    --scaler:5vw;

    width: 100%;
    height: var(--header-height);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    --borderRadiusHeader: 50px;

    pointer-events: none;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em;
    border-radius: var(--borderRadiusHeader);
    border: 2px solid transparent;
    transition: all 0.35s ease-in-out;
    position: relative;
}

.topbar.bordered {
    box-shadow: var(--ui-shadow2);
}


/* ------------------------ */
/* NAV */
/* ------------------------ */

ul {
    display: flex;
    align-items: center;
    align-items: stretch;
}

ul li {
    display: flex;
    align-items: center;
    border-radius: var(--borderRadiusHeader);
}

ul li a,
.navItem {
    padding: 0.5em clamp( var(--minPaddingH), var(--scaler), var(--maxPaddingH) );
    --minFontSize: 10px;
    --maxFontSize: 20px;
    --scaler: 4vw;
    font-size: clamp( var(--minFontSize), var(--scaler), var(--maxFontSize) );
    border-radius: var(--borderRadiusHeader);
    transition: all .2s ease-in-out;
}

ul li a.router-link-active {
    width: 100%;
    height: 100%;
}

.navIndicator {
    background: var(--ui-effect-bg);
    opacity: 0;
}


.navIndicator_hover {
    background: rgb(from var(--ui-effect-bg) r g b / 0.30);
    padding: 0;
}

.navIndicator {
    width: 100px;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 50%;
}

.navIndicator.noMovement {
    transition: opacity .2s ease-in-out;
}


/* ------------------------ */
/* COLOR MODE TOGGLE */
/* ------------------------ */

.ColorModeToggle {
    display: none;
    position: absolute;
    right: 0;
}

@media (width >= 52rem ) {
    .ColorModeToggle {
        display: block;
    }

}
</style>