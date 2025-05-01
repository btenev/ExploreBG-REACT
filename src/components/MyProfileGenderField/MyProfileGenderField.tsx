import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaFemale, FaMale } from 'react-icons/fa';

import { SubmitButton } from '../common';
import { useGenderEnums } from '../../hooks/dataHooks/utilityHooks';
import { useUpdateUserField } from '../../hooks/dataHooks/userHooks';
import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { GenderEnum } from '../../types';
import { genderEnumSchema } from '../../schemas';

interface Props {
  gender: GenderEnum;
}

const MyProfileGenderField = ({ gender }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<GenderEnum[]>([]);
  const [genderValue, setGenderValue] = useState<GenderEnum>(gender);
  const [tempGenderValue, setTempGenderValue] = useState<GenderEnum>(gender);

  const { data: server, isLoading, isFetching, isError, error } = useGenderEnums();
  const { mutate: updateGender, isPending: isUpdatePending } = useUpdateUserField(
    'gender',
    setGenderValue
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempGenderValue === genderValue) {
      setIsVisible(false);
      return;
    }

    updateGender({ gender: tempGenderValue });
    setIsVisible(false);
  };

  useEffect(() => {
    if (server) {
      setOptions(server.gender);
    }
  }, [server]);

  const formRef = useRef<HTMLFormElement>(null);
  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

  if (isLoading) {
    return <p>Loading gender options...</p>; // Shows only while initially loading
  }

  if (isFetching) {
    return <p>Refreshing gender options...</p>; // Shows when refetching or fetching in the background
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to load gender options. Please try again later.';
    toast.error(errorMessage);
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <p style={{ opacity: isVisible ? '0' : '1' }}>
        {(genderValue == 'Male' && <FaMale />) || (genderValue == 'Female' && <FaFemale />)}
        Gender:&nbsp; <strong>{genderValue ?? '.....'}</strong>
        <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
      </p>

      <form
        noValidate
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ display: isVisible ? 'flex' : 'none' }}
      >
        <select
          id="gender"
          value={tempGenderValue ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            const result = genderEnumSchema.safeParse(value);
            if (result.success) {
              setTempGenderValue(result.data);
            } else {
              const message =
                import.meta.env.MODE !== 'production'
                  ? `Invalid gender selection - ${value}`
                  : 'Invalid selection. Please choose a valid gender.';
              toast.error(message);
            }
          }}
          className="gender-field"
        >
          {options.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <SubmitButton isSubmitting={isUpdatePending} buttonName="Change" />
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MyProfileGenderField;
