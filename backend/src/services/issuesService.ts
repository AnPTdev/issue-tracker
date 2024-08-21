import { Request, Response } from "express";

let issues: { id: number; title: string; description: string }[] = [
  { id: 1, title: "Test Issue 1", description: "Description 1" },
  { id: 2, title: "Test Issue 2", description: "Description 2" },
];

export const getIssues = (req: Request, res: Response) => {
  res.json(issues);
};

export const createIssue = (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }
  const newIssue = { id: Number(Date.now()), title, description };
  issues.push(newIssue);
  console.log("Created:", newIssue);
  res.status(201).json(newIssue);
};

export const updateIssue = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const issueIndex = issues.findIndex((issue) => issue.id === Number(id));
  if (issueIndex === -1) {
    return res.status(404).send("Issue not found");
  }
  const updatedIssue = { id: Number(id), title, description };
  issues[issueIndex] = updatedIssue;
  console.log("Updated:", updatedIssue);
  res.json(issues[issueIndex]);
};

export const deleteIssue = (req: Request, res: Response) => {
  const { id } = req.params;
  issues = issues.filter((issue) => issue.id !== Number(id));
  console.log("Deleted Issue with ID:", id);
  res.status(204).send();
};
