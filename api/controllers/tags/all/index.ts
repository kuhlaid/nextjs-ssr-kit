import type { Request, Response } from "express";
import Tag from "~models/tag";

const getTags = async (_: Request, res: Response): Promise<Response> => {
  const tags = await Tag.find({}).lean();

  return res.status(200).send(tags);
};

export default getTags;
