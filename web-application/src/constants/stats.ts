export interface Stat {
    label: string;
    value: number;
    suffix: string;
}

export const STATS_DATA: Stat[] = [
    { label: 'Verified Profiles', value: 1.2, suffix: 'M+' },
    { label: 'Daily Matches', value: 45, suffix: 'k+' },
    { label: 'Date Success', value: 92, suffix: '%' },
    { label: 'Cities Worldwide', value: 150, suffix: '+' },
];
