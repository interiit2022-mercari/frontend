import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import {
  useAuth,
  registerForm_Patient,
  registerForm_Doctor,
} from "../hooks/Auth";
import StepOne from "../component/signupForms/StepOne";
import { stat } from "node:fs";
import { useForm } from "react-hook-form";
import StepTwo from "../component/signupForms/StepTwo";
import StepThree from "../component/signupForms/StepThree";
import Step2 from "../component/signupForms/Step2";
import Step3 from "../component/signupForms/Step3";
import { useHistory } from "react-router";
import toast from "react-hot-toast";
import { API_IMGBB } from "../constants/constants";
import * as Icon from "react-feather";

function Register() {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const [step, setStep] = useState(1);
  let history = useHistory();
  const [state, setState] = useState({
    // non user specific
    name: "Name",
    role: "patient",
    email: "Email Address",
    username: "Username",
    password: "Password",
    profile_image_uri: "",
    phone: "+91 XXXX XX XXXX",
    blood_group: "Blood Group",
    age: "Age",
    gender: "Gender",

    // for Patients only
    NHID: "NHID",
    emergency_contact: "+91 XXXX XX XXXX",

    // for Doctors only
    emergency_phone: "+91 XXXX XX XXXX",
    medical_profession: "Medical Profession",
    degree: "Degree",
    years_of_experience: "Years of Experience",
  });

  const onSubmit = () => {
    setIsLoading(true);

    // TODO: random image generator service here
    state.profile_image_uri = "";

    if (state.role === "patient") {
      const {
        medical_profession,
        degree,
        years_of_experience,
        profile_image_uri,
        emergency_phone,
        ...data
      } = state;
      console.log(data);

      auth?.registerPatient(data, (response: AxiosResponse) => {
        // console.log("registration succex");
        setIsLoading(false);

        if (response.status === 201) {
          toast.success("Successfully registered, Please login");

          history.push("/login");
        } else {
          setMessage("An error occured, try again later.");
        }
      });
    } else {
      const { NHID, emergency_contact, ...data } = state;

      console.log(data);

      auth?.registerDoctor(data, (response: AxiosResponse) => {
        // console.log("registration succex");
        setIsLoading(false);

        toast.success("Successfully registered, Please login");

        history.push("/login");

        if (response === undefined || response.status === 500)
          setMessage("Server is down, please try again later");
        else if (response.status === 200) setIsRegistered(true);
        else setMessage(response.data.message);
      });
    }
  };

  const handleNextSubmit = (
    data: Partial<{
      name: string;
      username: string;
      password: string;
      phone: string;
      WAcontact: string;
      type: string;
      industry_type: string;
      account_number: string;
      branch_code: string;

      name_SHG: string;
      production_cap: string;
      member_name: string;
      member_contact: string;
      member_aadhar: string;
      skill: string;

      address: string;
      product_sold: string;
    }>
  ) => {
    setState({
      ...state,
      ...data,
    });

    handleNext();
  };

  const handleTypeChange = (type: string) => {
    setState({
      ...state,
      role: type,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="authform main_content register">
      <div className="form">
        <div className="title">
          <h1>Signup</h1>
          {step > 1 ? <p>{state.role}</p> : null}
        </div>
        <div className="error">{message}</div>
        <StepOne
          name={state.name}
          username={state.username}
          email={state.username}
          password={state.password}
          type={state.role}
          currentStep={step}
          handleNextSubmit={handleNextSubmit}
          handleTypeChange={handleTypeChange}
        />

        {state.role === "patient" ? (
          <>
            <StepTwo
              phone={state.phone}
              contact={state.emergency_contact}
              gender={state.gender}
              age={state.age}
              type={state.role}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <StepThree
              NHID={state.NHID}
              type={state.role}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}

        {state.role === "doctor" ? (
          <>
            <Step2
              phone={state.phone}
              contact={state.emergency_phone}
              gender={state.gender}
              age={state.age}
              type={state.role}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <Step3
              medicalProfession={state.medical_profession}
              degree={state.degree}
              yearsOfExperience={state.years_of_experience}
              type={state.role}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="buttons">
            {step > 1 && step < 4 ? (
              <input
                type="button"
                className="back"
                value="Back"
                onClick={handleBack}
              />
            ) : (
              ""
            )}

            {step === 4 ? (
              <>
                <h3> Your details won't be shared to any third party. </h3>
                {/* <span className="label"> OTP </span>
                <input
                  name="otp"
                  placeholder="OTP"
                  ref={register({ required: false })}
                /> */}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? <Icon.Loader className="loader" /> : "Accept"}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </form>

        <hr />
        <span>If you have an account, please </span>
        <a className="button back" href="/login" rel="noreferrer noopener">
          Login
        </a>
      </div>
    </div>
  );
}

export default Register;
