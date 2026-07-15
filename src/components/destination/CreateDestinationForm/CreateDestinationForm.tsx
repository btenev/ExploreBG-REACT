import { Controller } from "react-hook-form";

import { DestinationEnumsResponse } from "@api/public";
import {
  CustomSelect,
  FormFieldInfo,
  RequireAuthModal,
  SubmitButton,
} from "@components/common";
import { useCreateDestination } from "@hooks/dataHooks/destinationHooks";
import { useCreateDestinationForm } from "@hooks/formHooks/destinationHooks/useCreateDestinationForm";
import { useSession } from "@hooks/sessionHooks";
import { CreateDestinationDto } from "@schemas/destination";
import { DestinationTypeEnum } from "types/shared/enums/DestinationTypeEnum";

const DESTINATION_INFO =
  "Provide information about the destination, such as amenities, services, and any other relevant details that would help potential visitors make an informed decision.";

interface Props {
  enumData: DestinationEnumsResponse;
}

const CreateDestinationForm = ({ enumData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useCreateDestinationForm();

  const { userId } = useSession();

  const { mutate: createDestination, isPending: creating } =
    useCreateDestination();

  const onSubmit = (destinationData: CreateDestinationDto) =>
    createDestination(destinationData);

  return (
    <>
      {!userId && (
        <RequireAuthModal message="Only logged-in users can access this page." />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="form-container__form"
      >
        <div className="form-container__form__pair">
          <div>
            <label htmlFor="destinationName">Destination name</label>
            <input
              id="destinationName"
              type="text"
              {...register("destinationName")}
              placeholder="Gods eyes"
            />
            {errors.destinationName && (
              <div className="error-message">
                {errors.destinationName.message}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="type">Type</label>
            <Controller
              name="type"
              control={control}
              defaultValue={DestinationTypeEnum.natural_attraction}
              render={({ field }) => (
                <CustomSelect
                  options={enumData.type}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        <div className="form-container__form__pair">
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              {...register("latitude")}
              type="number"
              step="1"
              placeholder="Not set"
            />
            {errors.latitude && (
              <div className="error-message">{errors.latitude.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              {...register("longitude")}
              type="number"
              step="1"
              placeholder="Not set"
            />
            {errors.longitude && (
              <div className="error-message">{errors.longitude.message}</div>
            )}
          </div>
        </div>

        <div className="form-container__form__single">
          <label htmlFor="nextTo">Next to</label>
          <input
            id="nextTo"
            type="text"
            {...register("nextTo")}
            placeholder={"city ​​/ town / village"}
          />
          {errors.nextTo && (
            <div className="error-message">{errors.nextTo.message}</div>
          )}
        </div>

        <div className="form-container__form__single">
          <label htmlFor="destinationInfo">
            Destination info &nbsp;
            <FormFieldInfo infoText={DESTINATION_INFO} />
          </label>
          <textarea
            id="destinationInfo"
            {...register("destinationInfo")}
            // cols={30} rows={10}
            placeholder="........."
          />
          {errors.destinationInfo && (
            <div className="error-message">
              {errors.destinationInfo.message}
            </div>
          )}
        </div>

        <SubmitButton isSubmitting={creating} buttonName="Create destination" />
      </form>
    </>
  );
};

export default CreateDestinationForm;
