import { Request, Response } from "express";
//importing services for task handler
import * as TaskhandlerService from "../services/taskHandlers";

//controller function to createtask
export function createTask(req: Request, res: Response) {
  const { body } = req;
  try {
    res.json({
      Message: TaskhandlerService.createTask(body),
    });
  } catch (e) {
    console.log("Error occurred: ", e);
    res.json({
      Error: e,
    });
  }
}

//controller function to readtask
export function readTasks(req: Request, res: Response) {
  const data = TaskhandlerService.readTasks();
  res.json(data);
}

//controller function to readtask
export function readRemainingTasks(req: Request, res: Response) {
  const data = TaskhandlerService.readRemainingTasks();
  res.json(data);
}

//controller function to readtask
export function readFinishedTasks(req: Request, res: Response) {
  const data = TaskhandlerService.readFinishedTasks();
  res.json(data);
}

//controller function to update task
export function updatedTask(req: Request, res: Response) {
  const id = req.params.id;
  const { body } = req;
  try {
    res.json({
      msg: TaskhandlerService.updatedTask(id, body),
    });
  } catch (e) {
    console.log("Error occurred: ", e);
    res.json({
      Error: e,
    });
  }
}

//controller function to delete task
export function deleteTask(req: Request, res: Response) {
  const id = req.params.id;
  try {
    res.json({
      msg: TaskhandlerService.deleteTask(id),
    });
  } catch (e) {
    console.log("Error occurred: ", e);
    res.json({
      Error: e,
    });
  }
}