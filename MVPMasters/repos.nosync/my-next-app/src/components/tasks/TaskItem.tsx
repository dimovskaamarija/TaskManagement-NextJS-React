import { deleteTask } from "@/lib/firebase/tasks";
import type { Task } from "@/lib/firebase/tasks";
interface TaskProps {
  task: Task;
  collection: string;
}
export default function TaskItem({ task, collection }: TaskProps) {
  const handleDelete = async () => {
    await deleteTask(task.id, collection);
    window.location.reload();
  };
  return (
    <li className="task">
      {task.task}

      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
