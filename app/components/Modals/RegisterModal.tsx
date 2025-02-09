"use client";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data onSubmit", data);
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Successfully Registered!");
        registerModal.onClose();
      })
      .catch((errors) => {
        toast.error("Something went wrong");
        console.log(errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Create Account" subtitle="Sign up to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        required={true}
        errors={errors}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        required={true}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        required={true}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button
        label="Continue with Google"
        disabled={isLoading}
        outline={true}
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
        small={true}
      />
      <Button
        label="Continue with Github"
        disabled={isLoading}
        outline={true}
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
        small={true}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            // onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      body={body}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
    />
  );
};

export default RegisterModal;
