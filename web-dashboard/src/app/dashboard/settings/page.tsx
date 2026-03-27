'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { FadeIn } from '@/components/motion'
import { Bell, Lock, Globe, Shield, Save } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  })

  return (
    <FadeIn className="flex flex-col gap-8 max-w-7xl pb-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">Configure your workspace</p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
          <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
            <Globe className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest">General Configuration</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Workspace Name" defaultValue="Enterprise Dashboard" />
              <Input label="Timezone" defaultValue="(GMT-05:00) Eastern Time" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Primary Language" defaultValue="English (US)" />
              <Input label="Default Currency" defaultValue="USD ($)" />
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
          <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
            <Lock className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Security & Privacy</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-muted/5">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold">Two-Factor Authentication</span>
                <span className="text-xs text-muted-foreground">Add an extra layer of security to your account.</span>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-muted/5">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold">Session Timeout</span>
                <span className="text-xs text-muted-foreground">Automatically log out after inactivity.</span>
              </div>
              <div className="w-24">
                <Input defaultValue="30m" className="h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
          <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Notification Preferences</h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(notifications).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold capitalize">{key} Alerts</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Receive important updates via {key}</span>
                </div>
                <Switch 
                  checked={val} 
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [key]: checked }))} 
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button variant="secondary">Discard Changes</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>
    </FadeIn>
  )
}
