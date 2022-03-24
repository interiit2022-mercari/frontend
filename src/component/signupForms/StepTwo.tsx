import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  gender: string;
  age: string;
  phone: string;
  contact: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function StepTwo({
  gender,
  age,
  phone,
  contact,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 2) return null;

  return (
    <form onSubmit={handleSubmit(handleNextSubmit)}>
      <span className="label"> Phone Number </span>
      <input
        name="phone"
        placeholder={phone}
        ref={register({ required: true })}
      />

      <span className="label"> Emergency Contact </span>
      <input
        name="emergency_contact"
        placeholder={contact}
        ref={register({ required: false })}
      />

      <span className="label"> Gender </span>
      <input
        name="gender"
        placeholder={gender}
        ref={register({ required: false })}
      />

      <span className="label"> Age </span>
      <input name="age" placeholder={age} ref={register({ required: false })} />

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span> Steps: {currentStep}/3</span>
      </div>
    </form>
  );
}
