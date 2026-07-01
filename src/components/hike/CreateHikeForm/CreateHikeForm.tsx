import { Controller } from "react-hook-form";

import {
  FormFieldInfo,
  FormInputSearch,
  RequireAuthModal,
  SubmitButton,
} from "@components/common";
import { useCreateHike } from "@hooks/dataHooks/hikeHooks/useCreateHike";
import { useCreateHikeForm } from "@hooks/formHooks/hikeHooks";
import { useSession } from "@hooks/sessionHooks";
import { CreateHikeDto } from "@schemas/hike";
import { ITrailIdentifier } from "@types";

const HIKE_INFO =
  "Describe the route, terrain, difficulty, duration, elevation gain, required equipment, and any important details participants should know before joining. This is especially important when the hike is not associated with an existing trail.";

interface Props {
  availableTrails: ITrailIdentifier[];
  maxItems: number;
}

const CreateHikeForm = ({ availableTrails, maxItems }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useCreateHikeForm();
  const { userId } = useSession();

  const { mutate: createHike, isPending: creating } = useCreateHike();

  const onSubmit = (hikeData: CreateHikeDto) => createHike(hikeData);

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
            <label htmlFor="startPoint">Start point</label>
            <input
              id="startPoint"
              type="text"
              {...register("startPoint")}
              placeholder="Karlovo"
            />
            {errors.startPoint && (
              <div className="error-message">{errors.startPoint.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="endPoint">End point</label>
            <input
              id="endPoint"
              type="text"
              {...register("endPoint")}
              placeholder="Botev peak"
            />
            {errors.endPoint && (
              <div className="error-message">{errors.endPoint.message}</div>
            )}
          </div>
        </div>

        <div className="form-container__form__pair">
          <div>
            <label htmlFor="hikeDate">Hike date</label>
            <input
              id="hikeDate"
              type="datetime-local"
              {...register("hikeDate")}
            />
            {errors.hikeDate && (
              <div className="error-message">{errors.hikeDate.message}</div>
            )}
          </div>

          <div>
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
        </div>

        <div className="form-container__form__single">
          <div className="form-container__form__pair__search">
            <label htmlFor="availableTrails">Trail</label>
            <Controller
              name="trailId"
              control={control}
              render={({ field }) => (
                <FormInputSearch
                  suggestions={availableTrails}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  suggestionName={"trailName"}
                  maxItems={maxItems}
                />
              )}
            />
          </div>
        </div>

        <div className="form-container__form__single">
          <label htmlFor="hikeInfo">
            Hike info &nbsp;
            <FormFieldInfo infoText={HIKE_INFO} />
          </label>
          <textarea
            id="hikeInfo"
            {...register("hikeInfo")}
            // cols={30} rows={10}
            placeholder="........."
          />
          {errors.hikeInfo && (
            <div className="error-message">{errors.hikeInfo.message}</div>
          )}
        </div>

        <SubmitButton isSubmitting={creating} buttonName="Create hike" />
      </form>
    </>
  );
};

export default CreateHikeForm;
