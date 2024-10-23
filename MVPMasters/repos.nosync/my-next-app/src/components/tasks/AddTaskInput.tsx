"use client";
import { FormEvent, useState } from "react";
import { addNewTask } from "@/lib/firebase/tasks";
import { auth } from "@/lib/firebase/FirebaseConfig";

export default function AddNewTask() {
  const [newTask, setNewTask] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await addNewTask(newTask, user.uid);
      window.location.reload();
    } else {
      console.log("No user found");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add new Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}
