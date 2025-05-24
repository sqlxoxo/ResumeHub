import { getProfileByUsername } from "@/lib/actions";
import { ProfileView } from "@/components/profile/ProfileView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const profile = await getProfileByUsername(params.username);
  if (!profile) {
    return {
      title: "Profile Not Found | ProfileCard",
    };
  }
  return {
    title: `${profile.fullName} | ProfileCard`,
    description: profile.headline || `View ${profile.fullName}'s professional profile on ProfileCard.`,
  };
}


export default async function UserProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return (
      <div className="container mx-auto py-12 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find a profile for "{username}".
        </p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileView profile={profile} />
    </div>
  );
}
