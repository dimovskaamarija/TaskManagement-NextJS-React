import { collection, query, where , getDocs, getDoc, deleteDoc, doc, addDoc,updateDoc} from "firebase/firestore"
import {db} from "./FirebaseConfig"
export interface Task {
    id: string;
    task: string;
    userId: string;
  }
 export interface TaskList{
    todo:Task[],
    inProgress:Task[],
    done:Task[],
    [key: string]: Task[];
  }

export async function loadContent(userId:string) {
   const tasks:TaskList={
    todo:[],
    inProgress:[],
    done:[]
    }
    const toDoQuery=query(collection(db,"ToDo"),where("userId","==",userId))
    const inProgressQuery=query(collection(db,"InProgress"),where("userId","==",userId))
    const doneQuery=query(collection(db,"Done"),where("userId","==",userId))
try{
const toDoSnapshot=await getDocs(toDoQuery)
toDoSnapshot.forEach(doc => tasks.todo.push({id:doc.id,task:doc.data().task, userId:doc.data().userId}) )
const inProgressSnapshot=await getDocs(inProgressQuery)
inProgressSnapshot.forEach(doc=>tasks.inProgress.push({id:doc.id, task: doc.data().task, userId:doc.data().userId}))
const doneSnapshot=await getDocs(doneQuery)
doneSnapshot.forEach(doc=>tasks.done.push({id:doc.id,task:doc.data().task,userId:doc.data().userId}))    
return tasks;
}catch(error){
    console.error("Error loading tasks: ",error)
}
    
}
export async function deleteTask(taskId:string,collectionName:string) {
    try{
        await deleteDoc(doc(db,collectionName,taskId))
        
    }
    catch(error){
        console.error("Error deleting task: ",error)
    }
    
}
export async function addNewTask(taskValue:string, userId:string) {
    try{
        await addDoc(collection(db,"ToDo"),
        {
            task:taskValue,
            userId:userId
        })

    }catch(error){
        console.log("Error adding new task: ",error)
    }

}

export const updateTaskCollection = async (taskId: string, newCollection: string, task: Task) => {
    try {
        await addDoc(collection(db, newCollection), {
            task: task.task,
            userId: task.userId,
        });
    } catch (error) {
        console.error("Error updating task collection: ", error);
    }
};
