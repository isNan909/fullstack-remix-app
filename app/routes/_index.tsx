import type {
  ActionFunction,
  V2_MetaFunction
} from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import {Form, useLoaderData} from "@remix-run/react";
import {LoaderFunction} from "@remix-run/node";
import {createTask, getMyTasks} from "~/utils/tasks.server";
import { Taskform } from "~/components/taskform";

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
      // post the form
      const newTask = createTask({
        category: Category,
        message: Message
      })
      return ''
    }
    default:
      return null
  }
}

export default function Index() {
  const { user, userTask } = useLoaderData<typeof loader>()
  // console.log(user, userTask)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="d-flex flex-row">
        <div>
          <h1 className="text-3xl font-bold underline text-red-500">
            Welcome to remix app {user.name}!
          </h1>
        </div>
        <div>
          {user ? (
            <Form method="post">
              <button
                type="submit"
                name="action"
                value="logout"
                className="bg-white text-black border-2 border-black py-1 px-3 rounded-md font-semibold"
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
        {userTask.length ? "you have some tasks" : "no task list"}
      </div>
    </div>
  );
}
