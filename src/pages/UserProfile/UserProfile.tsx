import { useEffect } from "react";
import { FaFemale, FaMale, FaUserNinja } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";

import defaultUserImg from "@assets/images/user-profile-pic.png";
import { AccommodationCard } from "@components/accommodation";
import { LoadingScreenWrapper, NotFoundModal } from "@components/common";
import { DestinationCard } from "@components/destination";
import { HikeCard } from "@components/hike";
import { TrailCard } from "@components/trail";
import { UserCreatedItems } from "@components/user/profile";
import { useGetUserProfile } from "@hooks/dataHooks/userHooks";
import { useSessionStore } from "@store/sessionStore";
import { formatDate } from "@utils/dateUtils";
import { isApiError } from "@utils/errorHandlers";

import "./UserProfile.scss";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const numericId = Number(userId);
  const isValid = !!userId && !isNaN(numericId);
  const navigate = useNavigate();
  const { user: sessionUser, hasHydrated } = useSessionStore();
  const sessionUserId = sessionUser?.userId ?? null;

  useEffect(() => {
    if (!hasHydrated) return;

    if (sessionUser && sessionUser.userId === numericId) {
      navigate("/users/my-profile", { replace: true });
    }
  }, [sessionUser, numericId, navigate, hasHydrated]);

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserProfile(userId || "", isValid);

  if (!isValid)
    return (
      <NotFoundModal message="Oops! We couldn't find that user. Please check the link and try again." />
    );

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404)
    return (
      <NotFoundModal message="The user you're looking for was not found." />
    );

  if (!user)
    return (
      <NotFoundModal message="The  user you're looking for was not found." />
    );

  const {
    username,
    gender,
    birthdate,
    userInfo,
    imageUrl,
    createdHikes,
    createdTrails,
    createdAccommodations,
    createdDestinations,
  } = user;

  return (
    <main className="profile-container">
      <article>
        <h1> {`${user.username}'s Profile`}</h1>

        <section>
          <aside>
            {gender ? (
              <p>
                {gender === "Male" && <FaMale />}
                {gender === "Female" && <FaFemale />}
                gender: <strong>{gender}</strong>
              </p>
            ) : (
              <p>
                gender: <span>not available</span>
              </p>
            )}

            <p>
              <LiaBirthdayCakeSolid />
              birthday:{" "}
              {birthdate ? (
                <strong>{formatDate(birthdate)}</strong>
              ) : (
                <span>not available</span>
              )}
            </p>

            <p>{userInfo}</p>
          </aside>

          <figure>
            <img
              src={imageUrl ?? defaultUserImg}
              width={300}
              height={300}
              alt={imageUrl ? `${username}'s photo` : "Default user image"}
              loading="eager"
              title={imageUrl ? `${username}'s photo` : "Default user image"}
            />
            {username && (
              <figcaption>
                <FaUserNinja /> &nbsp;{username}
              </figcaption>
            )}
          </figure>
        </section>
      </article>

      {createdHikes?.length > 0 && (
        <UserCreatedItems
          items={createdHikes}
          title="hike"
          renderItem={(hike) => (
            <HikeCard card={hike} sessionUserId={sessionUserId} />
          )}
        />
      )}

      {createdTrails?.length > 0 && (
        <UserCreatedItems
          items={createdTrails}
          title="trail"
          renderItem={(trail) => (
            <TrailCard card={trail} sessionUserId={sessionUserId} />
          )}
        />
      )}

      {createdAccommodations?.length > 0 && (
        <UserCreatedItems
          items={createdAccommodations}
          title="accommodation"
          renderItem={(accommodation) => (
            <AccommodationCard
              card={accommodation}
              sessionUserId={sessionUserId}
            />
          )}
        />
      )}

      {createdDestinations?.length > 0 && (
        <UserCreatedItems
          items={createdDestinations}
          title="destination"
          renderItem={(destination) => (
            <DestinationCard card={destination} sessionUserId={sessionUserId} />
          )}
        />
      )}
    </main>
  );
};

export default UserProfile;
