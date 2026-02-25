import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ResetPasswordEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
}

export const ResetPasswordEmail = ({
  token_hash,
  supabase_url,
  email_action_type,
  redirect_to,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Wachtwoord resetten — Belgomed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Wachtwoord Resetten</Heading>
        <Text style={text}>
          U heeft een verzoek ingediend om uw wachtwoord te resetten. Klik op de onderstaande link om een nieuw wachtwoord in te stellen.
        </Text>
        <Link
          href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          target="_blank"
          style={button}
        >
          Nieuw Wachtwoord Instellen
        </Link>
        <Text style={{ ...text, color: '#6b7280', fontSize: '13px', marginTop: '24px' }}>
          Als u dit verzoek niet heeft ingediend, kunt u deze e-mail veilig negeren. Uw wachtwoord blijft ongewijzigd.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © {new Date().getFullYear()} Belgomed — Betrouwbaar en Belgisch, voor uw gezondheid
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ResetPasswordEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
}

const container = {
  padding: '40px 20px',
  margin: '0 auto',
  maxWidth: '560px',
}

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '700' as const,
  margin: '0 0 24px',
}

const text = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 24px',
}

const button = {
  display: 'inline-block',
  backgroundColor: '#0d9488',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  padding: '12px 32px',
  borderRadius: '8px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0 16px',
}

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '20px',
}
