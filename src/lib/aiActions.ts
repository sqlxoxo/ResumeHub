"use server";

import { suggestSkills, type SuggestSkillsInput, type SuggestSkillsOutput } from "@/ai/flows/suggest-skills";

export async function getAISkillSuggestions(input: SuggestSkillsInput): Promise<SuggestSkillsOutput> {
  try {
    const result = await suggestSkills(input);
    return result;
  } catch (error)
  {
    console.error("Error getting AI skill suggestions:", error);
    // Return a structured error or an empty skills array
    return { skills: [] };
  }
}
