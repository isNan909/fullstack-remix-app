import {Form} from "@remix-run/react";

export interface TaskListProps {
  category: any
  message: string
  id: string
}

export function Tasklist({ category, message, id }: TaskListProps) {
  return (
  <>
    <div className="flex py-1">
      <div>
        {message}
        <span className="text-xs bg-green-500 p-2">{category}</span>
      </div>
      <div>
        <Form method="post">
          <button
            className="button"
            name="action"
            type="submit"
            value="delete"
          >
            Delete
          </button>
          <input type="hidden" name="id" value={id} />
        </Form>
      </div>
    </div>
  </>
  )
}