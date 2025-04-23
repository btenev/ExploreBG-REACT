import { ActiveLink } from '../common';

const NavigationLinks = () => {
  return (
    <>
      <li>
        <ActiveLink to={'/about'}>About</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/FAQ'}>FAQ</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/destinations'}>Destinations</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/trails'}>Trails</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/hikes'}>Hikes</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/accommodations'}>Accommodations</ActiveLink>
      </li>
    </>
  );
};

export default NavigationLinks;
