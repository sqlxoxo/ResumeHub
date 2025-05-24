import { UserProfile } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Lightbulb, Mail, Phone, Linkedin, Github, Link as LinkIcon, User, FolderGit2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileViewProps {
  profile: UserProfile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  const { settings } = profile;

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return "";
    const start = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    const end = endDate ? new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-0">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg shadow-md">
        <Image
          src={profile.avatarUrl || `https://placehold.co/128x128.png?text=${profile.fullName.charAt(0)}`}
          alt={`${profile.fullName}'s avatar`}
          width={128}
          height={128}
          className="rounded-full border-4 border-primary shadow-lg"
          data-ai-hint="user avatar"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary">{profile.fullName}</h1>
          <p className="text-xl text-muted-foreground">{profile.headline}</p>
          {settings.showContact && profile.contactInfo.email && (
             <a href={`mailto:${profile.contactInfo.email}`} className="text-sm text-accent hover:underline flex items-center justify-center md:justify-start mt-1">
               <Mail className="h-4 w-4 mr-1" /> {profile.contactInfo.email}
             </a>
          )}
        </div>
      </header>

      {/* Contact and Links Section */}
      {settings.showContact && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-primary" />Contact & Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {profile.contactInfo.phone && <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-muted-foreground" /> {profile.contactInfo.phone}</p>}
            {profile.contactInfo.linkedin && <a href={`https://${profile.contactInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:underline"><Linkedin className="h-4 w-4 mr-2" /> LinkedIn</a>}
            {profile.contactInfo.github && <a href={`https://${profile.contactInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:underline"><Github className="h-4 w-4 mr-2" /> GitHub</a>}
            {profile.contactInfo.portfolio && <a href={`https://${profile.contactInfo.portfolio.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:underline"><LinkIcon className="h-4 w-4 mr-2" /> Portfolio</a>}
          </CardContent>
        </Card>
      )}

      {/* Summary Section */}
      {settings.showSummary && profile.summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-primary" />Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{profile.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Work Experience Section */}
      {settings.showExperience && profile.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary" />Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.workExperience.map((exp, index) => (
              <div key={exp.id}>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-md text-accent">{exp.company} {exp.location && `| ${exp.location}`}</p>
                <p className="text-sm text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate)}</p>
                <p className="mt-1 text-sm text-foreground/80 whitespace-pre-line">{exp.description}</p>
                {index < profile.workExperience.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education Section */}
      {settings.showEducation && profile.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><GraduationCap className="mr-2 h-5 w-5 text-primary" />Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.education.map((edu, index) => (
              <div key={edu.id}>
                <h3 className="text-lg font-semibold">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                <p className="text-md text-accent">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate)}</p>
                {edu.description && <p className="mt-1 text-sm text-foreground/80 whitespace-pre-line">{edu.description}</p>}
                {index < profile.education.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {/* Projects Section */}
      {settings.showProjects && profile.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><FolderGit2 className="mr-2 h-5 w-5 text-primary" />Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.projects.map((project, index) => (
              <div key={project.id}>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                {project.url && <a href={`https://${project.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center"><LinkIcon className="h-3 w-3 mr-1" />View Project</a>}
                {project.repoUrl && <a href={`https://${project.repoUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center ml-2"><Github className="h-3 w-3 mr-1" />View Code</a>}
                <p className="mt-1 text-sm text-foreground/80 whitespace-pre-line">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                  </div>
                )}
                {index < profile.projects.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills Section */}
      {settings.showSkills && profile.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-primary" />Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <Badge key={skill} variant="default" className="text-sm px-3 py-1">{skill}</Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
