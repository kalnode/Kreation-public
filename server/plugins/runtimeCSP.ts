//import { useRuntimeConfig } from '#imports'

// const testURL1 = process.env.IMAGEBASEURL
// const testURL2 = useRuntimeConfig().public.IMAGEBASEURL
// const testURL3 = 'https://kreation.imgix.net'

// console.log("hello testURL1", testURL1)
// console.log("hello testURL2", testURL2)
// console.log("hello testURL3", testURL3)

export default defineNitroPlugin((nitroApp) => {
    // const config = useRuntimeConfig()

    // console.log("hello666 config", config)
    // console.log("hello777 nitroApp", nitroApp)
    
    // const testURL1 = process.env.IMAGEBASEURL
    // const testURL2 = useRuntimeConfig().public.IMAGEBASEURL
    // const testURL3 = 'https://kreation.imgix.net'

    // nitroApp.hooks.hook('nuxt-security:routeRules', async (appSecurityOptions) => {

    //     function isNullUndefinedEmptyOrSpace(value:any) {
    //         return (
    //           value == null || // Checks for both null and undefined
    //           (typeof value === 'string' && value.trim().length === 0)
    //         );
    //       }

    //     // console.log("hello testURL1", testURL1)
    //     // console.log("hello testURL2", testURL2)
    //     // console.log("hello testURL3", testURL3)

    //     // console.log("hello 222", useRuntimeConfig().public.IMAGEBASEURL)

    //     // const testURL2 = process.env.IMAGEBASEURL  ? process.env.IMAGEBASEURL : 'https://kreation.imgix.net'  //useRuntimeConfig().public.IMAGEBASEURL
    //     // const testURL2 = useRuntimeConfig().public.IMAGEBASEURL

    //     // console.log("hello 333", testURL1)
    //     // console.log("hello 444", testURL2)

    //     // var finalURL = testURL3

    //     // if (testURL1 && !isNullUndefinedEmptyOrSpace(testURL1)) {
    //     //     finalURL = testURL1
    //     // } else if (testURL2 && !isNullUndefinedEmptyOrSpace(testURL2)) {
    //     //     finalURL = testURL2
    //     // }

    //     // const finalURL = testURL1 ? testURL1 : testURL2 ? testURL2 : testURL3 ? testURL3 : ''

    //     // console.log("hello finalURL", finalURL)

    //     // NO CSP PASSED, images work though
    //     // routeRules['/**'] = { 
    //     //     headers: {
    //     //         contentSecurityPolicy: {
    //     //             "connect-src": ["'self'", 'data:', finalURL]
    //     //         }
    //     //     }
    //     // }

    //     appSecurityOptions['/**'] = defuReplaceArray(
    //         {
    //             headers: {
    //                 contentSecurityPolicy: {
    
    //                     // Broken images, no CSP policy
    //                     //"img-src": ["'self'", 'data:', testURL!, testURL2! ]
    //                     "img-src": ["'self'", 'data:', finalURL ]
                        
    
    //                     // Images work, CSP works
    //                     //"img-src": ["'self'", 'data:', 'https://kreation.imgix.net']
    
    //                 }
    //             }
    //         },
    //         appSecurityOptions['/**']
    //         )

    //     // routeRules['/*'] = { 
    //     //     headers: {
    //     //         contentSecurityPolicy: {

    //     //             //"img-src": ["'self'", 'data:', 'test']

    //     //             // Broken images, no CSP policy
    //     //             //"img-src": ["'self'", 'data:', config.public.IMAGEBASEURL]

    //     //             // Broken images, no CSP policy
    //     //             "img-src": ["'self'", 'data:', 'https://kreation.imgix.net']

    //     //         }
    //     //     }
    //     // }
    // })


})