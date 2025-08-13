import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import { FcBinoculars } from 'react-icons/fc';
import { FaEdit } from 'react-icons/fa';

import { IPlace } from '../../types';

import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { DestinationsDto, useDestinationsForm } from '../../hooks/formHooks/trailHooks';
import { useUpdateHikingTrailField } from '../../hooks/dataHooks/trailHooks';

import { FormInputSearch } from '../common';

interface Props {
  initialDestinations: IPlace[];
  trailId: number;
  candEdit: boolean;
  availableDestinations: IPlace[];
  isLoadingDestinations: boolean;
}

const TrailDetailsDestinationsField = ({
  initialDestinations,
  trailId,
  candEdit,
  availableDestinations,
  isLoadingDestinations,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [destinations, setDestinations] = useState<IPlace[]>(initialDestinations);
  const formRef = useRef<HTMLDivElement>(null);
  const { control, handleSubmit } = useDestinationsForm();
  const { mutate: updateDestinations, isPending } = useUpdateHikingTrailField(
    'destinations',
    trailId,
    setDestinations
  );

  const onSubmit = (data: DestinationsDto) => {
    const currentDestinationIds = availableDestinations.map((d) => d.id).sort();
    const newDestinationIds = data.destinations.map((d) => d.id).sort();

    if (JSON.stringify(newDestinationIds) === JSON.stringify(currentDestinationIds)) {
      setIsVisible(false);
      return;
    }

    updateDestinations(data);
    setIsVisible(false);
  };

  useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));
  return (
    <div className="trail__links__wrapper">
      <h4>
        <FcBinoculars />
        &nbsp; Curious places:
        {candEdit && (
          <FaEdit
            className="trail-edit-icon"
            style={{ display: isVisible ? 'none' : 'inline' }}
            onClick={() => {
              if (!isLoadingDestinations) setIsVisible(!isVisible);
            }}
          />
        )}
      </h4>

      <div className="trail__links__wrapper__field">
        {destinations.length > 0 ? (
          destinations.map((d) => (
            <Link
              key={d.id}
              to={{
                pathname: `/destinations/${d.id}`,
              }}
              style={{
                opacity: isVisible ? '0' : '1',
                cursor: isVisible ? 'none' : 'pointer',
              }}
            >
              / {d.destinationName} /
            </Link>
          ))
        ) : (
          <p>not available</p>
        )}

        <div
          ref={formRef}
          className="trail__links__wrapper__field__form"
          style={{ display: isVisible ? 'flex' : 'none' }}
        >
          {isLoadingDestinations ? (
            <p>Loading destinations...</p>
          ) : (
            <>
              <Controller
                name="destinations"
                control={control}
                render={({ field }) => (
                  <FormInputSearch
                    suggestions={availableDestinations}
                    value={field.value}
                    onChange={field.onChange}
                    suggestionName={'destinationName'}
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

export default TrailDetailsDestinationsField;
