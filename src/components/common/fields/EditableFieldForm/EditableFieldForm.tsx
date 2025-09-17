import { ReactElement, useRef, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { SubmitButton } from "@components/common";
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
  inputType?: React.HTMLInputTypeAttribute;
  renderValue?: (
    value: FormValues[keyof FormValues],
    label: string
  ) => ReactElement;
  renderInput?: (
    fieldKey: Path<FormValues>,
    register: UseFormReturn<FormValues>["register"]
  ) => ReactElement;
}

const EditableFieldForm = <FormValues extends Record<string, any>>({
  label,
  initialValue,
  canEdit,
  formClassName,
  useFormHook,
  mutation,
  inputType,
  renderValue,
  renderInput,
}: Props<FormValues>) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize form with defaultValues
  const { register, handleSubmit, formState, reset, getValues } =
    useFormHook(initialValue);
  const { errors, isDirty } = formState;

  const fieldKey = Object.keys(initialValue)[0] as Path<FormValues>;
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
    <div className="editable-field">
      {/* Display Mode */}
      <div
        className="editable-field__display"
        style={{ opacity: isEditing ? "0" : "1" }}
      >
        {renderValue ? (
          renderValue(getValues()[fieldKey], label)
        ) : (
          <details open>
            <summary>
              {label}: <strong>{getValues()[fieldKey]}</strong>
            </summary>
            {/* <GrMapLocation />&nbsp; 018293794663487685 */}
          </details>
        )}
        {canEdit && (
          <FaEdit
            className="edit-icon"
            onClick={() => setIsEditing((prev) => !prev)}
          />
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
            {renderInput ? (
              renderInput(fieldKey, register)
            ) : (
              <input
                id={`${fieldKey}-input`}
                {...register(fieldKey as Path<FormValues>)}
                type={inputType}
              />
            )}

            <SubmitButton
              isSubmitting={mutation.isPending}
              buttonName="Change"
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>

          {errors[fieldKey]?.message && (
            <div
              style={{ display: isEditing ? "block" : "none" }}
              className="error-message"
            >
              {errors[fieldKey].message?.toString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableFieldForm;
