import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

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
