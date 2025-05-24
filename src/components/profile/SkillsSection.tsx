"use client";

import React, { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X as XIcon, PlusCircle, Sparkles, Loader2 } from "lucide-react";
import { getAISkillSuggestions } from "@/lib/aiActions";
import { useToast } from "@/hooks/use-toast";

interface SkillsSectionProps {
  form: UseFormReturn<UserProfile>;
}

export function SkillsSection({ form }: SkillsSectionProps) {
  const [currentSkill, setCurrentSkill] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

  const skills = form.watch("skills") || [];

  const addSkill = (skillToAdd: string) => {
    const trimmedSkill = skillToAdd.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      form.setValue("skills", [...skills, trimmedSkill], { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleAddCurrentSkill = () => {
    addSkill(currentSkill);
    setCurrentSkill("");
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCurrentSkill();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue("skills", skills.filter((skill) => skill !== skillToRemove), { shouldValidate: true, shouldDirty: true });
  };

  const handleSuggestSkills = async () => {
    if (!jobDescription.trim()) {
      toast({ title: "Job Description Empty", description: "Please enter a job description or title to get suggestions.", variant: "destructive" });
      return;
    }
    setIsLoadingSuggestions(true);
    setSuggestedSkills([]);
    try {
      const result = await getAISkillSuggestions({ jobDescription });
      if (result.skills && result.skills.length > 0) {
        setSuggestedSkills(result.skills.filter(s => !skills.includes(s))); // Filter out already added skills
        toast({ title: "Skills Suggested!", description: "Review the suggestions below." });
      } else {
        toast({ title: "No New Suggestions", description: "AI couldn't find new skills, or an error occurred." });
      }
    } catch (error) {
      console.error("Failed to get AI skill suggestions:", error);
      toast({ title: "Error", description: "Failed to get skill suggestions. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Highlight your key competencies. Use AI to get suggestions!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormItem>
          <FormLabel>Your Skills</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md min-h-[40px]">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center text-sm py-1 px-2">
                {skill}
                <button
                  type="button"
                  className="ml-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => removeSkill(skill)}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {skills.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
          </div>
          <div className="flex gap-2">
            <FormControl>
              <Input
                placeholder="e.g., React, Python, Project Management"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
              />
            </FormControl>
            <Button type="button" variant="outline" onClick={handleAddCurrentSkill} disabled={!currentSkill.trim()}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
          <FormMessage>{form.formState.errors.skills?.message}</FormMessage>
        </FormItem>

        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold">AI Skill Suggestions</h3>
          <FormItem>
            <FormLabel htmlFor="jobDescription">Job Title or Description</FormLabel>
            <Textarea
              id="jobDescription"
              placeholder="Enter a job title (e.g., 'Frontend Developer') or a short job description to get skill suggestions."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </FormItem>
          <Button type="button" onClick={handleSuggestSkills} disabled={isLoadingSuggestions}>
            {isLoadingSuggestions ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Suggest Skills
          </Button>
          {suggestedSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Click a skill to add it to your profile:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm py-1 px-2"
                    onClick={() => {
                      addSkill(skill);
                      setSuggestedSkills(prev => prev.filter(s => s !== skill));
                    }}
                  >
                    {skill} <PlusCircle className="ml-1.5 h-3 w-3"/>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
