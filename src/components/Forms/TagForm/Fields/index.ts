import { BaseFieldProps, TagData } from "~types";

const fields = (props: TagData): BaseFieldProps[] => [
  {
    name: "tagName",
    type: "text",
    label: "Tagname",
    value: props.tagName || "",
    placeholder: "Enter tagname...",
    errors: "",
    style: { width: "50%" },
    required: true
  },
  {
    name: "category",
    type: "text",
    label: "Category",
    value: props.category || "",
    placeholder: "Enter category...",
    errors: "",
    style: { width: "50%" },
    required: true
  }
];

export default fields;
