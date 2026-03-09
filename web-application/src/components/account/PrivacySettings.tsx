'use client';

import { Lock, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CustomToggle from '@/components/ui/customToggle';

import { apiPut } from '@/services/api';
import { SETTINGS_ENDPOINTS } from '@/services/endpoints/settings.endpoints';

const privacySchema = z.object({
  profileVisible: z.boolean(),
  ghostMode: z.boolean(),
});

type PrivacyForm = z.infer<typeof privacySchema>;

interface Props {
  defaultValues: PrivacyForm;
}

export default function PrivacySettings({ defaultValues }: Props) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PrivacyForm>({
    resolver: zodResolver(privacySchema),
    defaultValues,
  });

  const savePrivacy = async (data: PrivacyForm) => {
    await apiPut(SETTINGS_ENDPOINTS.PRIVACY, data);
  };

  return (
    <Card className="p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <Lock size={18} className="text-primary" />
        <h2 className="text-xl font-black text-white">Privacy</h2>
      </div>

      <div className="space-y-3">
        <CustomToggle
          label="Profile Visible"
          checked={watch('profileVisible')}
          onChange={(v) => setValue('profileVisible', v)}
        />

        <CustomToggle
          label="Ghost Mode"
          checked={watch('ghostMode')}
          onChange={(v) => setValue('ghostMode', v)}
        />
      </div>

      <div className="mt-5">
        <Button
          onClick={handleSubmit(savePrivacy)}
          isLoading={isSubmitting}
          icon={<Save size={14} />}
        >
          Save Privacy
        </Button>
      </div>
    </Card>
  );
}