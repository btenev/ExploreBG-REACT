import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { SubmitButton, CommonModal, ExpandableText } from "@components/common";
import { useCloseOnEscapeTabAndClickOutside } from "@hooks/uiHooks";

import "./EditableTextareaFieldForm.scss";

interface Props<FormValues extends Record<string, any>> {
  initialValue: FormValues;
  canEdit: boolean;
  visibleTextLenght: number;
  useFormHook: (defaultValues: FormValues) => {
    register: any;
    handleSubmit: (fn: (data: FormValues) => void) => (e?: any) => void;
    errors: any;
    reset: (values?: FormValues) => void;
    getValues: () => FormValues;
    isSubmitting: boolean;
    isDirty: boolean;
  };
  mutation: {
    mutate: (
      data: FormValues,
      options?: { onSuccess?: (response: any) => void }
    ) => void;
    isPending: boolean;
  };
}

const EditableTextareaFieldForm = <FormValues extends Record<string, any>>({
  initialValue,
  canEdit,
  visibleTextLenght,
  useFormHook,
  mutation,
}: Props<FormValues>) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize form with defaultValues
  const { register, handleSubmit, errors, reset, getValues, isDirty } =
    useFormHook(initialValue);

  const fieldKey = Object.keys(initialValue)[0];
  console.log("Some", fieldKey);

  const handleSubmitMutation = (data: FormValues) => {
    console.log("isDirty:", isDirty, "values:", getValues());
    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    mutation.mutate(data, {
      onSuccess: (response) => {
        // Reset only with the relevant field
        reset({ [fieldKey]: response?.[fieldKey] } as FormValues);

        setIsEditing(false);
      },
    });
  };

  const handleCancel = () => {
    if (isDirty) {
      toast.info("Changes discarded");
    }
    reset(); // revert to last saved value
    setIsEditing(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsEditing(false));
  return (
    <div
      className="editable-textarea-field"
      style={{
        cursor:
          getValues()[fieldKey].length > visibleTextLenght
            ? "pointer"
            : "unset",
      }}
    >
      <ExpandableText text={getValues()[fieldKey]} length={visibleTextLenght} />
      {canEdit && (
        <FaEdit
          className="edit-icon"
          aria-label="Edit trail info"
          onClick={() => setIsEditing((prev) => !prev)}
        />
      )}

      {isEditing && (
        <CommonModal>
          <form
            onSubmit={handleSubmit(handleSubmitMutation)}
            noValidate
            className="textarea-form"
          >
            <textarea
              id={fieldKey}
              {...register(fieldKey)}
              aria-invalid={!!errors[fieldKey]}
              aria-describedby={`${fieldKey}-error`}
              cols={30}
              rows={10}
            />

            <div>
              <SubmitButton
                isSubmitting={mutation.isPending}
                buttonName="Change"
              />
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>

          {errors[fieldKey] && (
            <div className="error-message">{errors[fieldKey].message}</div>
          )}
        </CommonModal>
      )}
    </div>
  );
};

export default EditableTextareaFieldForm;
