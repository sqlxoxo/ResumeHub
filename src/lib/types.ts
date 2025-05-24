export interface ContactInfo {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string; // Consider using Date objects if handling timezones, string for simplicity
  endDate?: string; // Empty or null if current
  description: string;
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  repoUrl?: string;
}

export interface ProfileCustomizationSettings {
  showContact: boolean;
  showSummary: boolean;
  showExperience: boolean;
  showEducation: boolean;
  showSkills: boolean;
  showProjects: boolean;
  themeColor?: string; // Example for future theme customization
}

export interface UserProfile {
  id: string; // Corresponds to user ID or a unique profile ID
  username: string; // Unique, shareable username
  fullName: string;
  headline: string; // e.g., "Software Engineer at XYZ"
  summary?: string;
  avatarUrl?: string;
  contactInfo: ContactInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  settings: ProfileCustomizationSettings;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

// Default values for a new profile
export const defaultProfileCustomizationSettings: ProfileCustomizationSettings = {
  showContact: true,
  showSummary: true,
  showExperience: true,
  showEducation: true,
  showSkills: true,
  showProjects: true,
};

export const newEmptyProfile = (userId: string, username: string, email: string): UserProfile => ({
  id: userId,
  username,
  fullName: "",
  headline: "",
  summary: "",
  avatarUrl: `https://placehold.co/128x128.png?text=${username.charAt(0).toUpperCase()}`,
  contactInfo: { email },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  settings: { ...defaultProfileCustomizationSettings },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
