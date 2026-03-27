'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/schemas/authSchema'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SlideUp } from '@/components/motion'

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  const handleQuickLogin = (email: string) => {
    setValue('email', email)
    setValue('password', 'password')
  }

  return (
    <SlideUp className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-8 shadow-xl">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground text-sm">Sign in to manage your enterprise dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex flex-col">
        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="Sincere@april.biz"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive border border-destructive/20">
            {error || 'Something went wrong'}
          </div>
        )}

        <Button type="submit" className="w-full h-11" loading={isLoading}>
          Sign in
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or test with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs h-9"
          onClick={() => handleQuickLogin('Sincere@april.biz')}
          disabled={isLoading}
        >
          Admin User
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs h-9"
          onClick={() => handleQuickLogin('Shanna@melissa.tv')}
          disabled={isLoading}
        >
          Regular User
        </Button>
      </div>
    </SlideUp>
  )
}
