"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile, defaultProfileCustomizationSettings, newEmptyProfile } from "@/lib/types";
import { GeneralInfoSection } from "./GeneralInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";
import { ProfileCustomizationSection } from "./ProfileCustomizationSection";
import { saveProfile } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores."),
  fullName: z.string().min(2, "Full name is required."),
  headline: z.string().min(5, "Headline is required."),
  summary: z.string().optional(),
  avatarUrl: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  contactInfo: z.object({
    email: z.string().email("Invalid email address."),
    phone: z.string().optional(),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  }),
  workExperience: z.array(
    z.object({
      id: z.string(),
      company: z.string().min(1, "Company name is required."),
      role: z.string().min(1, "Role is required."),
      startDate: z.string().min(1, "Start date is required."),
      endDate: z.string().optional(),
      description: z.string().min(1, "Description is required."),
      location: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string().min(1, "Institution name is required."),
      degree: z.string().min(1, "Degree is required."),
      fieldOfStudy: z.string().optional(),
      startDate: z.string().min(1, "Start date is required."),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  skills: z.array(z.string()).min(1, "At least one skill is required."),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Project name is required."),
      description: z.string().min(1, "Project description is required."),
      technologies: z.array(z.string()).min(1, "At least one technology is required."),
      url: z.string().url("Invalid project URL").optional().or(z.literal("")),
      repoUrl: z.string().url("Invalid repository URL").optional().or(z.literal("")),
    })
  ),
  settings: z.object({
    showContact: z.boolean(),
    showSummary: z.boolean(),
    showExperience: z.boolean(),
    showEducation: z.boolean(),
    showSkills: z.boolean(),
    showProjects: z.boolean(),
    themeColor: z.string().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

interface ProfileFormProps {
  initialProfile?: UserProfile | null;
  userId: string; // Mock user ID
  userEmail: string; // Mock user email
}

export function ProfileForm({ initialProfile, userId, userEmail }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = initialProfile || newEmptyProfile(userId, `user${Date.now().toString().slice(-4)}`, userEmail);

  const form = useForm<UserProfile>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange", 
  });

  const experienceFieldArray = useFieldArray({ control: form.control, name: "workExperience" });
  const educationFieldArray = useFieldArray({ control: form.control, name: "education" });
  const projectsFieldArray = useFieldArray({ control: form.control, name: "projects" });

  async function onSubmit(data: UserProfile) {
    setIsSubmitting(true);
    try {
      const result = await saveProfile(data);
      if (result.success) {
        toast({
          title: "Profile Saved!",
          description: "Your profile has been successfully updated.",
        });
        // Optionally redirect or refresh data
        router.push(`/profile/${data.username}`); 
      } else {
        toast({
          title: "Error Saving Profile",
          description: result.message || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills" id="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralInfoSection form={form} />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceSection form={form} fieldArray={experienceFieldArray} />
          </TabsContent>
          <TabsContent value="education">
            <EducationSection form={form} fieldArray={educationFieldArray} />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsSection form={form} />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsSection form={form} fieldArray={projectsFieldArray} />
          </TabsContent>
          <TabsContent value="settings">
            <ProfileCustomizationSection form={form} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end sticky bottom-0 bg-background/90 py-4 border-t">
          <Button type="submit" disabled={isSubmitting || !form.formState.isDirty} size="lg">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
