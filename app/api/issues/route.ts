import { z } from "zod";
import prisma from "@/prisma/client";
// schema validation
const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.errors, { status: 400 }); // bad request
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return Response.json(newIssue, { status: 201 });
}
