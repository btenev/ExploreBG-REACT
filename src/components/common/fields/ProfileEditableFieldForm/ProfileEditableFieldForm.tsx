import { ReactElement, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { SubmitButton } from "@components/common";
import { useCloseOnEscapeTabAndClickOutside } from "@hooks/uiHooks";

interface Props<FormValues extends Record<string, any>> {
  label: string;
  initialValue: FormValues;
  mutation: {
    mutate: (
      data: FormValues,
      options?: { onSuccess?: (response: any) => void }
    ) => void;
    isPending: boolean;
  };
  useFormHook: (defaultValues: FormValues) => UseFormReturn<FormValues>;

  renderValue: (value: FormValues, label: string) => ReactElement;
  renderInput: (
    register: UseFormReturn<FormValues>["register"],
    inputId: string
  ) => ReactElement;
}

export function ProfileEditableFieldForm<
  FormValues extends Record<string, any>,
>({
  label,
  initialValue,
  mutation,
  useFormHook,

  renderValue,
  renderInput,
}: Props<FormValues>) {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = `profile-field-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const form = useFormHook(initialValue);

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { isDirty } = formState;

  const handleFormSubmit = (data: FormValues) => {
    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    mutation.mutate(data, {
      onSuccess: (response) => {
        reset({ ...getValues(), ...response });
        requestAnimationFrame(() => setIsEditing(false));
      },
    });
  };

  const discardChanges = () => {
    if (isDirty) {
      toast.info("Changes discarded");
      reset(); // revert to last saved value
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && formRef.current) {
      const input = formRef.current.querySelector<HTMLInputElement>("input");
      input?.focus();
    }
  }, [isEditing]);

  useCloseOnEscapeTabAndClickOutside(formRef, () => {
    if (isEditing) discardChanges();
  });

  return (
    <div>
      {/* Display Mode */}
      <p style={{ opacity: isEditing ? 0 : 1 }}>
        {renderValue(getValues(), label)}

        <FaEdit
          className="edit"
          onClick={() => setIsEditing(true)}
          style={{ cursor: isEditing ? "none" : "pointer" }}
          aria-label={`Edit ${label}`}
        />
      </p>

      {/* Edit Mode */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        ref={formRef}
        style={{ display: isEditing ? "flex" : "none" }}
      >
        {renderInput(register, inputId)}

        <SubmitButton isSubmitting={mutation.isPending} buttonName="Change" />

        <button
          type="button"
          onClick={discardChanges}
          aria-label={`Cancel editing ${label}`}
        >
          Cancel
        </button>

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
      </form>
    </div>
  );
}
