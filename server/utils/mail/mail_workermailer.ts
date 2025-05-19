//import { WorkerMailer } from 'worker-mailer'
import { Mail } from '~~/types/mail'

export const mail_WorkerMailer = async (payload:Mail) => {

    try {

        if ( process.env.NUXT_MAIL_TARGET
            && process.env.NUXT_MAIL_USERNAME
            && process.env.NUXT_MAIL_PASSWORD
            && process.env.NUXT_MAIL_SMTP
            && process.env.NUXT_MAIL_PORT) {

            const { WorkerMailer } = await import('worker-mailer')

            const mailer = await WorkerMailer.connect({
                credentials: {
                    username: process.env.NUXT_MAIL_USERNAME,
                    password: process.env.NUXT_MAIL_PASSWORD,
                },
                authType: 'plain',
                host: process.env.NUXT_MAIL_SMTP,
                port: parseInt(process.env.NUXT_MAIL_PORT!),
                secure: true,
            })

            return await mailer.send(payload)
        } else {
            throw 'Env variables not found'
        }
            
    } catch (error) {
        console.error("ERROR - mail_WorkerMailer", error)
        throw "Problem with sending worker-mailer"
    }

}