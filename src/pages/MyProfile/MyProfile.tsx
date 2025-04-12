import './MyProfile.scss';

import MyProfilePhotoField from '../../components/MyProfilePhotoField';
import MyProfileUsernameField from '../../components/MyProfileUsernameField';
import { useMyProfile } from '../../hooks/useMyProfile';

const MyProfile = () => {
  const { data, isLoading, error } = useMyProfile();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  if (!data) return <p>Resource not found!</p>;

  const { imageUrl, username } = data;

  return (
    <main className="my-profile-container">
      <article>
        <h1>My Profile</h1>

        <section>
          <MyProfilePhotoField initialImageUrl={imageUrl} />

          <MyProfileUsernameField initialUsername={username} />
        </section>
      </article>
    </main>
  );
};

export default MyProfile;
