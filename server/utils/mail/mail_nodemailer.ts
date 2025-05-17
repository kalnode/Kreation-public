//import nodemailer from 'nodemailer'

import { Mail } from '~~/types/mail'

export const mail_NodeMailer = async (payload:Mail) => {

    try {

        const nodemailer = await import('nodemailer')

        // TODO: Keep for now; different config structure for nodemailer
        // const config = {
        //     host: process.env.NUXT_MAIL_SMTP,
        //     port: process.env.NUXT_MAIL_PORT,
        //     secure: true, // upgrade later with STARTTLS
        //     auth: {
        //         user: process.env.NUXT_MAIL_USERNAME,
        //         pass: process.env.NUXT_MAIL_PORT
        //     }
        // }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NUXT_MAIL_USERNAME,
                pass: process.env.NUXT_MAIL_PASSWORD
            }
        })
       
        return await transporter.sendMail(payload, (error, info) => {
            if (error) {
                console.error("ERROR - mail_NodeMailer", error)
                throw error
            } else {
                return info
            }
        })

    } catch (error) {
        throw "Problem with sending nodemailer"
    }

}
