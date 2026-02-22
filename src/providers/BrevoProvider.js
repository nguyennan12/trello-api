
import { env } from '~/config/environment'
import { BrevoClient } from '@getbrevo/brevo'

const brevo = new BrevoClient({
  apiKey: env.BREVO_API_KEY
})

const sendEmail = async (recipientEmail, customSubject, htmlContent) => {
  const result = await brevo.transactionalEmails.sendTransacEmail({
    subject: customSubject,
    htmlContent: htmlContent,
    sender: { name: env.ADMIN_EMAIL_NAME, email: env.ADMIN_EMAIL_ADDRESS },
    to: [{ email: recipientEmail }]
  })
  return result
}

export const BrevoProvider = {
  sendEmail
}