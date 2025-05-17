//import { sendMailWmailer } from '~~/server/utils/wmailer'
//import { sendMailNodeMailer } from '~~/server/utils/nodemailer'

import { Mail } from '~~/types/mail'

export default defineEventHandler(async (event) => {

    try {
        
        if ( process.env.NUXT_MAIL_TARGET
             && process.env.NUXT_MAIL_USERNAME
             && process.env.NUXT_MAIL_PASSWORD
             && process.env.NUXT_MAIL_SMTP
             && process.env.NUXT_MAIL_PORT) {

            const body = await readBody(event)
            const finalBody:Mail = { ...body, from: process.env.NUXT_MAIL_USERNAME, to: process.env.NUXT_MAIL_TARGET }

            // CLOUDFLARE (use Worker-Mailer)
            if (process.env.NUXT_MAIL_USE_WMAILER === 'true') {

                const { mail_WorkerMailer } = await import('~~/server/utils/mail/mail_workermailer')
                return await mail_WorkerMailer(finalBody)
                .then( (response) => {
                    return { message: "Mail successfully sent" }
                })
                .catch( (error) => {
                    throw 'Mail failure: worker-mailer'
                })

            // ALL OTHER CASES (use Nodemailer)
            } else {

                const { mail_NodeMailer } = await import('~~/server/utils/mail/mail_nodemailer')
                return await mail_NodeMailer(finalBody)
                .then( (response) => {
                    return { message: "Mail successfully sent" }
                })
                .catch( (error) => {
                    throw 'Mail failure: nodemailer'
                })
            }

        } else {
            throw 'Env values missing'
        }

    } catch (error) {
        console.error("Nuxt Server API mailer - Error:", error)
        throw createError({ statusCode: 400, statusMessage: 'Mail failure: see server logs' })

    }

})