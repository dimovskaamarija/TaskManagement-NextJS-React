"use client";
import { TaskList, loadContent } from "@/lib/firebase/tasks";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import TaskLists from "@/components/tasks/TaskLists";
import { auth } from "@/lib/firebase/FirebaseConfig";
import AddNewTask from "@/components/tasks/AddTaskInput";
import SignOutComponent from "@/components/auth/SignOutComponent";
import Link from "next/link";
import { deleteTask, updateTaskCollection } from "@/lib/firebase/tasks";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskList>({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Log in first!");
      } else {
        const data = await loadContent(user.uid);
        if (data) {
          setTasks(data);
        } else {
          console.log("Error fetching data");
        }
      }
    });
    return () => unsubscribe();
  }, [isMounted, router]);

  const handleDrop = async (taskId: string, newCollection: string) => {
    console.log("Dropping task ID:", taskId);

    const oldCollectionKey = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === taskId)
    );

    let formattedOldCollection;
    if (oldCollectionKey === "todo") {
      formattedOldCollection = "ToDo";
    } else if (oldCollectionKey === "inProgress") {
      formattedOldCollection = "InProgress";
    } else if (oldCollectionKey === "done") {
      formattedOldCollection = "Done";
    } else {
      console.error(`Invalid old collection name: ${oldCollectionKey}`);
      return;
    }

    const taskToMove = tasks[oldCollectionKey]?.find(
      (task) => task.id === taskId
    );
    if (taskToMove) {
      await deleteTask(taskId, formattedOldCollection);
      await updateTaskCollection(taskId, newCollection, taskToMove);

      const updatedTasks = {
        ...tasks,
        [oldCollectionKey]:
          tasks[oldCollectionKey]?.filter((task) => task.id !== taskId) || [],
        [newCollection]: [...(tasks[newCollection] || []), taskToMove],
      };

      setTasks(updatedTasks);
      window.location.reload();
    } else {
      console.error(
        `Task with ID ${taskId} not found in old collection ${formattedOldCollection}`
      );
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      {auth.currentUser ? (
        <SignOutComponent />
      ) : (
        <div>
          <Link href="/signIn">
            <button>Sign In</button>
          </Link>
          <Link href="/signUp">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      <h1>Task Management</h1>
      <AddNewTask />
      <div className="containers">
        <div className="container-item">
          <h3>TO DO:</h3>
          <TaskLists
            collection="ToDo"
            tasks={tasks.todo}
            handleDrop={handleDrop}
          />
        </div>
        <div className="container-item">
          <h3>IN PROGRESS:</h3>
          <TaskLists
            collection="InProgress"
            tasks={tasks.inProgress}
            handleDrop={handleDrop}
          />
        </div>
        <div className="container-item">
          <h3>DONE:</h3>
          <TaskLists
            collection="Done"
            tasks={tasks.done}
            handleDrop={handleDrop}
          />
        </div>
      </div>
    </div>
  );
}
