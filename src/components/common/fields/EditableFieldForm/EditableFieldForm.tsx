import { ReactElement, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { HelperTooltip, SubmitButton } from "@components/common";
import { useCloseOnEscapeTabAndClickOutside } from "@hooks/uiHooks";

import "./EditableFieldForm.scss";

interface Mutation<FormValues> {
  mutate: (
    data: FormValues,
    options?: { onSuccess?: (response: any) => void }
  ) => void;
  isPending: boolean;
}

interface Props<FormValues extends Record<string, any>> {
  label: string;
  initialValue: FormValues;
  canEdit: boolean;
  formClassName?: string;
  useFormHook: (defaultValues: FormValues) => UseFormReturn<FormValues>;
  mutation: Mutation<FormValues>;
  showLabel?: boolean;
  renderValue: (value: FormValues, label: string) => ReactElement;
  renderInput: (
    register: UseFormReturn<FormValues>["register"],
    inputId: string
  ) => ReactElement;
  helperMessage?: string;
}

const EditableFieldForm = <FormValues extends Record<string, any>>({
  label,
  initialValue,
  canEdit,
  formClassName,
  useFormHook,
  mutation,
  renderValue,
  renderInput,
  showLabel = false,
  helperMessage,
}: Props<FormValues>) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = `editable-field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  // Initialize form with defaultValues
  const { register, handleSubmit, formState, reset, getValues } =
    useFormHook(initialValue);
  const { isDirty } = formState;

  const handleSubmitMutation = (data: FormValues) => {
    console.log("isDirty:", isDirty, "values:", getValues());
    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    mutation.mutate(data, {
      onSuccess: (response) => {
        // Reset only with the relevant field
        reset(response);

        setIsEditing(false);
      },
    });
  };

  useEffect(() => {
    if (isEditing && formRef.current) {
      const input = formRef.current.querySelector<HTMLInputElement>("input");
      input?.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    if (isDirty) {
      toast.info("Changes discarded");
    }
    reset(); // revert to last saved value
    setIsEditing(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsEditing(false));

  return (
    <div className="editable-field">
      {/* Display Mode */}
      <div
        className="editable-field__display"
        style={{ opacity: isEditing ? "0" : "1" }}
      >
        {renderValue(getValues(), label)}

        {canEdit && (
          <>
            <FaEdit
              className="edit-icon"
              onClick={() => setIsEditing((prev) => !prev)}
              aria-label={`Edit ${label}`}
            />
            {!isEditing && helperMessage && (
              <HelperTooltip message={helperMessage} />
            )}
          </>
        )}
      </div>

      {/* Edit Mode */}
      {isEditing && canEdit && (
        <div className="editable-field__form">
          <form
            onSubmit={handleSubmit(handleSubmitMutation)}
            ref={formRef}
            noValidate
            className={formClassName}
            style={{ display: isEditing ? "flex" : "none" }}
          >
            {/* Label for accessibility / optional visual */}
            <label htmlFor={inputId} className={showLabel ? "" : "sr-only"}>
              {label}
            </label>

            {renderInput(register, inputId)}

            <SubmitButton
              isSubmitting={mutation.isPending}
              buttonName="Change"
            />
            <button
              type="button"
              onClick={handleCancel}
              aria-label={`Cancel editing ${label}`}
            >
              Cancel
            </button>
          </form>

          {Object.entries(formState.errors).map(([key, error]) => (
            <div
              key={key}
              className="error-message"
              role="alert"
              style={{ display: isEditing ? "block" : "none" }}
            >
              {error?.message?.toString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditableFieldForm;
