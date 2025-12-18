
import React from 'react';
import { PlacementHero } from './HeroSection';
import { PlacementStats } from './PlacementStats';
import { CourseOpportunities } from './CourseOpportunities';
import { PlacementSupport } from './PlacementSupport';
import { PlacementProcess } from './PlacementProcess';      
import { PlacementFAQ } from './PlacementFAQ';
import { PlacementCTA } from './PlacementCTA';


// --- Main Placement Page Component ---
export const PlacementPage: React.FC = () => {
    return (
        <main className="bg-slate-950 min-h-screen">
            <PlacementHero />
            <PlacementStats />
            <CourseOpportunities />
            <PlacementSupport />
            <PlacementProcess />
            <PlacementFAQ />
            <PlacementCTA />
        </main>
    );
};
