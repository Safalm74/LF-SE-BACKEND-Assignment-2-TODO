//interface to receive task
import { ITask } from "../interface/task";
// importing model 
import * as TaskHandlerModel from "../models/taskHandler";

//service to handle create task
export function createTask(task:ITask) {
  return TaskHandlerModel.createTask(task);
}

//service to handle read task
export function readTasks() {
  const readData = TaskHandlerModel.readTasks();
  return readData;
}
//service to handle read task
export function readRemainingTasks() {
  const readData = TaskHandlerModel.readRemainingTasks();
  return readData;
}
//service to handle read task
export function readFinishedTasks() {
  const readData = TaskHandlerModel.readFinishedTasks();
  return readData;
}

//service to handle update task
export function updatedTask(id:string,updatedTask:ITask){
  return TaskHandlerModel.updateTask(id,updatedTask);
}

//service to handle delete task
export function deleteTask(taskId:string) {
  return TaskHandlerModel.deleteTask(taskId);
}