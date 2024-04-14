import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  console.log("404 Not Found");
  res.status(404).json({ error: "404 Not Found" });
};

export { notFound };
