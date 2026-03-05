import { ReactNode } from 'react';
import { Fingerprint, EyeOff, ShieldAlert, Lock } from 'lucide-react';

export interface SafetyFeature {
    iconKey: 'fingerprint' | 'eye-off' | 'shield-alert' | 'lock';
    title: string;
    description: string;
}

export const SAFETY_FEATURES: SafetyFeature[] = [
    {
        iconKey: 'fingerprint',
        title: 'Biometric Verification',
        description: 'Every profile is authenticated using advanced biometric scanning. No catfishes, no bots, just real people.',
    },
    {
        iconKey: 'eye-off',
        title: 'End-to-End Encrypted',
        description: 'Your conversations, photos, and personal data are encrypted. We cannot read your messages, and neither can anyone else.',
    },
    {
        iconKey: 'shield-alert',
        title: 'Zero Tolerance Policy',
        description: 'Our AI moderation and 24/7 human support team ensure a respectful environment. Bad actors are permanently banned.',
    },
    {
        iconKey: 'lock',
        title: 'Incognito Mode',
        description: 'Browse profiles invisibly. Only reveal your profile to people you have explicitly liked or matched with.',
    },
];
