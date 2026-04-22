import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/Input'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-charcoal">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-serif text-4xl font-semibold text-charcoal dark:text-ivory">Contact Us</h1>
        <p className="mt-4 text-charcoal/80 dark:text-ivory/80">
          Have a question or want to say hello? We’d love to hear from you.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Get in touch</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3 text-charcoal/80 dark:text-ivory/80">
                <Mail size={20} className="shrink-0 text-champagne-dark dark:text-champagne-light" />
                <a href="mailto:hello@crowncharms.com" className="hover:text-champagne">hello@crowncharms.com</a>
              </li>
              <li className="flex items-start gap-3 text-charcoal/80 dark:text-ivory/80">
                <MapPin size={20} className="shrink-0 text-champagne-dark dark:text-champagne-light" />
                <span>Crown Charms<br />London, United Kingdom</span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-charcoal/70 dark:text-ivory/70">
              We typically reply within 24 hours on business days.
            </p>
          </div>

          <div className="rounded-lg border border-charcoal/10 bg-ivory-light p-6 dark:border-ivory/10 dark:bg-charcoal-dark">
            <h2 className="font-serif text-xl font-semibold text-charcoal dark:text-ivory">Send a message</h2>
            {submitted ? (
              <p className="mt-6 text-charcoal/80 dark:text-ivory/80">
                Thank you for your message. We’ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input label="Name" name="name" required placeholder="Your name" />
                <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
                <Textarea label="Message" name="message" required placeholder="How can we help?" />
                <Button type="submit" variant="primary">Send message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
