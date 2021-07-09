import type { Request, Response } from "express";
import Tag from "~models/tag";
import tagSeeds from "~database/seedDB/tagSeeds";

const seedTags = async (_: Request, res: Response): Promise<Response> => {
  await Tag.deleteMany({});
  await Tag.insertMany(tagSeeds);

  const tags = await Tag.find({});

  return res.status(201).send(tags);
};

export default seedTags;
