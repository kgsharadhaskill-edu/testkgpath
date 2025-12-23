import React from 'react';
import { ContactHero } from './ContactHero';
import { QuickConnect } from './QuickConnect';
import { ContactForm } from './ContactForm';
import { LocationSection } from './LocationSection';
import { WhyContact } from './WhyContact';
import { ContactCTA } from './ContactCTA';

export const ContactPage: React.FC = () => {
    return (
        <main className="bg-slate-950 min-h-screen">
            <ContactHero />
            <QuickConnect />
            <ContactForm />
            <LocationSection />
            <WhyContact />
            <ContactCTA />
        </main>
    );
};
