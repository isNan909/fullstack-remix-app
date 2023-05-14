import { Form } from "@remix-run/react";

export function Taskform() {
  return (
    <>
      <Form method="post">
        <div className="mb-5">
          <label className="font-semibold mb-2 block" htmlFor="category">
            Category
          </label>

          <select
            name="category"
            id="category"
            className="border-2 w-full rounded-md mr-8 border-gray-600 px-3 py-1 h-9"
            defaultValue="OTHERS"
          >
            <option key="home" value="HOME">
              Home
            </option>
            <option key="office" value="OFFICE">
              Office
            </option>
            <option key="others" value="OTHERS">
              Others
            </option>
          </select>
        </div>
        <div className="mb-5">
          <label className="font-semibold mb-2 block" htmlFor="task">
            Task
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
          />
        </div>
        <div>
          <button
            type="submit"
            name="action"
            value="new" className="w-full rounded-xl bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600" >
            Add task
          </button>
        </div>
      </Form>
    </>
  )
}