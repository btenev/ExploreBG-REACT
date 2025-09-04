import { FaFemale, FaMale, FaUserNinja } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";

import defaultUserImg from "@assets/images/user-profile-pic.png";
import { LoadingScreenWrapper, NotFoundModal } from "@components/common";
import { HikeCard } from "@components/hike";
import { TrailCard } from "@components/trail";
import { UserCreatedItems } from "@components/user/profile";
import { useGetUserProfile } from "@hooks/dataHooks/userHooks";
import { formatDate } from "@utils/dateUtils";
import { isApiError } from "@utils/errorHandlers";

import "./UserProfile.scss";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const numericId = Number(userId);
  if (!userId || isNaN(numericId))
    return (
      <NotFoundModal message="Oops! We couldn't find that user. Please check the link and try again." />
    );

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserProfile(userId); /*TODO: update logic*/

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return (
      <NotFoundModal message="The user you're looking for was not found." />
    );
  }

  if (!user) {
    return (
      <NotFoundModal message="The  user you're looking for was not found." />
    );
  }

  const {
    username,
    email,
    gender,
    birthdate,
    userInfo,
    imageUrl,
    createdHikes,
    createdTrails,
  } = user;

  return (
    <main className="profile-container">
      <article>
        <h1> {`${user.username}'s Profile`}</h1>

        <section>
          <aside>
            <p>
              <HiOutlineMail /> <strong>{email}</strong>
            </p>
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
          renderItem={(hike) => <HikeCard card={hike} />}
        />
      )}

      {createdTrails?.length > 0 && (
        <UserCreatedItems
          items={createdTrails}
          title="trail"
          renderItem={(trail) => <TrailCard card={trail} />}
        />
      )}
    </main>
  );
};

export default UserProfile;
