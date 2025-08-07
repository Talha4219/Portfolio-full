// SkillsExplorer flow
'use server';

/**
 * @fileOverview AI-powered 'Skills Explorer' tool that recommends additional relevant skills.
 *
 * - getSkillsRecommendations - A function that handles the skill recommendation process.
 * - SkillsExplorerInput - The input type for the getSkillsRecommendations function.
 * - SkillsExplorerOutput - The return type for the getSkillsRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsExplorerInputSchema = z.object({
  currentSkills: z.array(z.string()).describe('A list of skills currently listed in the About Me section.'),
});
export type SkillsExplorerInput = z.infer<typeof SkillsExplorerInputSchema>;

const SkillsExplorerOutputSchema = z.object({
  recommendedSkills: z
    .array(z.string())
    .describe('A list of recommended skills based on the current skills.'),
});
export type SkillsExplorerOutput = z.infer<typeof SkillsExplorerOutputSchema>;

export async function getSkillsRecommendations(input: SkillsExplorerInput): Promise<SkillsExplorerOutput> {
  return skillsExplorerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillsExplorerPrompt',
  input: {schema: SkillsExplorerInputSchema},
  output: {schema: SkillsExplorerOutputSchema},
  prompt: `You are a career advisor specializing in technology-related roles.

Based on the current skills listed in the About Me section, recommend additional relevant skills that would improve the user's chances of success.

Current Skills:
{{#each currentSkills}}
- {{this}}
{{/each}}

Recommended Skills:
`, 
});

const skillsExplorerFlow = ai.defineFlow(
  {
    name: 'skillsExplorerFlow',
    inputSchema: SkillsExplorerInputSchema,
    outputSchema: SkillsExplorerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
