import './MyProfile.scss';

import MyProfilePhotoField from '../../components/MyProfilePhotoField';
import MyProfileUsernameField from '../../components/MyProfileUsernameField';
import MyProfileInfoField from '../../components/MyProfileInfoField';
import { useMyProfile } from '../../hooks/useMyProfile';
import MyProfileEmailField from '../../components/MyProfileEmailField';

const MyProfile = () => {
  const { data, isLoading, error } = useMyProfile();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  if (!data) return <p>Resource not found!</p>;

  const { imageUrl, username, userInfo, email } = data;

  return (
    <main className="my-profile-container">
      <article>
        <h1>My Profile</h1>

        <section>
          <MyProfilePhotoField initialImageUrl={imageUrl} />

          <MyProfileUsernameField initialUsername={username} />
          <MyProfileEmailField initialEmail={email} />

          <MyProfileInfoField userInfo={userInfo} />
        </section>
      </article>
    </main>
  );
};

export default MyProfile;
