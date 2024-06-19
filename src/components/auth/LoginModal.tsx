import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { FormInput } from "../formControl/FormInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modals from "../modals/Modals";
import { loginAction, LoginPayload } from "../../redux/actionCreators/login";
import { useAppDispatch } from "../../hooks/hooks";
import { getUser } from "../../redux/actionCreators/profile";
import SuccessModal from "../modals/SuccessModal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default function LoginModal(props: Props) {
  const { isOpen, setIsOpen } = props;

  const dispatch = useAppDispatch();
  const { error, loading } = useTypedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [isOpenSuccessModal, setIsOpenSuccess] = useState(false);

  const openSuccessModal = () => {
    setIsOpen(false);
    setIsOpenSuccess(true);
  };

  const onSubmit = handleSubmit((data: any) => {
    const payload: LoginPayload = {
      email: data?.email,
      password: data?.password,
    };

    const successCallback = () => {
      setIsOpen(false);
      dispatch(getUser(openSuccessModal));
    };

    const failureCallBack = () => {
      toast.error(error);
    };

    dispatch(loginAction(payload, successCallback, failureCallBack));
  });

  return (
    <>
      <Modals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={440}
        content={
          <div className=" w-full px-[30px] pt-[30px]">
            <div className="login_title mb-[30px]">
              <span>Welcome back</span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6 ">
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
                  {loading ? "Loading..." : " Login to your Account"}
                </Button>
              </div>
            </form>
          </div>
        }
      />

      <SuccessModal
        isOpen={isOpenSuccessModal}
        setIsOpen={setIsOpenSuccess}
        content={
          "Congratulations! You have successfully logged into FlowrSpot!"
        }
      />
    </>
  );
}
