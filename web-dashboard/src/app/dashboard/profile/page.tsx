'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/motion'
import { User, Mail, MapPin, Briefcase, Camera, Globe, Link as LinkIcon, Save } from 'lucide-react'

export default function ProfilePage() {
  return (
    <FadeIn className="flex flex-col gap-8 max-w-7xl pb-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Identity & Profile</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">Manage your digital presence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
            <div className="relative h-32 bg-primary/10 select-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5" />
            </div>
            <div className="px-6 pb-8 text-center -mt-16 relative z-10">
              <div className="relative inline-block group">
                <div className="h-32 w-32 rounded-3xl bg-background border-4 border-background shadow-xl overflow-hidden ring-1 ring-gray-100 mx-auto">
                  <div className="h-full w-full bg-muted flex items-center justify-center font-black text-4xl text-muted-foreground/40">
                    JD
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:scale-110 transition-transform cursor-pointer">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <h2 className="text-xl font-bold">John Doe</h2>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-black mt-1">Senior Product Architect</span>
                <div className="flex items-center gap-2 mt-4">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">Verified</Badge>
                  <Badge className="bg-primary/10 text-primary border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">Team Lead</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-muted/5">
              <div className="p-4 text-center cursor-pointer hover:bg-muted/10 transition-colors">
                <p className="text-lg font-bold">128</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Projects</p>
              </div>
              <div className="p-4 text-center cursor-pointer hover:bg-muted/10 transition-colors">
                <p className="text-lg font-bold">4.2k</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Entries</p>
              </div>
            </div>
          </section>

          <section className="bg-background border border-gray-200 rounded-2xl p-6 shadow-sm shadow-black/5 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-gray-100 pb-2">Social Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <Globe className="h-4 w-4" />
                <span className="font-medium">github.com/johndoe</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <Globe className="h-4 w-4" />
                <span className="font-medium">@johndoearch</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                <LinkIcon className="h-4 w-4" />
                <span className="font-medium">portfolio.me</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Detailed Forms */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
            <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
              <User className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Personal Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input label="First Name" defaultValue="John" />
                <Input label="Last Name" defaultValue="Doe" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Email Address</span>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1.2 h-3.5 w-3.5 text-muted-foreground translate-y-2.5" />
                    <Input defaultValue="john.doe@enterprise.com" className="pl-9 h-8" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Phone Number</span>
                  <Input defaultValue="+1 (555) 000-0000" className="h-8" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Bio</span>
                <textarea 
                  className="w-full h-32 bg-muted/20 border border-gray-200 rounded-xl p-4 text-sm font-medium focus:border-primary/20 outline-none transition-all custom-scrollbar"
                  placeholder="Tell us about yourself..."
                  defaultValue="Senior Product Architect with a focus on enterprise-grade design systems and scalable frontend architectures. Passionate about minimalism and extreme performance."
                />
              </div>
            </div>
          </section>

          <section className="bg-background border border-gray-200 rounded-2xl overflow-hidden shadow-sm shadow-black/5">
            <div className="p-6 border-b border-gray-200 bg-muted/20 flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Professional Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input label="Company" defaultValue="Antigravity Systems" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Location</span>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1.2 h-3.5 w-3.5 text-muted-foreground translate-y-2.5" />
                    <Input defaultValue="San Francisco, CA" className="pl-9 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" className="px-8 cursor-pointer">Discard</Button>
            <Button className="px-10 gap-2 cursor-pointer shadow-lg shadow-primary/20">
              <Save className="h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
