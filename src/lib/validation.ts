import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(160),
  projectType: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (min 10 characters)")
    .max(4000),
  // Honeypot — must stay empty
  company: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const postInputSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  excerpt: z.string().trim().min(10).max(320),
  content: z.string().trim().min(1),
  coverImage: z.string().trim().url().optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  status: z.enum(["draft", "published"]),
});

export type PostFormInput = z.infer<typeof postInputSchema>;
