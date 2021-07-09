import type { Request, Response } from "express";
import Tag from "~models/tag";

const deleteTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const existingTag = await Tag.findOne({ _id });
    if (!existingTag) throw String("Unable to locate that tag for deletion.");

    await existingTag.deleteOne();

    return res
      .status(200)
      .json({ message: `Successfully deleted ${existingTag.tagName}.` });
  } catch (err) {
    return res.status(400).json({ err: err.toString() });
  }
};

export default deleteTag;
