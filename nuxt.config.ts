import { rawConfigValues as appConfig } from "./app/app.config.rawValues"

export default defineNuxtConfig({

    // ==============================================================
    // BASELINE
    // ==============================================================

    debug: false,

    devtools: {
        enabled: true,
        timeline: {
            enabled: false
        }
    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2024-04-03',

    components: [
        {
            global: true,
            path: './components'
        }
    ],    

    // TODO: Based on env value, dynamically include modules (mainly for nuxthub/core)
    // https://github.com/kalnode/Kreation/issues/17
    modules: ['@nuxt/content', '@nuxt/ui', "@nuxt/image", '@pinia/nuxt', 'nuxt-security', 'nuxt-seo-utils', 'nuxt-og-image'],

    runtimeConfig: {
        public: {
            IMAGEBASEURL: process.env.VITE_IMAGEBASEURL
        }
    },

    ssr: true,
   
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@import "@/app/styles/custom.css"'
                }
            }
        },
        define: {
            __VUE_OPTIONS_API__: false,
        }
        // TODO: Keep for now; may need this for HMR scrutiny.
        // server: {
        //     hmr: {
        //         // Possibly needed to make sure HMR is running on the proper port
        //         port: 3001
        //     },
        //     watch: {
        //         usePolling: true
        //     }
        // }
    },

    routeRules: {
        '/api/mailer': {
            security: {
                rateLimiter: {
                    tokensPerInterval: 3
                }
            }
        }
    },

    security: {
        headers: {
            contentSecurityPolicy: {

                // For Cloudflare and local
                // TODO: Pass env variable (process.env.VITE_IMAGEBASEURL) here instead of hard url.
                // https://github.com/kalnode/Kreation/issues/18
                'img-src': ["'self'", 'data:', 'https://kreation.imgix.net'],
               
                // For local dev, on local devices (e.g. mobile on LAN wifi); USE ONLY IN DEV MODE
                "upgrade-insecure-requests": process.env.NODE_ENV === 'development' ? false : true,

                // See: https://nuxt-security.vercel.app/advanced/strict-csp#allowing-inline-elements-for-nuxt
                'script-src': [
                    "'nonce-{{nonce}}'",
                    "'strict-dynamic'",

                    // TODO: Scrutnize. Ideally we don't use "'unsafe-eval'", however Nuxt Content seems to need or (specifically SQLite WASM module)
                    // without it, on both local and prod deploy, page content doesn't download when navigating between pages, only on fresh reload.
                    "'unsafe-eval'"

                    // TODO: Other entries to scrutinize.
                    // "'self'",
                    // 'https:',
                    // "'unsafe-inline'",
                ]


            },
            
            // Cross-origin paradigm 1 - local dev + cloudflare        
            // crossOriginEmbedderPolicy: 'unsafe-none',

            // Cross-origin paradigm 2 - local dev only
            // See: https://github.com/Baroshem/nuxt-security/issues/101
            crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',

        },

        // For local dev, on local devices (e.g. mobile on LAN wifi)
        corsHandler: {
            origin:'*'
        }
    },


    // ==============================================================
    // APP & SEO
    // ==============================================================

    app: {
        pageTransition: { name: 'fadeQuicker', mode: 'out-in' },
        head: {
            // TODO: Fix this TS warning on htmlAttrs
            // https://github.com/kalnode/Kreation/issues/19
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                {
                    name: 'apple-mobile-web-app-title',
                    content: appConfig.appName
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, maximum-scale=1'
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon-96x96.png',
                    sizes: '96x96'
                },
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/favicon.svg'
                },
                {
                    rel: 'shortcut icon',
                    href: '/favicon.ico'
                },
                {
                    rel: 'apple-touch-icon',
                    href: '/apple-touch-icon.png',
                    sizes: '180x180'
                },
                {
                    rel: 'manifest',
                    href: '/site.webmanifest'
                }
            ]
        }

    },

    site: {
        name: appConfig.nameFull,
        description: appConfig.nameTitle,
        url: process.env.OGIMAGES_BASE_URL,
        //defaultLocale: 'en' // TODO: Keep for now until i18n scrutinized
    },

    seo: {
        meta: {
            themeColor: [
                { content: '#FAF4EB', media: '(prefers-color-scheme: dark)' },
                { content: '#FAF4EB', media: '(prefers-color-scheme: light)' }
            ],
            author: appConfig.nameFull,
            colorScheme: appConfig.colorScheme,
            applicationName: appConfig.appName
        }
    },

    ogImage: {

        // Options for opengraph (og) meta images (i.e. image previews on shared links in the wild)

        // Makes custom fonts available to opengraph image generator; see folder app/OgImage/
        fonts: [
            'Noto+Sans',
            'Noto+Sans:400',
            'Noto+Sans:700',
        ]

        // TODO: Host ogimages in the same place as regular images (AWS+imgix).
        // https://github.com/kalnode/Kreation/issues/3

    },
    
    
    // ==============================================================
    // UI STUFF
    // ==============================================================

    css: ['~/styles/main.css'],

    ui: {
        // TODO: Tailwind whitelist
        // https://github.com/kalnode/Kreation/issues/2
        // Below is legacy dev code:
        // tailwindWhitelistColors: ['green', 'yellow', ... ]
    },

    // TODO: Re-scrutinize all color mode stuff for themes
    colorMode: {
        preference: appConfig.colorScheme, // Default value of $colorMode.preference
        fallback: appConfig.colorScheme, // Fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: 'dark', //'__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storage: 'localStorage', // or 'sessionStorage' or 'cookie'
        storageKey: 'nuxt-color-mode',
        dataValue: 'theme'
    },

    icon: {
        clientBundle: {
            scan: true,
            includeCustomCollections: true, 
            sizeLimitKb: 256,
            icons: [
                'lucide:search',
                'lucide:x',
                'lucide:check',
                'lucide:search',
                'lucide:map-pin',
                'lucide:arrow-left',
                'lucide:arrow-right',
                'lucide:menu',
                'lucide:external-link',
                'lucide:link-2-off',
                'ic:round-grid-view',
                'ic:baseline-close',
                'fluent:dark-theme-24-filled',
                'ion:hammer',
                'healthicons:artificial-intelligence',
                'hugeicons:artificial-intelligence-04',
                'mingcute:send-plane-fill',
                'mingcute:diamond-square-fill',
                'mingcute:home-3-fill',
                'cib:github',
                'cib:linkedin',
                'cib:stackoverflow',
                'svg-spinners:90-ring-with-bg'
            ]
        }
    },

    image: {

        // Options for nuxt-image
        // See: https://image.nuxt.com/get-started/configuration

        provider: "imgix", // Default image provider

        imgix: {

            // TODO: Pass URL from env variable instead of hard URL
            // See https://github.com/nuxt/image/pull/1738
            baseURL: 'https://kreation.imgix.net'

        }
    },


    // ==============================================================
    // CONTENT STUFF 
    // ==============================================================

    content: {
        watch: {
            enabled: true,
            port: 4000,
            showURL: true
        },
        // preview: {
        //     api: 'https://api.nuxt.studio'
        // }
        renderer: {
            anchorLinks: { h2: false, h3: false, h4: false }
        }
    },

    // TODO: Keep for now; Tiptap editor for custom content editing component
    // tiptap: {
    //      prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
    // }

})