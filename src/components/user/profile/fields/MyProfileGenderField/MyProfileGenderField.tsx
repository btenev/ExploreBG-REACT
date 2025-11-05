import { JSX } from "react";
import { FaFemale, FaMale } from "react-icons/fa";

import { ProfileEditableFieldForm } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { useGenderEnums } from "@hooks/dataHooks/utilityHooks";
import { GenderDto, useGenderForm } from "@hooks/formHooks/userHooks";
import { GenderEnum } from "@types";

const genderIconMapper: Partial<Record<GenderEnum, JSX.Element>> = {
  Male: <FaMale />,
  Female: <FaFemale />,
  Other: <></>,
};

interface Props {
  gender: GenderEnum;
}

const MyProfileGenderField = ({ gender }: Props) => {
  const { data: enumOptions, isLoading } = useGenderEnums();

  const mutation = useUpdateUserField("gender");

  const genderArray = enumOptions?.gender ?? [];
  return (
    <ProfileEditableFieldForm<GenderDto>
      label="Gender"
      initialValue={{ gender: gender }}
      useFormHook={useGenderForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <>
          {genderIconMapper[val.gender]}
          {label}:&nbsp; <strong>{val.gender}</strong>
        </>
      )}
      renderInput={(register, id) => {
        if (isLoading) {
          return (
            <select id={id} disabled>
              <option>Loading gender options...</option>
            </select>
          );
        }

        if (genderArray.length === 0) {
          return (
            <select id={id} disabled>
              <option>No gender options available</option>
            </select>
          );
        }

        return (
          <select id={id} {...register("gender")}>
            {genderArray.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        );
      }}
    />
  );
};

export default MyProfileGenderField;
