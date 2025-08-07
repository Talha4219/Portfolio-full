import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-12">
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
