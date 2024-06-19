import { Fragment, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo, ProfileIcon } from "../assets";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/allRoutes";
import SignUpModal from "./auth/SignUpModal";
import LoginModal from "./auth/LoginModal";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ProfileModal from "./auth/ProfileModal";
import { useAppDispatch } from "../hooks/hooks";
import { getUser } from "../redux/actionCreators/profile";
import { profileImage } from "../constants/BaseProfileImage";

const navigation = [
  { name: "Flowers", href: ROUTES.flowers, current: true },
  { name: "Latest Sightings", href: ROUTES.latestSightings, current: false },
  { name: "Favorites", href: ROUTES.favorites, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isProfileModalOpen, setIsOpenProfileModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { token, user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Disclosure as="nav" className="header">
        {({ open }) => (
          <>
            <div className="mx-auto w-full px-[23px] sm:px-6">
              <div className="relative flex h-20 py-[25px] items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className="logo_section flex flex-row gap-4 items-center">
                    <div className="flex flex-shrink-0 items-center">
                      <Logo />
                    </div>
                    <div>
                      <span className="logo_title">FlowrSpot</span>
                    </div>
                  </div>
                </div>

                {/* desktop navigation  */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          "rounded-md px-3 py-2 text-sm font-medium menu_item "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {!token ? (
                      <Fragment>
                        <span
                          className="menu_item menu_item_login px-3 py-2"
                          onClick={() => setIsLoginModalOpen(true)}
                        >
                          Login
                        </span>
                        <button
                          className="menu_item menu_item_new  flex flex-col items-center justify-center text-center"
                          onClick={() => setIsSignUpModalOpen(true)}
                        >
                          New Account
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="menu_item  px-3 py-2">
                          {user?.first_name}
                        </span>
                        <span
                          className=" cursor-pointer"
                          onClick={() => setIsOpenProfileModalOpen(true)}
                        >
                          <img
                            src={user?.profile_picture ?? profileImage}
                            className="h-[40px] w-[40px] rounded-full"
                            alt="user-profile"
                          />
                        </span>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation  */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      "block rounded-md px-3 py-2 text-base font-medium menu_item"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              {!token ? (
                <Fragment>
                  <span
                    className="menu_item menu_item_login px-3 py-2"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </span>
                  <button
                    className="menu_item menu_item_new  flex flex-col items-center justify-center text-center"
                    onClick={() => setIsSignUpModalOpen(true)}
                  >
                    New Account
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <span className="menu_item  px-3 py-2">Jhon Doe</span>
                  <span
                    className=" cursor-pointer"
                    onClick={() => setIsOpenProfileModalOpen(true)}
                  >
                    <ProfileIcon />
                  </span>
                </Fragment>
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      <SignUpModal
        isOpen={isSignUpModalOpen}
        setIsOpen={setIsSignUpModalOpen}
      />
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <ProfileModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsOpenProfileModalOpen}
      />
    </Fragment>
  );
}
