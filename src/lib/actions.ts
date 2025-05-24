"use server";

import { UserProfile } from "./types";

// This is a mock database. In a real application, you'd use Firebase Firestore or another database.
const MOCK_DB: { [key: string]: UserProfile } = {};

export async function saveProfile(profileData: UserProfile): Promise<{ success: boolean; message: string; profileId?: string }> {
  console.log("Attempting to save profile for user:", profileData.username);
  
  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!profileData.username) {
    console.error("Error: Username is required to save profile.");
    return { success: false, message: "Username is required." };
  }

  MOCK_DB[profileData.username] = {
    ...profileData,
    updatedAt: new Date().toISOString(),
  };

  console.log("Profile saved successfully for:", profileData.username, MOCK_DB[profileData.username]);
  return { success: true, message: "Profile saved successfully!", profileId: profileData.id };
}

export async function getProfileByUsername(username: string): Promise<UserProfile | null> {
  console.log("Attempting to fetch profile for username:", username);
  
  // Simulate database operation
  await new Promise(resolve => setTimeout(resolve, 300));

  const profile = MOCK_DB[username];
  
  if (profile) {
    console.log("Profile found for:", username);
    return profile;
  } else {
    // For testing, if no profile, return a sample one for "sample-user"
    if (username === "sample-user") {
      console.log("Returning sample profile for:", username);
      const sampleProfile: UserProfile = {
        id: "sample-user-id",
        username: "sample-user",
        fullName: "Sample User",
        headline: "Creative Designer & Developer",
        summary: "A passionate designer and developer with a knack for creating intuitive and beautiful user experiences. Proficient in various design tools and front-end technologies.",
        avatarUrl: "https://placehold.co/128x128.png?text=SU",
        contactInfo: {
          email: "sample.user@example.com",
          phone: "123-456-7890",
          linkedin: "linkedin.com/in/sampleuser",
          github: "github.com/sampleuser",
          portfolio: "sampleuser.dev"
        },
        workExperience: [
          { id: "exp1", company: "Tech Solutions Inc.", role: "UX Designer", startDate: "2020-01-01", endDate: "2022-12-31", description: "Designed user interfaces for web and mobile applications, conducted user research, and created prototypes.", location: "San Francisco, CA" },
          { id: "exp2", company: "Innovate Ltd.", role: "Junior Web Developer", startDate: "2018-06-01", endDate: "2019-12-31", description: "Developed and maintained company websites using HTML, CSS, and JavaScript.", location: "Remote" },
        ],
        education: [
          { id: "edu1", institution: "State University", degree: "B.S. in Computer Science", fieldOfStudy: "Computer Science", startDate: "2014-09-01", endDate: "2018-05-31", description: "Graduated with honors." },
        ],
        skills: ["UI/UX Design", "Prototyping", "User Research", "HTML", "CSS", "JavaScript", "React", "Figma", "Adobe XD"],
        projects: [
          { id: "proj1", name: "Portfolio Website", description: "Personal portfolio website to showcase projects and skills.", technologies: ["Next.js", "Tailwind CSS", "TypeScript"], url: "sampleuser.dev" },
          { id: "proj2", name: "Task Management App", description: "A concept app for managing daily tasks.", technologies: ["React Native", "Firebase"], repoUrl:"github.com/sampleuser/taskapp" }
        ],
        settings: {
          showContact: true,
          showSummary: true,
          showExperience: true,
          showEducation: true,
          showSkills: true,
          showProjects: true,
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
        updatedAt: new Date().toISOString(),
      };
      MOCK_DB["sample-user"] = sampleProfile; // Store it for subsequent calls
      return sampleProfile;
    }
    console.log("No profile found for:", username);
    return null;
  }
}

// Initialize sample-user profile if it doesn't exist
if (!MOCK_DB["sample-user"]) {
  getProfileByUsername("sample-user"); // This will create and cache it
}
