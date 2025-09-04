import { useRef, useState } from "react";
import { FaEdit, FaUserNinja } from "react-icons/fa";

import { SubmitButton } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { useUsernameForm, UsernameDto } from "@hooks/formHooks/userHooks";
import useCloseOnEscapeTabAndClickOutside from "@hooks/uiHooks/useCloseOnEscapeTabAndClickOutside";
import { useSessionStore } from "@store/sessionStore";

interface Props {
  initialUsername: string;
}

const MyProfileUsernameField = ({ initialUsername }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { handleSubmit, register, errors } = useUsernameForm();
  const { mutate: updateUsername, isPending } = useUpdateUserField("username");

  const username =
    useSessionStore((state) => state.user?.username) ?? initialUsername;

  const onSubmit = (data: UsernameDto) => {
    if (data.username === username) {
      setIsVisible(false);
      return;
    }

    updateUsername(data);
    setIsVisible(false);
  };

  const formRef = useRef<HTMLFormElement>(null);

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

  return (
    <div>
      <p style={{ opacity: isVisible ? "0" : "1" }}>
        <FaUserNinja />
        &nbsp;<strong>{username}</strong>
        <FaEdit
          className="edit"
          onClick={() => setIsVisible(!isVisible)}
          style={{ cursor: isVisible ? "none" : "pointer" }}
        />
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        ref={formRef}
        style={{ display: isVisible ? "flex" : "none" }}
      >
        <input
          id="username"
          type="text"
          {...register("username")}
          defaultValue={username}
          className="username-field"
        />

        <SubmitButton isSubmitting={isPending} buttonName="Change" />
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          Cancel
        </button>

        {errors.username && (
          <div className="error-message">{errors.username.message}</div>
        )}
      </form>
    </div>
  );
};

export default MyProfileUsernameField;
