export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar: string;
    matchPercent: number;
    partnerName: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        quote: "Spark didn't just find me a date — it found me someone who thinks the way I think. We were matched on a Tuesday, and engaged by December.",
        name: 'Isabella R.',
        role: 'Art Curator, London',
        avatar: '👩‍🎨',
        matchPercent: 97,
        partnerName: 'David',
    },
    {
        quote: "I had tried every other app. Spark was the first one that felt like it actually understood what I was looking for beyond interests.",
        name: 'Marcus T.',
        role: 'Architect, New York',
        avatar: '👨‍💼',
        matchPercent: 94,
        partnerName: 'Priya',
    },
    {
        quote: "The biometric verification gave me real confidence. Every conversation I had was with someone genuine. Met my partner within three weeks.",
        name: 'Amara K.',
        role: 'Research Scientist, Berlin',
        avatar: '👩‍🔬',
        matchPercent: 99,
        partnerName: 'Felix',
    },
];
