"use client"; // This page involves client-side state for the form

import { ProfileForm } from "@/components/profile/ProfileForm";
import { getProfileByUsername } from "@/lib/actions"; // Assuming this can fetch current user's profile
import type { UserProfile } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock current user - in a real app, this would come from auth context/session
const MOCK_USER_ID = "current-user-123";
const MOCK_USER_EMAIL = "current.user@example.com";
const MOCK_USERNAME = "current-user"; // This would be the user's actual username

export default function EditProfilePage() {
  const [initialProfile, setInitialProfile] = useState<UserProfile | null | undefined>(undefined); // undefined for loading state

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Fetch profile using a known identifier, like a username or ID from auth
        const profile = await getProfileByUsername(MOCK_USERNAME); 
        setInitialProfile(profile);
      } catch (error) {
        console.error("Failed to fetch profile for editing:", error);
        setInitialProfile(null); // Set to null on error to allow creating new
      }
    }
    fetchProfile();
  }, []);


  if (initialProfile === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-10 w-32 self-end" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {initialProfile ? "Edit Your Profile" : "Create Your Profile"}
        </h1>
        <p className="text-muted-foreground">
          Fill in the details to create or update your professional ProfileCard.
        </p>
      </div>
      <ProfileForm 
        initialProfile={initialProfile}
        userId={MOCK_USER_ID}
        userEmail={MOCK_USER_EMAIL}
      />
    </div>
  );
}
