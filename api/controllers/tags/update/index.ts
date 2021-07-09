import type { Request, Response } from "express";
import Tag from "~models/tag";

const updateTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id: _id } = req.params;
    const { tagName } = req.body;
    if (!_id || !tagName) throw String("Missing tag update parameters.");

    const existingTag = await Tag.findOne({ _id });
    if (!existingTag) throw String("Unable to locate that tag to update.");

    /* istanbul ignore next */
    if (existingTag.tagName !== tagName) {
      const tagNameTaken = await Tag.findOne({ tagName });
      if (tagNameTaken) throw String("That tagname is already in use!");
    }

    await existingTag.updateOne(req.body);

    return res
      .status(201)
      .json({ message: `Successfully updated ${tagName}.` });
  } catch (err) {
    return res.status(400).json({ err: err.toString() });
  }
};

export default updateTag;
