import type { Task } from "@/lib/firebase/tasks";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  collection: string;
}
export default function TaskLists({ tasks, collection }: TaskListProps) {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} collection={collection} task={task} />
        ))}
      </ul>
    </div>
  );
}
