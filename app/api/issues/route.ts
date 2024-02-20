import { z } from "zod";
import prisma from "@/prisma/client";
// schema validation

// We can customize error message
const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

// /api/issues end point
export async function POST(request: Request) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    // we can format the error better by calling `format()`
    return Response.json(validation.error.format(), { status: 400 }); // bad request
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return Response.json(newIssue, { status: 201 });
}
