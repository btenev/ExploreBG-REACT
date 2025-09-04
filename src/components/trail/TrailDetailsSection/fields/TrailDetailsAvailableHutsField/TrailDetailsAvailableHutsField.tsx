import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { GiWoodCabin } from "react-icons/gi";
import { Link } from "react-router-dom";

import { FormInputSearch } from "@components/common";
import {
  AvailableHutsDto,
  useAvailableAccommodationsForm,
} from "@hooks/formHooks/trailHooks";
import { useLegacyUpdateHikingTrailField } from "@hooks/legacy";
import { useCloseOnEscapeTabAndClickOutside } from "@hooks/uiHooks";
import { IHut } from "@types";

interface Props {
  initialAvailableHuts: IHut[];
  trailId: number;
  canEdit: boolean;
  availableAccommodations: IHut[];
  isLoadingAccommodations: boolean;
}

const TrailDetailsAvailableHutsField = ({
  initialAvailableHuts,
  trailId,
  canEdit,
  availableAccommodations,
  isLoadingAccommodations,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [availableHuts, setAvailableHuts] =
    useState<IHut[]>(initialAvailableHuts);

  const formRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit } = useAvailableAccommodationsForm();
  const { mutate: updateAvailableHuts, isPending } =
    useLegacyUpdateHikingTrailField("availableHuts", trailId, setAvailableHuts);

  const onSubmit = (data: AvailableHutsDto) => {
    const currentHutIds = availableHuts.map((hut) => hut.id).sort();
    const newHutIds = data.availableHuts.map((hut) => hut.id).sort();

    if (JSON.stringify(newHutIds) === JSON.stringify(currentHutIds)) {
      setIsVisible(false);
      return;
    }

    updateAvailableHuts(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__links__wrapper">
      <h4>
        <GiWoodCabin />
        &nbsp; Lodges in the area:
        {canEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{
              opacity: isVisible ? "0" : "1",
              cursor: isVisible ? "none" : "pointer",
            }}
            onClick={() => {
              if (!isLoadingAccommodations) setIsVisible(!isVisible);
            }}
          />
        )}
      </h4>

      <div className="trail__links__wrapper__field">
        {availableHuts.length > 0 ? (
          availableHuts.map((h) => (
            <Link
              key={h.id}
              to={{
                pathname: `/accommodations/${h.id}`,
              }}
              style={{
                opacity: isVisible ? "0" : "1",
                cursor: isVisible ? "none" : "pointer",
              }}
            >
              / {h.accommodationName} /
            </Link>
          ))
        ) : (
          <p>not available</p>
        )}

        <div
          ref={formRef}
          className="trail__links__wrapper__field__form"
          style={{ display: isVisible ? "flex" : "none" }}
        >
          {isLoadingAccommodations ? (
            <p>Loading available huts...</p>
          ) : (
            <>
              <Controller
                name="availableHuts"
                control={control}
                render={({ field }) => (
                  <FormInputSearch
                    suggestions={availableAccommodations}
                    value={field.value}
                    onChange={field.onChange}
                    suggestionName={"accommodationName"}
                  />
                )}
              />

              <div>
                <button onClick={handleSubmit(onSubmit)} disabled={isPending}>
                  Change
                </button>
                <button type="button" onClick={() => setIsVisible(!isVisible)}>
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

export default TrailDetailsAvailableHutsField;
