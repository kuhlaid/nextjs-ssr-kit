import * as React from "react";
import styled from "@emotion/styled";
import Button from "~components/Layout/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import generateFields from "./Fields";
import type { BaseFieldProps, FormEvent, TagData } from "~types";

const Form = styled.form`
  margin: 0 auto;
  text-align: left;
  padding: 10px;
`;

export interface TagFormFields extends BaseFieldProps {
  disabled?: boolean;
  readOnly?: boolean;
}

export interface TagFormProps extends TagData {
  _id: string;
  resetMessage: () => void;
  serverError?: string;
  serverMessage?: string;
  resetForm: (event?: any) => void;
  cancelForm?: (event: any) => void;
  submitAction: (payload: TagData) => void;
}

export interface TagFormState {
  fields: TagFormFields[];
  errors: number;
  isSubmitting: boolean;
}

const TagForm = (props: TagFormProps): JSX.Element => {
  const [state, setState] = React.useState<TagFormState>({
    fields: generateFields(props),
    errors: 0,
    isSubmitting: false
  });
  const { fields, errors, isSubmitting } = state;
  const {
    cancelForm,
    _id: id,
    resetForm,
    resetMessage,
    serverError,
    serverMessage,
    submitAction
  } = props;

  const handleChange = React.useCallback(
    ({
      target: { name, value }
    }: {
      target: { name: string; value: string };
    }) => {
      setState(prevState => ({
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, value)
      }));
    },
    [fieldUpdater]
  );

  const handleSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { validatedFields, errors } = fieldValidator(fields);

      setState(prevState => ({
        fields: !errors ? prevState.fields : validatedFields,
        errors,
        isSubmitting: !errors
      }));
    },
    [fields, fieldValidator]
  );

  React.useEffect(() => {
    if (serverError && isSubmitting)
      setState(prevState => ({ ...prevState, isSubmitting: false }));

    if (serverMessage && isSubmitting) resetForm();
  }, [isSubmitting, serverError, serverMessage, resetForm, resetMessage]);

  React.useEffect(() => {
    if (!errors && isSubmitting)
      submitAction({ ...parseFields(fields), _id: id });

    return () => {
      resetMessage();
    };
  }, [errors, fields, isSubmitting, id, parseFields, resetMessage]);

  return (
    <Form data-testid="tag-form" onSubmit={handleSubmit}>
      <Flex direction="row" flexwrap justify="space-between">
        <FieldGenerator fields={fields} onChange={handleChange} />
      </Flex>
      <Flex style={{ padding: "0 15px", marginBottom: 10 }}>
        <FlexStart>
          <Button dataTestId="cancel" danger type="button" onClick={cancelForm}>
            Cancel
          </Button>
        </FlexStart>
        <FlexEnd>
          <Button
            dataTestId="submit"
            primary
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </FlexEnd>
      </Flex>
    </Form>
  );
};

export default TagForm;
