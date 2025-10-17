"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useTheme } from '@/components/theme-provider';
import { Separator } from '../ui/separator';

export function SettingsDialog({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Settings</DialogTitle>
          <DialogDescription>
            Manage your account and application settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          
          {/* Appearance Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Appearance</h4>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Toggle between light and dark themes.
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>

          <Separator />
          
          {/* Notification Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Notifications</h4>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="email-reminders">Email Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Receive reminders for upcoming bills.
                </p>
              </div>
              <Switch id="email-reminders" />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-summary">Weekly Summary</Label>
                <p className="text-xs text-muted-foreground">
                  Get a weekly summary of your finances.
                </p>
              </div>
              <Switch id="weekly-summary" defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Privacy Settings */}
           <div className="space-y-4">
            <h4 className="font-medium text-foreground">Privacy</h4>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visibility">Public Profile</Label>
                <p className="text-xs text-muted-foreground">
                  Allow others to find your profile.
                </p>
              </div>
              <Switch id="profile-visibility" />
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

    