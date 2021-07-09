import type { Request, Response } from "express";
// import isEmpty from "lodash.isempty";
import Tag from "~models/tag";

const createTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { tagName, category } = req.body;

    if (!tagName || !category)
      throw String("Missing tag card creation parameters.");

    const tagNameTaken = await Tag.findOne({ tagName });
    if (tagNameTaken) throw String("That tagname is already in use!");

    await Tag.create({
      tagName,
      category
    });

    return res
      .status(201)
      .json({ message: `Successfully created ${tagName}.` });
  } catch (err) {
    return res.status(400).json({ err: err.toString() });
  }
};

export default createTag;
