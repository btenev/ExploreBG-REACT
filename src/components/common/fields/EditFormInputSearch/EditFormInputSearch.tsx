import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { ISelectableItem } from "@api/public";
import { FormInputSearchAdvanced } from "@components/common";

interface Props<T extends { id: number }> {
  initialItems: T[];
  canEdit: boolean;
  entityId: number;
  availableItems: T[];
  isLoadingItems: boolean;

  useFormHook: (defaultValues: { items: T[] }) => UseFormReturn<{ items: T[] }>;

  mutation: {
    mutate: (
      data: { items: { id: number }[] },
      options?: { onSuccess?: (res: { items: ISelectableItem[] }) => void },
    ) => void;
    isPending: boolean;
  };
  placeholder: string;
  title: string;
  icon: React.ReactNode;
  getName: (item: T) => string;
  linkPath: (item: T) => string;
  maxItems?: number;
}

const EditFormInputSearch = <T extends { id: number }>({
  initialItems,
  canEdit,
  mutation,
  availableItems,
  isLoadingItems,
  entityId,
  useFormHook,
  getName,
  linkPath,
  placeholder,
  title,
  icon,
  maxItems,
}: Props<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, reset, formState, watch } = useFormHook({
    items: initialItems,
  });
  const { isDirty } = formState;

  const currentItems = watch("items");

  // Whenever the parent provides new initialItems, reset the form
  useEffect(() => {
    console.log("RESET TRIGGERED", initialItems);
    reset({ items: initialItems });
  }, [initialItems, reset]);

  const discardChanges = () => {
    if (isDirty) {
      toast.info("Changes discarded");
      reset(); // revert to last saved value
    }
    setIsVisible(false);
  };

  const onSubmit = (data: { items: T[] }) => {
    if (!isDirty) {
      setIsVisible(false);
      return;
    }

    mutation.mutate(
      { items: data.items.map((i) => ({ id: i.id })) },
      {
        onSuccess: (res) => {
          // const updatedItems = fromSelectable(res.items);
          // console.log("Updated items from response", updatedItems);
          console.log("res.items", res.items);
          const returnedIds = new Set(res.items.map((i) => i.id));
          const updatedItems = availableItems.filter((item) =>
            returnedIds.has(item.id),
          );
          console.log("res.items", res.items);
          console.log("availableItems", availableItems);
          console.log("updatedItems", updatedItems);
          // reset({ items: updatedItems }); // ← this is missing
        },
      },
    );

    setIsVisible(false);
  };

  return (
    <div className="trail__links__wrapper">
      <h4>
        {icon}
        &nbsp; {title}:
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{ display: isVisible ? "none" : "inline" }}
            onClick={() => {
              if (!isLoadingItems) {
                setIsVisible(!isVisible);
              }
            }}
          />
        )}
      </h4>

      <div className="trail__links__wrapper__field">
        {/* DISPLAY CURRENT VALUES */}
        {currentItems.length > 0 ? (
          currentItems.map(
            (item) => (
              console.log("RENDER item", JSON.stringify(item)),
              console.log("RENDER getName", getName(item)),
              console.log("RENDER linkPath", linkPath(item)),
              (
                <Link
                  key={item.id}
                  to={linkPath(item)}
                  style={{
                    opacity: isVisible ? "0" : "1",
                    cursor: isVisible ? "none" : "pointer",
                  }}
                >
                  / {getName(item)} /
                </Link>
              )
            ),
          )
        ) : (
          <p>not available</p>
        )}

        <div
          ref={formRef}
          className="trail__links__wrapper__field__form"
          style={{ display: isVisible ? "flex" : "none" }}
        >
          {isLoadingItems ? (
            <p>Loading...</p>
          ) : (
            <>
              <Controller
                name="items"
                control={control}
                render={({ field }) => {
                  return (
                    <FormInputSearchAdvanced
                      suggestions={availableItems.map((i) => ({
                        id: i.id,
                        name: getName(i),
                      }))}
                      value={field.value.map((i) => ({
                        id: i.id,
                        name: getName(i),
                      }))}
                      onChange={(newValues) => {
                        const updated = newValues
                          .map(
                            (sv) =>
                              field.value.find((i) => i.id === sv.id) ??
                              availableItems.find((a) => a.id === sv.id),
                          )
                          .filter(Boolean) as T[];
                        field.onChange(updated);
                      }}
                      placeholder={placeholder}
                      maxItems={maxItems}
                    />
                  );
                }}
              />

              <div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={mutation.isPending}
                >
                  Change
                </button>
                <button type="button" onClick={discardChanges}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFormInputSearch;
