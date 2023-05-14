import { Form } from "@remix-run/react";
import { HiTrash } from "react-icons/hi2";

export interface TaskListProps {
  category: any
  message: string
  id: string
}

export function Tasklist({ category, message, id }: TaskListProps) {
  return (
  <>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-md">{message}</p>
        <span className="text-xs bg-green-100 border px-2 py-1 rounded text-green-700">{category}</span>
      </div>
      <div>
        <Form method="post">
          <button
            className="button"
            name="action"
            type="submit"
            value="delete"
          >
            <HiTrash/>
          </button>
          <input type="hidden" name="id" value={id} />
        </Form>
      </div>
    </div>
  </>
  )
}