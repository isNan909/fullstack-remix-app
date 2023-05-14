import type {
  ActionFunction,
  V2_MetaFunction
} from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { createTask, getMyTasks, deleteTask } from "~/utils/tasks.server";
import { Taskform } from "~/components/taskform";
import { Tasklist, TaskListProps } from "~/components/tasklist";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Fullstack Remix App" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  const userTask = await getMyTasks(user.id)
  return { user, userTask }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = form.get("action")

  switch (action) {
    case "logout": {
      return await authenticator.logout(request, {redirectTo: "/login"})
    }
    case "new": {
      const Category = form.get("category")
      const Message = form.get("message")
      const user = await authenticator.isAuthenticated(request)
      const newTask = await createTask({
        category: Category,
        message: Message,
        postedBy: {
          connect: {
            id:  user.id
          }
        }
      })
      return newTask
    }
    case "delete": {
      const id = form.get("id")
      const deletedTask = await deleteTask(id)
      return deletedTask
    }
    default:
      return null
  }
}

export default function Index() {
  const { user, userTask } = useLoaderData<typeof loader>()
  return (
    <div className="h-full bg-yellow-100 pt-10">
      <div className="max-w-md mx-auto items-left flex flex-col bg-white p-6">
        <div className="d-flex flex-row mb-10">
          <h2 className="text-sm font-normal text-gray-500">
            Welcome {user.name}!
          </h2>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold pe-2">Task tracking app</h1>
            {user ? (
              <Form method="post">
                <button
                  type="submit"
                  name="action"
                  value="logout"
                  className="text-red-500 py-1 border px-3 text-sm rounded-md font-semibold"
                >
                  Logout
                </button>
              </Form>
            ) : null}
          </div>
        </div>
        <Taskform/>
        <br/>
        <div className="grid gap-5">
          {userTask.task.length ? <> {userTask.task.map((task: TaskListProps) => {
            return(
              <Tasklist key={task.id} id={task.id} message={task.message} category={task.category}/>
            )
          })}
          </> : "no task list"}
        </div>
      </div>
    </div>
  );
}
