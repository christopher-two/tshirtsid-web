'use server';
/**
 * @fileOverview A flow to generate product details for a t-shirt.
 *
 * - generateProductDetails - A function that generates product details.
 * - GenerateProductDetailsInput - The input type for the generateProductDetails function.
 * - GenerateProductDetailsOutput - The return type for the generateProductDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductDetailsInputSchema = z.object({
  name: z.string().describe('The name of the t-shirt.'),
  category: z.enum(['men', 'women', 'kids']).describe('The category for the t-shirt.'),
});
export type GenerateProductDetailsInput = z.infer<typeof GenerateProductDetailsInputSchema>;

const GenerateProductDetailsOutputSchema = z.object({
  description: z.string().describe('A short, catchy description for the t-shirt (around 10 words).'),
  longDescription: z.string().describe('A longer, more detailed description for the t-shirt product page (2-3 sentences).'),
  price: z.number().describe('A suggested price for the t-shirt, as a number.'),
  imageHint: z.string().describe('A 2-3 word hint for an AI image generator to create a product image (e.g., "minimalist wave shirt").'),
});
export type GenerateProductDetailsOutput = z.infer<typeof GenerateProductDetailsOutputSchema>;

export async function generateProductDetails(
  input: GenerateProductDetailsInput
): Promise<GenerateProductDetailsOutput> {
  return generateProductDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDetailsPrompt',
  input: { schema: GenerateProductDetailsInputSchema },
  output: { schema: GenerateProductDetailsOutputSchema },
  prompt: `You are an expert e-commerce copywriter specializing in the Mexican market. Your task is to generate compelling product details for a new t-shirt in Mexican Spanish, based on its name and category.

  T-Shirt Name: {{{name}}}
  Category: {{{category}}}

  Please generate the following in Mexican Spanish:
  - A short, catchy description (around 10 words).
  - A longer, detailed description for the product page (2-3 sentences).
  - A suggested retail price in a number format (e.g., 499.99). The currency is implicit.
  - A 2-3 word hint for an AI image generator (e.g., "playera geometrica").

  Provide the output in the requested JSON format. Ensure all text content is in Mexican Spanish.`,
});

const generateProductDetailsFlow = ai.defineFlow(
  {
    name: 'generateProductDetailsFlow',
    inputSchema: GenerateProductDetailsInputSchema,
    outputSchema: GenerateProductDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate product details.');
    }
    return output;
  }
);
