'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProfileSettings from '@/components/account/ProfileSettings';
import NotificationsSettings from '@/components/account/NotificationsSettings';
import PrivacySettings from '@/components/account/PrivacySettings';
import { Card } from '@/components/ui/Card';

import { apiGet } from '@/services/api';
import { USER_ENDPOINTS } from '@/services/endpoints/user.endpoints';
import { SETTINGS_ENDPOINTS } from '@/services/endpoints/settings.endpoints';

type AccountTab = 'profile' | 'settings';

interface AccountPageProps {
  defaultTab: AccountTab;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ProfilePayload {
  user: {
    id: string;
    phoneNumber: string;
    onboarded: boolean;
  };
  profile: {
    name?: string;
    bio?: string;
    gender?: string;
    lookingFor?: string;
    interests?: Array<{ name: string }>;
    profileVisible?: boolean;
    ghostMode?: boolean;
  } | null;
}

interface NotificationSettings {
  notifications: {
    newMatches: boolean;
    messages: boolean;
    promotions: boolean;
  };
}

export default function SettingsLayout() {

  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [loading, setLoading] = useState(true);

  const [userPhone, setUserPhone] = useState('');
  const [isOnboarded, setIsOnboarded] = useState(false);

  const [profileDefaults, setProfileDefaults] = useState({
    name: '',
    bio: '',
    gender: '',
    lookingFor: '',
    interests: '',
  });

  const [notificationDefaults, setNotificationDefaults] = useState({
    newMatches: true,
    messages: true,
    promotions: false,
  });

  const [privacyDefaults, setPrivacyDefaults] = useState({
    profileVisible: true,
    ghostMode: false,
  });

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const [profileResponse, notificationsResponse] = await Promise.all([
          apiGet<ApiResponse<ProfilePayload>>(USER_ENDPOINTS.PROFILE),
          apiGet<ApiResponse<NotificationSettings>>(SETTINGS_ENDPOINTS.NOTIFICATIONS),
        ]);

        const payload = profileResponse.data.data;
        const profile = payload.profile;
        const notifications = notificationsResponse.data.data.notifications;

        setUserPhone(payload.user.phoneNumber || '');
        setIsOnboarded(payload.user.onboarded);

        setProfileDefaults({
          name: profile?.name || '',
          bio: profile?.bio || '',
          gender: profile?.gender || '',
          lookingFor: profile?.lookingFor || '',
          interests: profile?.interests?.map((i) => i.name).join(', ') || '',
        });

        setNotificationDefaults({
          newMatches: notifications.newMatches,
          messages: notifications.messages,
          promotions: notifications.promotions,
        });

        setPrivacyDefaults({
          profileVisible: profile?.profileVisible ?? true,
          ghostMode: profile?.ghostMode ?? false,
        });

      } catch (error) {
        console.error('Failed to load account data', error);
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background-dark px-4 py-24">
        <div className="mx-auto w-full max-w-3xl space-y-6">

          <h1 className="text-3xl font-black text-white">Account</h1>

          {/* Tabs */}

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">

            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-full px-5 py-2 text-sm font-bold ${
                activeTab === 'profile'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-slate-300'
              }`}
            >
              Profile
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`rounded-full px-5 py-2 text-sm font-bold ${
                activeTab === 'settings'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-slate-300'
              }`}
            >
              Settings
            </button>

          </div>

          {/* Loading */}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : activeTab === 'profile' ? (

            !isOnboarded ? (

              <Card className="p-8 text-center">

                <UserCircle2 size={40} className="mx-auto text-slate-400" />

                <p className="mt-3 text-xl font-bold text-white">
                  Finish onboarding first
                </p>

                <p className="mt-2 text-slate-400">
                  Complete onboarding to edit your profile.
                </p>

                <Link
                  href="/auth/onboarding"
                  className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-white"
                >
                  Continue Onboarding
                </Link>

              </Card>

            ) : (

              <ProfileSettings
                phone={userPhone}
                defaultValues={profileDefaults}
              />

            )

          ) : (

            <div className="space-y-6">

              <NotificationsSettings
                defaultValues={notificationDefaults}
              />

              <PrivacySettings
                defaultValues={privacyDefaults}
              />

            </div>

          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}