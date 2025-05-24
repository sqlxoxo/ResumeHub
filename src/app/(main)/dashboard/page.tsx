"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Edit3, Eye } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data, replace with actual user data fetching
const userProfile = {
  username: "sample-user",
  fullName: "Demo User",
  headline: "Aspiring Full Stack Developer",
  shareableLink: "/profile/sample-user" // This should be dynamically generated
};

export default function DashboardPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const fullShareableLink = origin ? `${origin}${userProfile.shareableLink}` : userProfile.shareableLink;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userProfile.fullName}!</h1>
          <p className="text-muted-foreground">Manage your ProfileCard and share your journey.</p>
        </div>
        <Button asChild>
          <Link href="/profile/edit">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your ProfileCard</CardTitle>
          <CardDescription>{userProfile.headline}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Shareable Link:</p>
            <Link href={userProfile.shareableLink} className="text-sm text-primary hover:underline break-all" target="_blank" rel="noopener noreferrer">
              {fullShareableLink}
            </Link>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href={userProfile.shareableLink} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" /> View Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (fullShareableLink) {
                  navigator.clipboard.writeText(fullShareableLink);
                  // Consider adding a toast notification here for "Link copied!"
                  alert("Profile link copied to clipboard!");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" /> Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Completeness</CardTitle>
            <CardDescription>Make sure your profile stands out.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a progress bar or checklist */}
            <p className="text-sm text-muted-foreground">Profile is 75% complete. Add projects to make it 100%!</p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-2">
              <div className="bg-primary h-2.5 rounded-full" style={{width: "75%"}}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Skill Suggestions</CardTitle>
            <CardDescription>Enhance your profile with AI-powered skill recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Visit the 'Edit Profile' page to find relevant skills based on your desired job roles.</p>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="/profile/edit#skills">Suggest Skills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
