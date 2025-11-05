import { AccommodationCard } from "@components/accommodation";
import { LoadingScreenWrapper, NotFoundModal } from "@components/common";
import { DestinationCard } from "@components/destination";
import { HikeCard } from "@components/hike";
import { TrailCard } from "@components/trail";
import {
  MyProfilePhotoField,
  MyProfileInfoField,
  MyProfileButtons,
  UserCreatedItems,
  MyProfileEmailField,
  MyProfileUsernameField,
  MyProfileGenderField,
  MyProfileBirthdateField,
} from "@components/user/profile";
import { useMyProfile } from "@hooks/dataHooks/userHooks";
import { isApiError } from "@utils/errorHandlers";

import "./MyProfile.scss";

const MyProfile = () => {
  const { data, isLoading, error } = useMyProfile();

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return <NotFoundModal message={"Your profile was not found."} />;
  }

  if (!data) {
    return <NotFoundModal message={"Your profile was not found."} />;
  }

  const {
    id,
    imageUrl,
    username,
    userInfo,
    email,
    gender,
    birthdate,
    createdHikes,
    createdTrails,
    createdAccommodations,
    createdDestinations,
  } = data;

  return (
    <main className="my-profile-container">
      <article>
        <h1>My Profile</h1>

        <section>
          <MyProfilePhotoField imageUrl={imageUrl} />

          <MyProfileUsernameField username={username} />
          <MyProfileEmailField email={email} />
          <MyProfileGenderField gender={gender} />
          <MyProfileBirthdateField birthdate={birthdate} />

          <MyProfileInfoField userInfo={userInfo} />

          <MyProfileButtons />
        </section>
      </article>

      {createdHikes?.length > 0 && (
        <UserCreatedItems
          items={createdHikes}
          title="hike"
          renderItem={(hike) => <HikeCard card={hike} sessionUserId={id} />}
        />
      )}

      {createdTrails?.length > 0 && (
        <UserCreatedItems
          items={createdTrails}
          title="trail"
          renderItem={(trail) => <TrailCard card={trail} sessionUserId={id} />}
        />
      )}

      {createdAccommodations?.length > 0 && (
        <UserCreatedItems
          items={createdAccommodations}
          title="accommodation"
          renderItem={(accommodation) => (
            <AccommodationCard card={accommodation} sessionUserId={id} />
          )}
        />
      )}

      {createdDestinations?.length > 0 && (
        <UserCreatedItems
          items={createdDestinations}
          title="destination"
          renderItem={(destination) => (
            <DestinationCard card={destination} sessionUserId={id} />
          )}
        />
      )}
    </main>
  );
};

export default MyProfile;
