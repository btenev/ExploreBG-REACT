import { Controller } from 'react-hook-form';

import { IHut, IPlace, ITrail, SeasonEnum, StatusEnum, WaterAvailabilityEnum } from '../../types';

import {
  CustomSelect,
  FormFieldInfo,
  FormInputSearch,
  RequireAuthModal,
  SubmitButton,
} from '../common';

import { CreateTrailDto } from '../../schemas';

import { TrailEnumsResponse } from '../../api/utilitiesApi';
import { useSessionInfo } from '../../utils/sessionUtils';

import { useCreateTrailForm } from '../../hooks/formHooks/trailHooks';
import { useGetTrailReviewer } from '../../hooks/dataHooks/moderation';
import { useToggleReviewTrailDetails } from '../../hooks/dataHooks/moderation';
import { useApproveTrail } from '../../hooks/dataHooks/moderation';
import { useCreateTrail } from '../../hooks/dataHooks/trailHooks';

const TRAIL_INFO =
  'Share the details of your favorite trail with us—describe the scenery, the difficulty level, any wildlife you encountered, and the special moments that made your hike memorable. Your insights could inspire fellow hikers and help them discover new paths to explore!';

interface Props {
  formEnums: TrailEnumsResponse;
  availableAccommodations: IHut[];
  availableDestinations: IPlace[];
  dataForReview?: ITrail;
}

const CreateTrailForm = ({
  formEnums,
  availableAccommodations,
  availableDestinations,
  dataForReview,
}: Props) => {
  const { register, handleSubmit, control, errors } = useCreateTrailForm(dataForReview);
  const { staffId } = useSessionInfo();

  const trailId = dataForReview?.id;
  const detailsStatus = dataForReview?.detailsStatus !== StatusEnum.approved;
  const enabled = Boolean(trailId && detailsStatus);

  const { data: reviewerData } = useGetTrailReviewer(String(trailId!), enabled);

  const { mutate: createTrail, isPending: creating } = useCreateTrail();
  const { mutate: approveTrail, isPending: approving } = useApproveTrail();
  const toggleReview = useToggleReviewTrailDetails();

  const forReview = reviewerData?.reviewerId === null || reviewerData?.reviewerId !== staffId;

  const onSubmit = (trailData: CreateTrailDto) => {
    if (dataForReview && !forReview) {
      // Approve the trail details
      approveTrail({ trailData, trailId: String(dataForReview.id) });
      return;
    }

    createTrail(trailData);
  };

  const handleReviewClick = () => {
    if (!dataForReview) return;

    if (forReview) {
      // Claim the trail for review
      toggleReview.mutate({
        trailId: String(dataForReview.id),
        shouldClaim: true,
      });
    } else {
      // Unclaim the trail from review
      toggleReview.mutate({
        trailId: String(dataForReview.id),
        shouldClaim: false,
      });
    }
  };

  return (
    <>
      {!staffId && <RequireAuthModal message="Only logged-in users can access this page." />}

      {dataForReview && dataForReview?.detailsStatus !== StatusEnum.approved && (
        <button onClick={handleReviewClick} className="review-btn">
          {forReview ? 'review' : 'cancel'}
        </button>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="form-container__form">
        <div className="form-container__form__pair">
          <div>
            <label htmlFor="startPoint">Start point</label>
            <input id="startPoint" type="text" {...register('startPoint')} placeholder="Karlovo" />
            {errors.startPoint && <div className="error-message">{errors.startPoint.message}</div>}
          </div>

          <div>
            <label htmlFor="endPoint">End point</label>
            <input id="endPoint" type="text" {...register('endPoint')} placeholder="Botev peak" />
            {errors.endPoint && <div className="error-message">{errors.endPoint.message}</div>}
          </div>
        </div>
        <div className="form-container__form__pair">
          <div>
            <label htmlFor="totalDistance">Total distance in km</label>
            <input
              id="totalDistance"
              type="number"
              {...register('totalDistance')}
              placeholder="17.25"
            />
            {errors.totalDistance && (
              <div className="error-message">{errors.totalDistance.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="elevationGained">Elevation in metres</label>
            <input
              id="elevationGained"
              type="number"
              {...register('elevationGained')}
              placeholder="1867"
            />
            {errors.elevationGained && (
              <div className="error-message">{errors.elevationGained.message}</div>
            )}
          </div>
        </div>
        <div className="form-container__form__pair">
          <div>
            <label htmlFor="seasonVisited">Visited in ( season )</label>
            <Controller
              name="seasonVisited"
              control={control}
              defaultValue={SeasonEnum.summer}
              render={({ field }) => (
                <CustomSelect
                  options={formEnums.seasonVisited}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          <div className="form-container__form__pair__checkbox">
            <p>Suitable for :</p>
            {formEnums?.activity.map((a) => (
              <div key={a}>
                <input id={`activity-${a}`} type="checkbox" value={a} {...register('activity')} />
                <label htmlFor={`activity-${a}`}>{a}</label>
              </div>
            ))}
            {errors.activity && <div className="error-message">{errors.activity.message}</div>}
          </div>
        </div>
        <div className="form-container__form__pair">
          <div className="water-available">
            <label htmlFor="waterAvailability">Water sources</label>
            <Controller
              name="waterAvailability"
              control={control}
              defaultValue={WaterAvailabilityEnum.no_information}
              render={({ field }) => (
                <CustomSelect
                  options={formEnums.waterAvailability}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="trailDifficulty">Trail difficulty</label>
            <Controller
              name="trailDifficulty"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <CustomSelect
                  options={formEnums.trailDifficulty}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>
        <div className="form-container__form__pair">
          <div className="form-container__form__pair__search">
            <label htmlFor="availableHuts">Lodges in the area</label>
            <Controller
              name="availableHuts"
              control={control}
              render={({ field }) => (
                <FormInputSearch
                  suggestions={availableAccommodations}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  suggestionName={'accommodationName'}
                />
              )}
            />
          </div>

          <div className="form-container__form__pair__search">
            <label htmlFor="destinations">Destinations in the area</label>
            <Controller
              name="destinations"
              control={control}
              render={({ field }) => (
                <FormInputSearch
                  suggestions={availableDestinations}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  suggestionName={'destinationName'}
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
            {...register('nextTo')}
            placeholder={'city ​​/ town / village'}
          />
          {errors.nextTo && <div className="error-message">{errors.nextTo.message}</div>}
        </div>
        <div className="form-container__form__single">
          <label htmlFor="trailInfo">
            Trail info &nbsp;
            <FormFieldInfo infoText={TRAIL_INFO} />
          </label>
          <textarea
            id="trailInfo"
            {...register('trailInfo')}
            // cols={30} rows={10}
            placeholder="........."
          />
          {errors.trailInfo && <div className="error-message">{errors.trailInfo.message}</div>}
        </div>

        {!dataForReview && (
          <p style={{ color: 'black' }}>* You can add photos after create this trail.</p>
        )}

        {(!dataForReview || (dataForReview && !forReview)) &&
          dataForReview?.detailsStatus !== StatusEnum.approved && (
            <SubmitButton
              isSubmitting={dataForReview && !forReview ? approving : creating}
              buttonName={dataForReview && !forReview ? 'Approve' : 'Create trail'}
            />
          )}
      </form>
    </>
  );
};

export default CreateTrailForm;
