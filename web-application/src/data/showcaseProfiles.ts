export interface ShowcaseProfile {
    name: string;
    age: number;
    role: string;
    image: string;
    tags: string[];
}

export const SHOWCASE_PROFILES: ShowcaseProfile[] = [
    {
        name: 'Eleanor',
        age: 26,
        role: 'Creative Director',
        image: '/images/profile_woman_1.png',
        tags: ['Art', 'Travel', 'Design'],
    },
    {
        name: 'James',
        age: 29,
        role: 'Software Architect',
        image: '/images/profile_man_1.png',
        tags: ['Code', 'Hiking', 'Jazz'],
    },
    {
        name: 'Sophia',
        age: 24,
        role: 'Biomedical Researcher',
        image: '/images/profile_woman_2.png',
        tags: ['Science', 'Yoga', 'Cooking'],
    },
    {
        name: 'Marcus',
        age: 31,
        role: 'Venture Capitalist',
        image: '/images/profile_man_2.png',
        tags: ['Finance', 'Sailing', 'Chess'],
    },
];
