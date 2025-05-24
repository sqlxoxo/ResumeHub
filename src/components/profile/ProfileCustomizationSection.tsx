"use client";

import type { UseFormReturn } from "react-hook-form";
import { UserProfile } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

interface ProfileCustomizationSectionProps {
  form: UseFormReturn<UserProfile>;
}

const settingItems: Array<{ name: keyof UserProfile["settings"]; label: string }> = [
  { name: "showContact", label: "Show Contact Information" },
  { name: "showSummary", label: "Show Summary / About Me" },
  { name: "showExperience", label: "Show Work Experience" },
  { name: "showEducation", label: "Show Education" },
  { name: "showSkills", label: "Show Skills" },
  { name: "showProjects", label: "Show Projects" },
];

export function ProfileCustomizationSection({ form }: ProfileCustomizationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Customization</CardTitle>
        <CardDescription>Control which sections are visible on your public profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {settingItems.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={`settings.${item.name}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{item.label}</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}
