import { Form } from "@remix-run/react";

export function Taskform() {
  return (
    <>
      <Form method="post">
        <div>
          <label className="font-semibold mr-2" htmlFor="year">
            Category
          </label>

          <select
            name="category"
            id="category"
            className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1 h-9"
            defaultValue="others"
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
        <div>
          <label>
            Task:
          </label>
          <textarea
            name="message"
            id="message"
            className="border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
          />
        </div>
        <div>
          <button
            type="submit"
            name="action"
            value="new" className="w-block rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600" >
            Add task
          </button>
        </div>
      </Form>
    </>
  )
}