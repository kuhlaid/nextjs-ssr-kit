import { Document, model, Model, Schema } from "mongoose";

export interface ITag {
  tagName: string;
  category: string;
}
export type TTagDocument = Document & ITag;

export type TTagModel = Model<TTagDocument>;

const tagSchema = new Schema<TTagDocument>({
  tagName: { type: String, unique: true, lowercase: true },
  category: String
});

const TagModel = model<TTagDocument, TTagModel>("Tag", tagSchema);

export default TagModel;
