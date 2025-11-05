import { LiaBirthdayCakeSolid } from "react-icons/lia";

import { ProfileEditableFieldForm } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { useUserBirthdateForm } from "@hooks/formHooks/userHooks";
import { UserBirthdateDto } from "@schemas/user";
import { formatDate } from "@utils/dateUtils";

interface Props {
  birthdate: string | null;
}

const MyProfileBirthdateField = ({ birthdate }: Props) => {
  const mutation = useUpdateUserField("birthdate");
  return (
    <ProfileEditableFieldForm<UserBirthdateDto>
      label="Birthdate"
      initialValue={{ birthdate: birthdate }}
      useFormHook={useUserBirthdateForm}
      mutation={mutation}
      renderValue={(val, label) => {
        console.log("Render birthdate:", val.birthdate);
        return (
          <>
            <LiaBirthdayCakeSolid /> {label}:&nbsp;&nbsp;
            <strong>
              {val.birthdate ? formatDate(val.birthdate) : "....."}
            </strong>
          </>
        );
      }}
      renderInput={(register, id) => (
        <input
          id={id}
          type="date"
          {...register("birthdate")}
          className="birthdate-field"
        />
      )}
    />
  );
};

export default MyProfileBirthdateField;
