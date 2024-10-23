import { deleteTask } from "@/lib/firebase/tasks";
import type { Task } from "@/lib/firebase/tasks";

interface TaskProps {
  task: Task;
  collection: string;
  handleDrop: (taskId: string, newCollection: string) => Promise<void>;
}

export default function TaskItem({ task, collection, handleDrop }: TaskProps) {
  const handleDelete = async () => {
    await deleteTask(task.id, collection);
    window.location.reload();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("collection", collection);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <li
      className="task"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      {task.task}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
