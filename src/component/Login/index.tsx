"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ROLES } from "@src/utils/helper";
import CustomInput from "../customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { useUserLogin } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@src/redux/reducers/authSlice";

const LoginComponent = () => {
  const method = useForm();
  const { handleSubmit, reset } = method;
  const dispetch = useDispatch();
  const router = useRouter();

  const {
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError,
    mutate: login,
  } = useUserLogin();
  console.log("api is called sucessfully ");
  console.log(loginData);

  useEffect(() => {
    if (loginData && !isLoginLoading) {
      dispetch(setAuthToken(loginData.data.token));
      toast.success(loginData?.message ?? "Login Successful");
      reset();
      router?.push("/home");
    }
    if (isLoginError) {
      toast.error(loginError);
      router.push("/login");
    }
  }, [loginData, isLoginLoading, loginError, isLoginError, reset, router]);

  //fetch used for testing perpose
  //   const fetchData = async (data: any) => {
  //     try {
  //       const response = await fetch("http://localhost:8020/user/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       console.log(result);
  //     } catch (error: any) {
  //       console.log(error);
  //     }
  //   };

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("data is here");
    console.log(data);
    login(data);
    //fetchData(data);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Seamless Login for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Immerse yourself in a hassle-free login journey with our intuitively
            designed login form. Effortlessly access your account.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="w-full">
          <h1 className="text-2xl mb-12 text-center">Login here</h1>
          <FormProvider {...method}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md w-full md:ml-auto"
            >
              <div className="space-y-6">
                <div>
                  <CustomInput
                    name="email"
                    type="email"
                    label="Enter Your Email"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <CustomInput
                    name="password"
                    type="password"
                    label="Enter Your Password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
