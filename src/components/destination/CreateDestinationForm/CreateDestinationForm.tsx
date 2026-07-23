import { Controller } from "react-hook-form";

import { DestinationEnumsResponse } from "@api/public";
import {
  CustomSelect,
  FormFieldInfo,
  RequireAuthModal,
  SubmitButton,
} from "@components/common";
import { useCreateDestination } from "@hooks/dataHooks/destinationHooks";
import {
  useApproveDestination,
  useGetDestinationReviewer,
} from "@hooks/dataHooks/moderation/destinationReviewHooks";
import { useToggleReviewDestinationDetails } from "@hooks/dataHooks/moderation/destinationReviewHooks";
import { useCreateDestinationForm } from "@hooks/formHooks/destinationHooks";
import { useSession } from "@hooks/sessionHooks";
import { CreateDestinationDto } from "@schemas/destination";
import { IDestination, DestinationTypeEnum, StatusEnum } from "@types";

const DESTINATION_INFO =
  "Provide information about the destination, such as amenities, services, and any other relevant details that would help potential visitors make an informed decision.";

interface Props {
  formEnums: DestinationEnumsResponse;
  dataForReview?: IDestination;
}

const CreateDestinationForm = ({ formEnums, dataForReview }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useCreateDestinationForm(dataForReview);
  const { userId } = useSession();

  const destinationId = dataForReview?.id;
  const detailsStatus = dataForReview?.detailsStatus !== StatusEnum.approved;
  const enabled = Boolean(destinationId && detailsStatus);

  const { data: reviewerData } = useGetDestinationReviewer(
    String(destinationId!),
    enabled,
  );

  const { mutate: createDestination, isPending: creating } =
    useCreateDestination();
  const { mutate: approveDestination, isPending: approving } =
    useApproveDestination();
  const toggleReview = useToggleReviewDestinationDetails();

  const forReview =
    reviewerData?.reviewerId === null || reviewerData?.reviewerId !== userId;

  const onSubmit = (destinationData: CreateDestinationDto) => {
    if (dataForReview && !forReview) {
      // Approve the destination details
      approveDestination({
        destinationData,
        destinationId: String(dataForReview.id),
      });
      return;
    }
    createDestination(destinationData);
  };

  const handleReviewClick = () => {
    if (!dataForReview) return;

    if (forReview) {
      // Claim the destination for review
      toggleReview.mutate({
        destinationId: String(dataForReview.id),
        shouldClaim: true,
      });
    } else {
      // Unclaim the destination from review
      toggleReview.mutate({
        destinationId: String(dataForReview.id),
        shouldClaim: false,
      });
    }
  };

  return (
    <>
      {!userId && (
        <RequireAuthModal message="Only logged-in users can access this page." />
      )}

      {dataForReview &&
        dataForReview?.detailsStatus !== StatusEnum.approved && (
          <button onClick={handleReviewClick} className="review-btn">
            {forReview ? "review" : "cancel"}
          </button>
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
                  options={formEnums.type}
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

        {!dataForReview && (
          <p style={{ color: "black" }}>
            * You can add photos after create this destination.
          </p>
        )}

        {(!dataForReview || (dataForReview && !forReview)) &&
          dataForReview?.detailsStatus !== StatusEnum.approved && (
            <SubmitButton
              isSubmitting={dataForReview && !forReview ? approving : creating}
              buttonName={
                dataForReview && !forReview ? "Approve" : "Create destination"
              }
            />
          )}
      </form>
    </>
  );
};

export default CreateDestinationForm;
