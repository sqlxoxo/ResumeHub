"use client";

import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, X as XIcon } from "lucide-react";
import React, { useState } from "react";

interface ProjectsSectionProps {
  form: UseFormReturn<UserProfile>;
  fieldArray: UseFieldArrayReturn<UserProfile, "projects", "id">;
}

export function ProjectsSection({ form, fieldArray }: ProjectsSectionProps) {
  const { fields, append, remove, update } = fieldArray;
  const [currentTechInput, setCurrentTechInput] = useState<{ [key: number]: string }>({});

  const addNewProject = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      repoUrl: "",
    });
  };

  const handleTechInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
    if (e.key === "Enter" && currentTechInput[projectIndex]?.trim()) {
      e.preventDefault();
      const project = fields[projectIndex];
      const newTech = currentTechInput[projectIndex].trim();
      if (project && !project.technologies.includes(newTech)) {
        update(projectIndex, { ...project, technologies: [...project.technologies, newTech] });
      }
      setCurrentTechInput(prev => ({ ...prev, [projectIndex]: "" }));
    }
  };

  const removeTechnology = (projectIndex: number, techToRemove: string) => {
    const project = fields[projectIndex];
    if (project) {
      update(projectIndex, {
        ...project,
        technologies: project.technologies.filter(tech => tech !== techToRemove),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Showcase your personal or professional projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((item, index) => (
          <Card key={item.id} className="p-4 relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove project</span>
            </Button>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Personal Portfolio Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, its purpose, and your role."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center">
                      {tech}
                      <button
                        type="button"
                        className="ml-1.5 text-muted-foreground hover:text-foreground"
                        onClick={() => removeTechnology(index, tech)}
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <FormControl>
                  <Input
                    placeholder="Type technology and press Enter"
                    value={currentTechInput[index] || ""}
                    onChange={(e) => setCurrentTechInput(prev => ({ ...prev, [index]: e.target.value }))}
                    onKeyDown={(e) => handleTechInputKeyDown(e, index)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name={`projects.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., https://myproject.com" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.repoUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., https://github.com/user/project" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}
        <Button type="button" variant="outline" onClick={addNewProject}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </CardContent>
    </Card>
  );
}
