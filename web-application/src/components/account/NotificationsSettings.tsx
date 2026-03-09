'use client';

import { Bell, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CustomToggle from '@/components/ui/customToggle';

import { apiPut } from '@/services/api';
import { SETTINGS_ENDPOINTS } from '@/services/endpoints/settings.endpoints';

const notificationSchema = z.object({
  newMatches: z.boolean(),
  messages: z.boolean(),
  promotions: z.boolean(),
});

type NotificationForm = z.infer<typeof notificationSchema>;

interface Props {
  defaultValues: NotificationForm;
}

export default function NotificationsSettings({ defaultValues }: Props) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NotificationForm>({
    resolver: zodResolver(notificationSchema),
    defaultValues,
  });

  const saveNotifications = async (data: NotificationForm) => {
    await apiPut(SETTINGS_ENDPOINTS.NOTIFICATIONS, data);
  };

  return (
    <Card className="p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <Bell size={18} className="text-primary" />
        <h2 className="text-xl font-black text-white">Notifications</h2>
      </div>

      <div className="space-y-3">
        <CustomToggle
          label="New Matches"
          checked={watch('newMatches')}
          onChange={(v) => setValue('newMatches', v)}
        />

        <CustomToggle
          label="Messages"
          checked={watch('messages')}
          onChange={(v) => setValue('messages', v)}
        />

        <CustomToggle
          label="Promotions"
          checked={watch('promotions')}
          onChange={(v) => setValue('promotions', v)}
        />
      </div>

      <div className="mt-5">
        <Button
          onClick={handleSubmit(saveNotifications)}
          isLoading={isSubmitting}
          icon={<Save size={14} />}
        >
          Save Notifications
        </Button>
      </div>
    </Card>
  );
}