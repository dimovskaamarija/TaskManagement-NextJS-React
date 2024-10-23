import type { Task } from "@/lib/firebase/tasks";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  collection: string;
  handleDrop: (taskId: string, newCollection: string) => Promise<void>;
}
export default function TaskLists({
  tasks,
  collection,
  handleDrop,
}: TaskListProps) {
  const handleDropEvent = async (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    await handleDrop(taskId, collection);
  };

  return (
    <div
      className="task-list"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropEvent}
    >
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            collection={collection}
            task={task}
            handleDrop={handleDrop}
          />
        ))}
      </ul>
    </div>
  );
}
