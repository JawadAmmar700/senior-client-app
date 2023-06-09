"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { fetcher } from "@/lib/fetchers";

import { Formik, Form as FormConponent, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

import { Merriweather_Sans } from "next/font/google";
import { Toaster, toast } from "react-hot-toast";

const merriweather_Sans = Merriweather_Sans({ subsets: ["latin"] });

const Form = ({ type }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpSubmition = async (values: HandleSubmitProps) => {
    if (!values.email || !values.password || !values.username) {
      return toast.error("Please fill all the fields");
    }
    setIsSubmitting(true);
    const user = await fetcher({
      url: `${process.env.NEXT_PUBLIC_APP_API}/api/register-user`,
      obj: values,
    });

    if (user.success) {
      const done = await signIn("credentials", {
        callbackUrl: "/",
        ...values,
      });
      if (done?.ok) {
        setIsSubmitting(false);
      }
      return;
    } else {
      setIsSubmitting(false);
      return toast.error("User already exists");
    }
  };

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
  });

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
  });

  const handleSignInSubmition = async (values: HandleSubmitProps) => {
    if (!values.email || !values.password)
      return toast.error("Please fill all the fields");
    setIsSubmitting(true);
    const done = await signIn("credentials", {
      callbackUrl: "/",
      ...values,
    });
    if (done?.ok) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl px-10 lg:max-w-md">
      <Formik
        initialValues={
          type === "signup"
            ? { email: "", username: "", password: "" }
            : { email: "", password: "" }
        }
        validationSchema={type === "signup" ? SignUpSchema : SigninSchema}
        onSubmit={
          type === "signup" ? handleSignUpSubmition : handleSignInSubmition
        }
      >
        {({ errors, touched, values }) => (
          <FormConponent>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email*</span>
                {errors.email && touched.email ? (
                  <div className="text-xs text-red-500">{errors.email}</div>
                ) : null}
              </label>
              <Field
                type="email"
                name="email"
                className="input input-bordered w-full  placeholder:text-xs bg-[#F7FAFC]"
                placeholder="****@example.com"
              />
              {type === "signup" && (
                <>
                  <label className="label">
                    <span className="label-text font-bold">Username*</span>
                    {errors.username && touched.username ? (
                      <div className="text-xs text-red-500">
                        {errors.username}
                      </div>
                    ) : null}
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="input input-bordered w-full  placeholder:text-xs bg-[#F7FAFC]"
                    placeholder="username"
                  />
                </>
              )}
              <label className="label">
                <span className="label-text font-bold">Password*</span>
                {errors.password && touched.password ? (
                  <div className="text-xs text-red-500">
                    Password must be at least 8 characters?
                  </div>
                ) : null}
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full  placeholder:text-xs bg-[#F7FAFC] flex-1"
                  placeholder="********"
                />
                <Image
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? "/svgs/view.svg" : "/svgs/hide.svg"}
                  alt="view"
                  width={20}
                  height={20}
                  className="absolute top-2/4 transform -translate-y-2/4 right-2 cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={() =>
                type === "signup"
                  ? handleSignUpSubmition(values)
                  : handleSignInSubmition(values)
              }
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-black px-10 mx-auto py-3 hover:bg-blue-500/90 rounded-lg flex shadow-blue-400 items-center space-x-2 mt-10 shadow-lg cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  {" "}
                  <Image
                    src="/svgs/spinner.svg"
                    alt="auth-spinner"
                    width={25}
                    height={25}
                    className="animate-spin"
                  />
                  <label
                    htmlFor="signin"
                    className={`${merriweather_Sans.className} font-bold text-xs cursor-pointer text-white`}
                  >
                    {type === "signup" ? "Signing Up" : "Signing In"}
                  </label>
                </>
              ) : (
                <>
                  <Image
                    src="/svgs/sign-up.svg"
                    alt="auth-hero"
                    width={25}
                    height={25}
                  />
                  <label
                    htmlFor="signin"
                    className={`${merriweather_Sans.className} font-bold text-xs cursor-pointer text-white`}
                  >
                    {type === "signup" ? "Sign up" : "Sign in"} with credentials
                  </label>
                </>
              )}
            </button>
          </FormConponent>
        )}
      </Formik>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Form;
