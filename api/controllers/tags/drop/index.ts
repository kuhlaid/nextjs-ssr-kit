import type { Request, Response } from "express";
import Tag from "~models/tag";

const dropTags = async (_: Request, res: Response): Promise<void> => {
  await Tag.deleteMany({});
  return res.status(201).end();
};

export default dropTags;
