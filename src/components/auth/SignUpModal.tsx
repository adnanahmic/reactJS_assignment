import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { FormInput } from "../formControl/FormInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modals from "../modals/Modals";
import { SignUpPayload, signUpAction } from "../../redux/actionCreators/signup";
import { useAppDispatch } from "../../hooks/hooks";
import SuccessModal from "../modals/SuccessModal";
import LoginModal from "./LoginModal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.date().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default function SignUpModal(props: Props) {
  const { isOpen, setIsOpen } = props;

  const [isOpenSuccessModal, setIsOpenSuccess] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const dispatch = useAppDispatch();
  const { error, loading } = useTypedSelector((state) => state.signUps);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleOkAction = () => {
    setIsOpenLoginModal(true);
  };

  const onSubmit = handleSubmit((data: any) => {
    const payload: SignUpPayload = {
      first_name: data?.firstName,
      last_name: data?.lastName,
      date_of_birth: data?.dob,
      email: data?.email,
      password: data?.password,
    };

    const successCallback = () => {
      setIsOpenSuccess(true);
      setIsOpen(false);
    };

    const failureCallBack = () => {
      toast.error(error);
    };

    dispatch(signUpAction(payload, successCallback, failureCallBack));
  });

  return (
    <>
      <div className="w-full">
        {isOpen && (
          <Modals
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={`${isOpenSuccessModal ? "hidden" : null}`}
            width={440}
            content={
              <div className=" w-full px-[30px] pt-[30px]">
                <div className="login_title mb-[30px]">
                  <span>Create an Account</span>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-6 ">
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                      <FormInput
                        id="firstName"
                        type="text"
                        name="firstName"
                        label="First Name"
                        placeholder="First Name"
                        register={register}
                        errors={errors}
                      />
                    </div>
                    <div className="w-full md:w-1/2 pl-[10px] mb-6 md:mb-0">
                      <FormInput
                        id="lastName"
                        type="text"
                        name="lastName"
                        label="Last Name"
                        placeholder="last Name"
                        register={register}
                        errors={errors}
                      />
                    </div>

                    <div className="w-full pt-[10px]">
                      <FormInput
                        id="dob"
                        type="date"
                        name="dob"
                        label="Date Of Birth"
                        placeholder="Date Of Birth"
                        register={register}
                        className="w-full"
                        errors={errors}
                      />
                    </div>

                    <div className="w-full pt-[10px]">
                      <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        register={register}
                        className="w-full"
                        errors={errors}
                      />
                    </div>

                    <div className="w-full pt-[10px]">
                      <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Password"
                        register={register}
                        className="w-full"
                        errors={errors}
                      />
                    </div>

                    <Button
                      className="w-full pt-[10px] auth_submit_btn"
                      type="submit"
                    >
                      {loading ? "Loading..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </div>
            }
          />
        )}

        <SuccessModal
          isOpen={isOpenSuccessModal}
          setIsOpen={setIsOpenSuccess}
          content={
            " Congratulations! You have successfully signed up for FlowrSpot!"
          }
          handleOkAction={handleOkAction}
        />

        <LoginModal isOpen={isOpenLoginModal} setIsOpen={setIsOpenLoginModal} />
      </div>
    </>
  );
}
