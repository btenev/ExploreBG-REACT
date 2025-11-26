import { BsCalendar2Date } from "react-icons/bs";

import { EditableFieldForm } from "@components/common";
import { useUpdateHikeField } from "@hooks/dataHooks/hikeHooks";
import { HikeDateDto, useHikeDateForm } from "@hooks/formHooks/hikeHooks";
import {
  formatFullDate,
  isValidIsoDate,
  toDatetimeLocal,
} from "@utils/dateUtils";

interface Props {
  hikeId: number;
  hikeDate: string;
  canEdit: boolean;
}

const HikeDetailsDate = ({ hikeId, hikeDate, canEdit }: Props) => {
  const mutation = useUpdateHikeField("hikeDate", hikeId);

  const initialHikeDate = isValidIsoDate(hikeDate)
    ? toDatetimeLocal(hikeDate)
    : "";

  return (
    <EditableFieldForm<HikeDateDto>
      label="Hike date"
      initialValue={{
        hikeDate: initialHikeDate,
      }}
      canEdit={canEdit}
      useFormHook={useHikeDateForm}
      mutation={mutation}
      helperMessage="Choose a future date and time for the hike."
      renderValue={(val, label) => {
        const isValid = isValidIsoDate(val.hikeDate);
        const displayText = isValid
          ? formatFullDate(val.hikeDate)
          : "Date not set";
        return (
          <>
            <BsCalendar2Date />
            &nbsp; {label}:&nbsp;&nbsp;
            <time dateTime={isValid ? val.hikeDate : undefined}>
              {displayText}
            </time>
          </>
        );
      }}
      renderInput={(register, id) => (
        <input
          id={id}
          type="datetime-local"
          {...register("hikeDate")}
          className="hikeDate-field"
        />
      )}
    />
  );
};

export default HikeDetailsDate;
