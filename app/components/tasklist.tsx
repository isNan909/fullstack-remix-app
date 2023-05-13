export interface TaskListProps {
  category: any
  message: string
}

export function Tasklist({ category, message }: TaskListProps) {
  return (
  <>
    <div className="flex py-1">
      {message}
      <span className="text-xs bg-green-500 p-2">{category}</span>
    </div>
  </>
  )
}