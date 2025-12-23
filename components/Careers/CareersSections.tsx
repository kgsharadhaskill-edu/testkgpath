import React from 'react';
import { CareersHero } from './CareerHero';
import { WhyWorkHere } from './WhyWorkHere';
import { OpenPositions } from './OpenPositions';
import { LifeAtKGPath } from './LifeAtKGPath';
import { OurValues } from './OurValues';
import { HiringProcess } from './HiringProcess';
import { ApplicationForm } from './ApplicationForm';
import { CareersCTA } from './CareersCTA';
export const CareersPage: React.FC = () => {
    return (
        <main className="bg-slate-950 min-h-screen">
            <CareersHero />
            <WhyWorkHere />
            <OpenPositions />
            <LifeAtKGPath />
            <OurValues />
            <HiringProcess />
            <ApplicationForm />
            <CareersCTA />
        </main>
    );
};
