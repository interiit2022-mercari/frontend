import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  medicalProfession: string;
  degree: string;
  yearsOfExperience: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function Step3({
  medicalProfession,
  degree,
  yearsOfExperience,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 3) return null;
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
      <span className="label"> Medical Profession</span>
      <input
        name="medical_profession"
        placeholder={medicalProfession}
        ref={register({ required: false })}
      />

      <span className="label"> Degree </span>
      <input
        name="degree"
        placeholder={degree}
        ref={register({ required: false })}
      />

      <span className="label"> Years of Experience </span>
      <input
        name="years_of_experience"
        placeholder={yearsOfExperience}
        ref={register({ required: false })}
      />

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span>Steps: {`${currentStep}/3`}</span>
      </div>
    </form>
  );
}
