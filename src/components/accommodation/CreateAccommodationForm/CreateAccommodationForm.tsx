import { Controller } from "react-hook-form";

import { AccommodationEnumResponse } from "@api/public";
import {
  CustomSelect,
  FormFieldInfo,
  RequireAuthModal,
  SubmitButton,
} from "@components/common";
import { useCreateAccommodation } from "@hooks/dataHooks/accommodationHooks";
import {
  useApproveAccommodation,
  useGetAccommodationReviewer,
  useToggleReviewAccommodationDetails,
} from "@hooks/dataHooks/moderation/accommodationReviewHooks";
import { useCreateAccommodationForm } from "@hooks/formHooks/accommodationHooks";
import { useSession } from "@hooks/sessionHooks";
import { CreateAccommodationDto } from "@schemas/accommodation";
import {
  AccessibilityEnum,
  AccommodationTypeEnum,
  FoodAvailabilityEnum,
  IAccommodation,
  StatusEnum,
} from "@types";

const ACCOMMODATION_INFO =
  "Provide information about the accommodation, such as amenities, services, and any other relevant details that would help potential guests make an informed decision.";

interface Props {
  formEnums: AccommodationEnumResponse;
  dataForReview?: IAccommodation;
}

const CreateAccommodationForm = ({ formEnums, dataForReview }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useCreateAccommodationForm(dataForReview);
  const { userId } = useSession();

  const accommodationId = dataForReview?.id;
  const detailsStatus = dataForReview?.detailsStatus !== StatusEnum.approved;
  const enabled = Boolean(accommodationId && detailsStatus);

  const { data: reviewerData } = useGetAccommodationReviewer(
    String(accommodationId!),
    enabled,
  );

  const { mutate: createAccommodation, isPending: creating } =
    useCreateAccommodation();
  const { mutate: approveAccommodation, isPending: approving } =
    useApproveAccommodation();
  const toggleReview = useToggleReviewAccommodationDetails();

  const forReview =
    reviewerData?.reviewerId === null || reviewerData?.reviewerId !== userId;

  const onSubmit = (accommodationData: CreateAccommodationDto) => {
    if (dataForReview && !forReview) {
      // Approve the accommodation details
      approveAccommodation({
        accommodationData,
        accommodationId: String(dataForReview.id),
      });
      return;
    }

    createAccommodation(accommodationData);
  };

  const handleReviewClick = () => {
    if (!dataForReview) return;

    if (forReview) {
      // Claim the accommodation for review
      toggleReview.mutate({
        accommodationId: String(dataForReview.id),
        shouldClaim: true,
      });
    } else {
      // Unclaim the accommodation from review
      toggleReview.mutate({
        accommodationId: String(dataForReview.id),
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
            <label htmlFor="accommodationName">Accommodation name</label>
            <input
              id="accommodationName"
              type="text"
              {...register("accommodationName")}
              placeholder="Karlovo"
            />
            {errors.accommodationName && (
              <div className="error-message">
                {errors.accommodationName.message}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="type">Type</label>
            <Controller
              name="type"
              control={control}
              defaultValue={AccommodationTypeEnum.hut}
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

        <div className="form-container__form__pair">
          <div>
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              placeholder="Phone number"
            />
            {errors.phoneNumber && (
              <div className="error-message">{errors.phoneNumber.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="site">Site</label>
            <input
              id="site"
              type="text"
              {...register("site")}
              placeholder="Site url"
            />
            {errors.site && (
              <div className="error-message">{errors.site.message}</div>
            )}
          </div>
        </div>

        <div className="form-container__form__pair">
          <div>
            <label htmlFor="bedCapacity">Bed capacity</label>
            <input
              id="bedCapacity"
              {...register("bedCapacity", {
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              type="number"
              step="1"
              min="0"
              placeholder="Not set"
            />
            {errors.bedCapacity && (
              <div className="error-message">{errors.bedCapacity.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="pricePerBed">Price per bed</label>
            <input
              id="pricePerBed"
              {...register("pricePerBed", {
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              type="number"
              step="0.01"
              placeholder="Not set"
              min="0"
            />
            {errors.pricePerBed && (
              <div className="error-message">{errors.pricePerBed.message}</div>
            )}
          </div>
        </div>

        <div className="form-container__form__pair">
          <div>
            <label htmlFor="availableFood">Available food</label>
            <Controller
              name="availableFood"
              control={control}
              defaultValue={FoodAvailabilityEnum.no_information}
              render={({ field }) => (
                <CustomSelect
                  options={formEnums.availableFood}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="access">Accessibility</label>
            <Controller
              name="access"
              control={control}
              defaultValue={AccessibilityEnum.on_foot}
              render={({ field }) => (
                <CustomSelect
                  options={formEnums.access}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>

        <div className="form-container__form__single">
          <label htmlFor="accommodationInfo">
            Accommodation info &nbsp;
            <FormFieldInfo infoText={ACCOMMODATION_INFO} />
          </label>
          <textarea
            id="accommodationInfo"
            {...register("accommodationInfo")}
            // cols={30} rows={10}
            placeholder="........."
          />
          {errors.accommodationInfo && (
            <div className="error-message">
              {errors.accommodationInfo.message}
            </div>
          )}
        </div>

        {!dataForReview && (
          <p style={{ color: "black" }}>
            * You can add photos after create this accommodation.
          </p>
        )}

        {(!dataForReview || (dataForReview && !forReview)) &&
          dataForReview?.detailsStatus !== StatusEnum.approved && (
            <SubmitButton
              isSubmitting={dataForReview && !forReview ? approving : creating}
              buttonName={
                dataForReview && !forReview ? "Approve" : "Create accommodation"
              }
            />
          )}
      </form>
    </>
  );
};

export default CreateAccommodationForm;
