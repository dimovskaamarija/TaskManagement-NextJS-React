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
        <h3>To Do</h3>
        <TaskLists collection="ToDo" tasks={tasks.todo} />
        <h3>In Progress</h3>
        <TaskLists collection="InProgress" tasks={tasks.inProgress} />
        <h3>Done</h3>
        <TaskLists collection="Done" tasks={tasks.done} />
      </div>
    </div>
  );
}
