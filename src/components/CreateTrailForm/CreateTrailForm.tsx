import { Controller } from 'react-hook-form';

import { IHut, IPlace, SeasonEnum, WaterAvailabilityEnum } from '../../types';

import { useCreateTrailForm } from '../../hooks/formHooks/trailHooks';
import {
  CustomSelect,
  FormFieldInfo,
  FormInputSearch,
  RequireAuthModal,
  SubmitButton,
} from '../common';
import { TrailEnumsResponse } from '../../api/utilitiesApi';
import { useHasSession } from '../../utils/sessionUtils';
import { useCreateTrail } from '../../hooks/dataHooks/trailHooks';
import { CreateTrailDto } from '../../schemas';

const TRAIL_INFO =
  'Share the details of your favorite trail with us—describe the scenery, the difficulty level, any wildlife you encountered, and the special moments that made your hike memorable. Your insights could inspire fellow hikers and help them discover new paths to explore!';

export interface ICreateTrail {
  totalDistance: number | unknown;
  trailDifficulty: number;
  elevationGained: number | unknown;
  activity: string[];
  availableHuts: { id: number }[];
  destinations: { id: number }[];
}

interface Props {
  // userSession: IUserSession | null;
  formEnums: TrailEnumsResponse;
  availableAccommodations: IHut[];
  availableDestinations: IPlace[];
  errMessage?: string;
}

const CreateTrailForm = ({
  // userSession,
  formEnums,
  availableAccommodations,
  availableDestinations,
}: // errMessage,
Props) => {
  const { register, handleSubmit, control, errors } = useCreateTrailForm();
  const { mutate: createTrail, isPending } = useCreateTrail();

  const userSession = useHasSession();
  const onSubmit = (trailData: CreateTrailDto) => {
    createTrail(trailData);
  };

  return (
    <>
      {!userSession && <RequireAuthModal message="Only logged-in users can access this page." />}

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
                  // initialValue={dataForReview?.seasonVisited ?? undefined}
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
                  // initialValue={dataForReview?.waterAvailable ?? undefined}
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
                  // initialValue={dataForReview?.trailDifficulty ?? undefined}
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
              defaultValue={[]}
              render={({ field }) => (
                <FormInputSearch
                  suggestions={availableAccommodations}
                  onAddSelection={(value) => field.onChange(value)}
                  onRemoveSelection={(value) => field.onChange(value)}
                  suggestionName={'accommodationName'}
                  // initialValues={dataForReview?.availableHuts}
                />
              )}
            />
          </div>

          <div className="form-container__form__pair__search">
            <label htmlFor="destinations">Destinations in the area</label>
            <Controller
              name="destinations"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormInputSearch
                  suggestions={availableDestinations}
                  onAddSelection={(value) => field.onChange(value)}
                  onRemoveSelection={(value) => field.onChange(value)}
                  suggestionName={'destinationName'}
                  // initialValues={dataForReview?.destinations}
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
            // defaultValue={dataForReview?.nextTo}
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
            // defaultValue={dataForReview?.trailInfo}
            // cols={30} rows={10}
            placeholder="........."
          />
          {errors.trailInfo && <div className="error-message">{errors.trailInfo.message}</div>}
        </div>
        {/* 
        {!dataForReview && <p style={{ color: 'black' }}>* {t('photos-message')}</p>}

        {(!dataForReview || (dataForReview && !forReview)) &&
          ctxDataForReview?.detailsStatus != 'approved' && (
            <CSubmitButton buttonName={dataForReview && !forReview ? 'Approve' : t('btn-create')} />
          )} */}

        <SubmitButton isSubmitting={isPending} buttonName="Create trail" />
      </form>
    </>
  );
};

export default CreateTrailForm;
