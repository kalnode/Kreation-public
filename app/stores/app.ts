import { defineStore } from 'pinia'

type newStore = {

    theme: {
        dark: boolean
    }

    search: {
        openDrawer: boolean
    }

    sidebar: {
        open: boolean
    }

    scrolling: {
        isAtTopOfPage: boolean
        scrollTop: number
    }

}
  
export const useAppStore = defineStore('AppStore', () => {

    const state = ref<newStore>({

        theme: {
            dark: false
        },

        search: {
            openDrawer: false
        },

        scrolling: {
            isAtTopOfPage: true,
            scrollTop: 0
        },

        sidebar: {
            open: false
        }

    })


    // ===============================================
    // THEME
    // ===============================================

    const getTheme = computed(() => {
        return state.value.theme.dark ? 'ThemeDark' : 'ThemeLight'
    })

    const getThemeInvert = computed(() => {
        return state.value.theme.dark ? 'ThemeLight' : 'ThemeDark'
    })

    const setLightingMode = (value:Event) => {

        if (state.value.theme.dark) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }

        // TODO: Keep for now until we deal with color themes.
        // const colorMode = useColorMode()
        // const isDark = computed({
        //     get() {
        //         return colorMode.value === 'dark'
        //     },
        //     set() {
        //         colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        //     }
        // })

    }

    const toggleLightingMode = () => {

        state.value.theme.dark = !state.value.theme.dark

        if (state.value.theme.dark) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }

        // const colorMode = useColorMode()

        // const isDark = computed({
        //     get() {
        //         return colorMode.value === 'dark'
        //     },
        //     set() {
        //         colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        //     }
        // })

    }


    // ===============================================
    // SCROLLING
    // ===============================================

    const checkScrollPadding = () => {
        if (state.value.search.openDrawer) {
            document.body.classList.add('popupOpen')
        } else {
            document.body.classList.remove('popupOpen')
        }
    }

    const addScrollPadding = () => {
        if (import.meta.client && state.value.search.openDrawer) {
            document.body.classList.add('popupOpen')
            document.body.classList.add('zoomOut')
        }
    }

    const removeScrollPadding = () => {

        if (import.meta.client && !state.value.search.openDrawer) {

            document.body.classList.remove('zoomOut')

            setTimeout(() => {
                document.body.classList.remove('popupOpen')
            }, 300)

            //setTimeout(() => {
            //    document.body.classList.remove('zoomOut')
            // }, 600)
        }
        
    }

    return { ...state.value, getTheme, getThemeInvert, setLightingMode, addScrollPadding, removeScrollPadding, toggleLightingMode }
})