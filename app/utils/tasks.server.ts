import { prisma } from "./prisma.server"
import { json } from "@remix-run/node"
import { TaskData } from "~/types/jobs"

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
    return taskById;
  }

  if (!userID) {
    return json({ error: `The users doesnot have any tasks` });
  }
};

export const createTask = async ({category, message, postedBy} : TaskData) => {
  const taskById = await prisma.task.create({
    data: { category, message, postedBy },
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

export const deleteTask = async (id: any) => {
  const taskById = await prisma.task.delete({ where: { id } });
  if(!taskById){
    return json({error: 'Could not post the task'})
  }
  return json({
    message: "Task deleted",
    success: "true",
    payload: id,
  })
}