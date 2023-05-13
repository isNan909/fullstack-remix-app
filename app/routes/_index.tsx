import type {
  ActionFunction,
  V2_MetaFunction
} from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import {Form, useLoaderData} from "@remix-run/react";
import {LoaderFunction} from "@remix-run/node";
import {createTask, getMyTasks, deleteTask} from "~/utils/tasks.server";
import { Taskform } from "~/components/taskform";
import {Tasklist, TaskListProps} from "~/components/tasklist";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
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
      // console.log("delete task", id)
      const deletedTask = await deleteTask(id);
      return deletedTask
    }
    default:
      return null
  }
}

export default function Index() {
  const { user, userTask } = useLoaderData<typeof loader>()
  // console.log(userTask.task, 'task list')
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="d-flex flex-row">
        <div>
          <span className="text-xs font-normal">
            Welcome {user.name}!
          </span>
        </div>
        <div className="flex items-center">
          <h1 className="text-3xl font-bold py-3">Tasklist tracking</h1>
          {user ? (
            <Form method="post">
              <button
                type="submit"
                name="action"
                value="logout"
                className="text-red-500 py-1 px-3 rounded-md font-semibold"
              >
                Logout
              </button>
            </Form>
          ) : null}
        </div>
      </div>
      <br/>
      <Taskform/>
      <br/>
      <div>
        {userTask.task.length ? <> {userTask.task.map((task: TaskListProps) => {
          return(
            <Tasklist key={task.id} id={task.id} message={task.message} category={task.category}/>
          )
        })}
        </> : "no task list"}
      </div>
    </div>
  );
}
