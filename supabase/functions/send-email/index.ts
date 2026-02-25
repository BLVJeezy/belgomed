import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { InviteEmail } from './_templates/invite.tsx'
import { ResetPasswordEmail } from './_templates/reset-password.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

const subjectMap: Record<string, string> = {
  invite: 'U bent uitgenodigd voor Belgomed',
  signup: 'Bevestig uw e-mailadres — Belgomed',
  magiclink: 'Uw inloglink — Belgomed',
  recovery: 'Wachtwoord resetten — Belgomed',
  email_change: 'Bevestig uw nieuwe e-mailadres — Belgomed',
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  try {
    const payload = await req.json()

    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = payload as {
      user: { email: string }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
        token_new: string
        token_hash_new: string
      }
    }

    // Pick template based on action type
    const isRecovery = email_action_type === 'recovery'
    const EmailTemplate = isRecovery ? ResetPasswordEmail : InviteEmail

    const html = await renderAsync(
      React.createElement(EmailTemplate, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token,
        token_hash,
        redirect_to,
        email_action_type,
      })
    )

    const subject = subjectMap[email_action_type] || 'Bericht van Belgomed'

    const { error } = await resend.emails.send({
      from: 'Belgomed <noreply@belgomed.com>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log(`Email sent to ${user.email} (type: ${email_action_type})`)
  } catch (error) {
    console.error('Send email error:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: (error as any).code,
          message: (error as any).message,
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
