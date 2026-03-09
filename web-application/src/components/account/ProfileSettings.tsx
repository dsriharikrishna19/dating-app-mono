'use client';

import { Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { apiPut } from '@/services/api';
import { USER_ENDPOINTS } from '@/services/endpoints/user.endpoints';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  bio: z.string().optional(),
  gender: z.string().optional(),
  lookingFor: z.string().optional(),
  interests: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface Props {
  phone: string;
  defaultValues: ProfileForm;
}

export default function ProfileSettings({ phone, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const saveProfile = async (data: ProfileForm) => {
    await apiPut(USER_ENDPOINTS.PROFILE, {
      ...data,
      interests: data.interests
        ?.split(',')
        .map((i) => i.trim())
        .filter(Boolean),
    });
  };

  return (
    <Card className="p-6 md:p-8">
      <form onSubmit={handleSubmit(saveProfile)} className="space-y-5">

        <Input label="Phone" value={phone} disabled />

        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Gender"
          {...register('gender')}
          placeholder="MALE / FEMALE / NON_BINARY"
        />

        <Input
          label="Looking For"
          {...register('lookingFor')}
          placeholder="MEN / WOMEN / EVERYONE"
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400">
            Bio
          </label>

          <textarea
            {...register('bio')}
            className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Tell people about yourself"
          />
        </div>

        <Input
          label="Interests"
          {...register('interests')}
          placeholder="Travel, Fitness, Music"
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          icon={<Save size={14} />}
        >
          Save Profile
        </Button>

      </form>
    </Card>
  );
}