import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaBarsStaggered } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

import './HeaderLinksAndButtons.scss';

import defaultUserImg from '../../assets/images/user-profile-pic.png';

import UserNavLinks from '../UserNavLinks';
import NavigationLinks from '../NavigationLinks';

import useCloseOnEscapeTabAndClickOutside from '../../hooks/uiHooks/useCloseOnEscapeTabClick';
import { useLogout } from '../../hooks/dataHooks/authHooks';

import { useHasSession, useIsAdminOrModerator, useUserImage } from '../../utils/sessionUtils';
import { PUBLIC_ROUTES } from '../../constants';

const HeaderLinksAndButtons = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
  const [isShownUserLinks, setIsShownUserLinks] = useState<boolean>(false);
  const { mutate: logout } = useLogout();

  const hasSession = useHasSession();
  const userImage = useUserImage() ?? defaultUserImg;
  const isAdminOrModerator = useIsAdminOrModerator();

  const userNavLinksRef = useRef<HTMLElement>(null);
  const navBarRef = useRef<HTMLElement>(null);

  const onLogoutClick = () => {
    logout();
    setIsShownUserLinks(false);
  };

  useCloseOnEscapeTabAndClickOutside(userNavLinksRef, () => setIsShownUserLinks(false));
  useCloseOnEscapeTabAndClickOutside(navBarRef, () => setIsOpenNavbar(false));

  return (
    <div className="nav-wrapper">
      <nav className="nav-wrapper__links" aria-label="primary-navigation">
        {hasSession && (
          <section
            ref={userNavLinksRef}
            onClick={() => setIsShownUserLinks((state) => !state)}
            className="nav-wrapper__links__user"
          >
            <img
              src={userImage}
              width={50}
              height={50}
              loading="eager"
              alt="User profile picture"
            />

            {isShownUserLinks && (
              <aside className="nav-wrapper__links__user__links">
                <ul>
                  <UserNavLinks isAdminOrModerator={isAdminOrModerator} />
                  <li>{hasSession && <button onClick={onLogoutClick}>Logout</button>}</li>
                </ul>
              </aside>
            )}
          </section>
        )}

        <ul>
          <NavigationLinks />
        </ul>

        {!hasSession && (
          <Link to={PUBLIC_ROUTES.authentication} className="glow-on-hover">
            Login/Sign up
          </Link>
        )}
      </nav>

      <div onClick={() => setIsOpenNavbar((state) => !state)} className="nav-wrapper__navbar">
        {!isOpenNavbar && <FaBarsStaggered />}

        {isOpenNavbar && <MdClose className="nav-wrapper__navbar__close" />}
      </div>

      {isOpenNavbar && (
        <nav
          ref={navBarRef}
          className="nav-wrapper__mobile-links"
          aria-label="small-screen-navigation"
        >
          {hasSession && (
            <figure>
              <img
                src={userImage}
                width={50}
                height={50}
                loading="eager"
                alt="User profile picture"
                title="User profile picture"
              />
            </figure>
          )}

          <ul>
            {hasSession && <UserNavLinks isAdminOrModerator={isAdminOrModerator} />}

            <NavigationLinks />
          </ul>

          {!hasSession && (
            <Link to={PUBLIC_ROUTES.authentication} className="glow-on-hover">
              Login/Sign up
            </Link>
          )}

          {hasSession && (
            <button onClick={onLogoutClick} className="glow-on-hover">
              Logout
            </button>
          )}
        </nav>
      )}
    </div>
  );
};

export default HeaderLinksAndButtons;
