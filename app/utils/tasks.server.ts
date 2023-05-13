import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";
import { TaskData } from "~/types/jobs";

export const getMyTasks = async (userID: string) => {
  if (userID) {
    const taskById = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        task: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    console.log(taskById, 'taskById');
    return taskById;
  }

  if (!userID) {
    return json({ error: `The users doesnot have any tasks` });
  }
};

export const createTask = async ({category, message} : TaskData) => {
  const taskById = await prisma.task.create({
    data: { category, message },
  });
  if(!taskById){
    return json({error: 'Could not post the task'})
  }
  return json({
    message: "Task created successfully",
    success: "true",
    payload: taskById,
  })
}