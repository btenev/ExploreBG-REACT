import { FaUserNinja } from "react-icons/fa";

import { ProfileEditableFieldForm } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { UsernameDto, useUsernameForm } from "@hooks/formHooks/userHooks";

interface Props {
  username: string;
}

const MyProfileUsernameField = ({ username }: Props) => {
  const mutation = useUpdateUserField("username");

  return (
    <ProfileEditableFieldForm<UsernameDto>
      label="Username"
      initialValue={{ username: username }}
      useFormHook={useUsernameForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <>
          <FaUserNinja /> {label}:&nbsp; <strong>{val.username}</strong>
        </>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          type="text"
          {...register("username")}
          className="username-field"
        />
      )}
    />
  );
};

export default MyProfileUsernameField;
