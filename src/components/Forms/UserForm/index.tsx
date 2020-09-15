import { useCallback, useEffect, useState } from "react";
import Button from "~components/Layout/Button";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import generateFields from "./Fields";
import { FormEvent, UserFormProps, UserFormState } from "~types";

const UserForm = (props: UserFormProps): JSX.Element => {
  const [state, setState] = useState<UserFormState>({
    fields: generateFields(props),
    errors: 0,
    isSubmitting: false,
  });
  const { fields, errors, isSubmitting } = state;
  const {
    cancelForm,
    _id: id,
    resetForm,
    resetMessage,
    serverError,
    serverMessage,
    submitAction,
  } = props;

  const handleChange = useCallback(
    ({
      target: { name, value },
    }: {
      target: { name: string; value: string };
    }) => {
      setState(prevState => ({
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, value),
      }));
    },
    [fieldUpdater],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { validatedFields, errors } = fieldValidator(fields);

      setState(prevState => ({
        fields: !errors ? prevState.fields : validatedFields,
        errors,
        isSubmitting: !errors,
      }));
    },
    [fields, fieldValidator],
  );

  useEffect(() => {
    if (serverError && isSubmitting)
      setState(prevState => ({ ...prevState, isSubmitting: false }));

    if (serverMessage && isSubmitting) resetForm();
  }, [isSubmitting, serverError, serverMessage, resetForm, resetMessage]);

  useEffect(() => {
    if (!errors && isSubmitting)
      submitAction({
        props: parseFields(fields),
        id,
      });

    return () => {
      resetMessage();
    };
  }, [errors, fields, isSubmitting, id, parseFields, resetMessage]);

  return (
    <form
      data-testid="user-form"
      css="margin: 0 auto;text-align: left; padding: 5px;"
      onSubmit={handleSubmit}
    >
      <Flex direction="row" flexwrap justify="space-between">
        <FieldGenerator fields={fields} onChange={handleChange} />
      </Flex>
      <FlexEnd>
        <Button
          dataTestId="cancel"
          danger
          type="button"
          onClick={cancelForm}
          style={{ marginRight: 10 }}
        >
          Cancel
        </Button>
        <Button
          dataTestId="submit"
          primary
          disabled={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </FlexEnd>
    </form>
  );
};

export default UserForm;
