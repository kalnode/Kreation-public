<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Mail } from '~~/types/mail'

defineOgImageComponent('Kreation', {
    headline: "Get in touch"
})

// Experimental: normalize is just for a workaround for Zod textarea validation.
const normalize = (text: string) => text.replaceAll('\r\n', '\n')

const schema = z.object({
    name: z.string().max(256, 'Cannot be more than 256 characters'),
    email: z.string().email('Invalid email address').max(256, 'Cannot be more than 256 characters'),
    subject: z.string().max(256, 'Cannot be more than 256 characters'),
    

    // =======================================================
    // TEXTAREA VALIDATION

    // TODO: Scrutinize Zod textarea validation
    // https://github.com/kalnode/Kreation/issues/8

    // TODO: Zod has problems with textarea (ie multi-line elements)

    // IDEALLY, but FAILS
    message: z.string().max(256, 'Cannot be more than 256 characters')

    // SEE: https://github.com/colinhacks/zod/issues/2684

    // FAILS:
    // message: z.string().transform(normalize).pipe(z.string().max(256, 'Cannot be more than 256 characters'))

    // FAILS:
    // message: z.string().refine(
	//     (str) =>  str.length - (str.match(/\r\n/g) ?? []).length <= 5,
	//      { message: 'Bio too long' }
	// )

    // FOR NOW: We exist with just a hard limit on the actual textarea element in the template... but no Zod validation (or visual warnings to the user) occurs.

    // =======================================================

})

type Schema = z.output<typeof schema>
const toast = useToast()
const hasBeenSent = ref<Date | false>()
const sentPayload = ref()

const form = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    subject: undefined,
    message: undefined
})

const changesExist = computed( () => {
    return JSON.stringify(form) != JSON.stringify(sentPayload.value) && hasBeenSent.value ? true : false
})

const formUpdated = () => {
    if (changesExist.value) {
        hasBeenSent.value = false
    }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {

    // NOTE: gmail smtp via worker-mailer fails on sending mail with "Name <email@domain.com>", but works with "Name email@domain.com"
    const fromFinal = `${event.data.name} ${event.data.email}`

    const payloadFinal:Partial<Mail> = {

        // --------------------------------
        // Note: Two mailing paradigms are supported,
        // as such we specify two reply fields.

        // FOR: NODEMAILER (most environments, including local)
        replyTo: fromFinal,

        // FOR: WORKER-MAILER (exclusively for Cloudflare prod)
        reply: fromFinal,
        // --------------------------------

        subject: event.data.subject,
        text: event.data.message
    }

    await $fetch('/api/mailer', {
        method: 'POST',
        body: payloadFinal
    })
    .then( (response) => {
        toast.add({ title: 'Success', description: 'The form has been submitted; thanks!', color: 'success' })
        hasBeenSent.value = new Date()
        sentPayload.value = JSON.parse(JSON.stringify(form))
    })
    .catch( (error:any) => {
        toast.add({ title: 'Error', description: 'There was an error with your submission!', color: 'warning' })
        hasBeenSent.value = false
    })
}
</script>

<template>
    <UContainer class="max-w-lg">
        <Hero>
            Contact
        </Hero>

        <div class="my-8 flex flex-col gap-4">
            <p>Questions? Comments?</p>
            <p>Feel free to send me a message; looking forward to chatting with you!</p>
        </div>
        
        <!-- TODO: Fix IDE TS warning on @submit
        https://github.com/kalnode/Kreation/issues/9 -->
        <UForm v-if="form" :schema="schema" :state="form" class="flex flex-col gap-4 w-full" @submit="onSubmit" @change="formUpdated">

            <UFormField label="Name" name="name" class="w-full">
                <UInput v-model="form.name" size="xl" placeholder="John/Jane Smith" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email" class="w-full">
                <UInput v-model="form.email" size="xl" placeholder="email@address.com" class="w-full" />
            </UFormField>

            <UFormField label="Subject" name="subject" class="w-full">
                <UInput v-model="form.subject" size="xl" placeholder="Subject" class="w-full" />
            </UFormField>

            <UFormField label="Message" name="body" class="w-full">
                <UTextarea v-model="form.message" size="xl" placeholder="Hello, nice to meet you!" :maxrows="20" maxlength="256" autoresize class="w-full" />
            </UFormField>

            <div class="flex gap-4">
                <div>
                    <UButton aria-label="Submit message" type="submit" size="xl" class="text-inherit" :disabled="hasBeenSent ? true : false" tabindex="0">
                        Submit
                    </UButton>
                </div>

                <div v-if="hasBeenSent && !changesExist" class="text-sm flex flex-col">
                    <div>Succesfully submitted:</div>
                    <div class="italic">{{ hasBeenSent }}</div>
                </div>
            </div>

        </UForm>
    </UContainer>
</template>