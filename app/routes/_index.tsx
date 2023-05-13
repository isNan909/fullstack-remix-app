import type {
  ActionFunction,
  LoaderArgs,
  V2_MetaFunction
} from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import {Form, useLoaderData} from "@remix-run/react";
import {LoaderFunction} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  return {user}
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = form.get("action")

  switch (action) {
    case "logout": {
      return await authenticator.logout(request, {redirectTo: "/login"})
    }
    default:
      return null
  }
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline text-red-500">
        Welcome to remix app {user.name}!
      </h1>
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
  );
}
