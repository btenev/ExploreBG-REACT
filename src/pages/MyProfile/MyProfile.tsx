import './MyProfile.scss';

import MyProfilePhotoField from '../../components/MyProfilePhotoField';
import MyProfileUsernameField from '../../components/MyProfileUsernameField';
import MyProfileInfoField from '../../components/MyProfileInfoField';
import MyProfileEmailField from '../../components/MyProfileEmailField';
import MyProfileGenderField from '../../components/MyProfileGenderField';
import MyProfileBirthdateField from '../../components/MyProfileBirthdateField';
import MyProfileButtons from '../../components/MyProfileButtons';
import { useMyProfile } from '../../hooks/dataHooks/userHooks';

const MyProfile = () => {
  const { data, isLoading, error } = useMyProfile();

  if (isLoading) return <p>Loading...</p>;

  if (error) throw error;

  if (!data) return <p>Resource not found!</p>;

  const { imageUrl, username, userInfo, email, gender, birthdate } = data;

  return (
    <main className="my-profile-container">
      <article>
        <h1>My Profile</h1>

        <section>
          <MyProfilePhotoField initialImageUrl={imageUrl} />

          <MyProfileUsernameField initialUsername={username} />
          <MyProfileEmailField initialEmail={email} />
          <MyProfileGenderField gender={gender} />
          <MyProfileBirthdateField birthdate={birthdate} />

          <MyProfileInfoField userInfo={userInfo} />

          <MyProfileButtons />
        </section>
      </article>
    </main>
  );
};

export default MyProfile;
