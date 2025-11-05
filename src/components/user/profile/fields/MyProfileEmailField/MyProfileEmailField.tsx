import { HiOutlineMail } from "react-icons/hi";

import { ProfileEditableFieldForm } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { EmailDto, useEmailForm } from "@hooks/formHooks/userHooks";

interface Props {
  email: string;
}

const MyProfileEmailField = ({ email }: Props) => {
  const mutation = useUpdateUserField("email");

  return (
    <ProfileEditableFieldForm<EmailDto>
      label="Email"
      initialValue={{ email: email }}
      useFormHook={useEmailForm}
      mutation={mutation}
      renderValue={(val, label) => (
        <>
          <HiOutlineMail /> {label}:&nbsp; <strong>{val.email}</strong>
        </>
      )}
      renderInput={(register, id) => (
        <input
          id={id}
          type="email"
          {...register("email")}
          className="email-field"
        />
      )}
    />
  );
};

export default MyProfileEmailField;
