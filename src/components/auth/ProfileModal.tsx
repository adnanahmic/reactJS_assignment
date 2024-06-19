import React from "react";
import Modals from "../modals/Modals";
import { ProfileIcon } from "../../assets";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/hooks";
import { logOutAction } from "../../redux/actionCreators/profile";
import { profileImage } from "../../constants/BaseProfileImage";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileModal(props: Props) {
  const { isOpen, setIsOpen } = props;

  const { user } = useTypedSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const successCallBack = () => {
      setIsOpen(false);
    };
    dispatch(logOutAction(successCallBack));
  };

  return (
    <>
      <Modals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={590}
        isCloseButton={true}
        content={
          <div className="w-full profile_modal">
            <div className="w-full pl-[109.15px] ">
              <div className="w-full top-[87px]  profile_info_details">
                <div className="profile_icon">
                  <img
                    src={user?.profile_picture ?? profileImage}
                    className="h-[80px] w-[80px] rounded-full"
                    alt="user-profile"
                  />
                </div>

                <div className="profile_info">
                  <span className="profile_name">{user?.first_name}</span>
                  <span className="profile_signtings">47 sightings</span>
                </div>
              </div>

              <div className="mt-[41px] w-full profile_details">
                <span className="label">FirstName</span>
                <span className="detail_field">{user?.first_name}</span>
              </div>

              <div className="w-full profile_details">
                <span className="label">Last Name</span>
                <span className="detail_field">{user?.last_name}</span>
              </div>

              <div className="w-full profile_details">
                <span className="label">Date of Birth</span>
                <span className="detail_field">
                  {user?.date_of_birth ?? "---"}
                </span>
              </div>

              <div className="w-full profile_details">
                <span className="label">Email Address</span>
                <span className="detail_field">{user?.email ?? "---"}</span>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center top-[70px] pb-[59px]">
              <button
                className="log_out_btn px-[50.34px] py-[18px]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        }
      />
    </>
  );
}
