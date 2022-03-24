import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  name: string;
  username: string;
  email: string;
  password: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
  handleTypeChange: (s: string) => void;
}

export default function StepOne({
  name,
  username,
  email,
  password,
  type,
  currentStep,
  handleNextSubmit,
  handleTypeChange,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 1) return null;
  // const onSubmit = (data: registerForm) => {
  //   setIsLoading(true);
  //   // console.log("Submitted Form Data: ", data);

  //   auth?.register(data, (response: AxiosResponse) => {
  //     // console.log("registration succex");
  //     setIsLoading(false);

  //     if (response === undefined || response.status === 500)
  //       setMessage('Server is down, please try again later');
  //     else if (response.status === 200) setIsRegistered(true);
  //     else setMessage(response.data.message);
  //   });
  // };

  return (
    <form onSubmit={handleSubmit(handleNextSubmit)}>
      <span className="label"> Name </span>
      <input
        name="name"
        placeholder={name}
        ref={register({ required: true })}
      />

      <span className="label"> Username </span>
      <input
        name="username"
        placeholder={username}
        ref={register({ required: true })}
      />

      <span className="label"> Email </span>
      <input
        name="email"
        placeholder={email}
        ref={register({ required: true })}
      />

      <span className="label"> Password </span>
      <input
        name="password"
        type="password"
        placeholder={password}
        ref={register({ required: true })}
      />

      <span className="label"> Type of User </span>
      <div className="types">
        <div
          className={`type ${type == "patient" && "current"}`}
          onClick={() => handleTypeChange("patient")}
        >
          Patient
        </div>
        <div
          className={`type ${type == "doctor" && "current"}`}
          onClick={() => handleTypeChange("doctor")}
        >
          Doctor
        </div>
      </div>
      {/* <input
        name='type'
        placeholder={type}
        ref={register({ required: false })}
      /> */}

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span>Steps: {`${currentStep}/3`}</span>
      </div>
    </form>
  );
}
