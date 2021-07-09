import type { Request, Response } from "express";
import Tag from "~models/tag";

const viewTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;

    const tag = await Tag.findOne({ _id });
    if (!tag) throw String("Unable to locate that tag.");

    return res.status(200).json({ tag });
  } catch (err) {
    return res.status(400).json({ err: err.toString() });
  }
};

export default viewTag;
