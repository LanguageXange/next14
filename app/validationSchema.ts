import { z } from "zod";

// schema validation
// We can customize error message
export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description required!"),
});
