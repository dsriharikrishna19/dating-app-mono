export interface HowItWorksStep {
    step: number;
    iconKey: 'user-plus' | 'brain' | 'message-circle';
    title: string;
    desc: string;
    color: string;
    bg: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
    {
        step: 1,
        iconKey: 'user-plus',
        title: 'Create Your Profile',
        desc: 'Set up your verified profile in minutes. Add photos, your personality traits, and what you are truly looking for in a connection.',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        step: 2,
        iconKey: 'brain',
        title: 'Get Matched',
        desc: 'Our AI analyses deep compatibility signals — values, communication style, life goals — to surface people who genuinely align with you.',
        color: 'text-secondary',
        bg: 'bg-secondary/10',
    },
    {
        step: 3,
        iconKey: 'message-circle',
        title: 'Start Connecting',
        desc: 'Break the ice with conversation starters crafted for your match. Build real chemistry before ever meeting in person.',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
    },
];
