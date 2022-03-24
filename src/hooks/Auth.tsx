import React, { useContext, createContext, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AUTH_SERVICE, BACKEND_URL } from "../constants/constants";
import { stringify } from "node:querystring";

export type registerForm_Patient = {
  name: string;
  role: string;
  phone: string;
  emergency_contact: string;
  blood_group: string;
  age: string;
  gender: string;
  NHID: string;
};

export type registerForm_Doctor = {
  name: string;
  role: string;
  phone: string;
  emergency_phone: string;
  blood_group: string;
  age: string;
  gender: string;
  medical_profession: string;
  degree: string;
  years_of_experience: string;
};

export type loginForm = {
  username: string;
  role: string;
  password: string;
  remember: string;
};

export class Patient {
  access_token: string;
  profile_image_uri: string;

  name: string;
  role: string;
  phone: string;
  emergency_contact: string;
  blood_group: string;
  age: string;
  gender: string;
  NHID: string;

  constructor(
    access_token: string,
    profile_image_uri: string,

    name: string,
    role: string,
    phone: string,
    emergency_contact: string,
    blood_group: string,
    age: string,
    gender: string,
    NHID: string
  ) {
    this.access_token = access_token;
    this.profile_image_uri = profile_image_uri;

    this.name = name;
    this.role = role;
    this.phone = phone;
    this.emergency_contact = emergency_contact;
    this.blood_group = blood_group;
    this.age = age;
    this.gender = gender;
    this.NHID = NHID;
  }
}

export class Doctor {
  access_token: string;
  profile_image_uri: string;

  name: string;
  role: string;
  phone: string;
  emergency_phone: string;
  blood_group: string;
  age: string;
  gender: string;
  medical_profession: string;
  degree: string;
  years_of_experience: string;

  constructor(
    access_token: string,
    profile_image_uri: string,

    name: string,
    role: string,
    phone: string,
    emergency_phone: string,
    blood_group: string,
    age: string,
    gender: string,
    medical_profession: string,
    degree: string,
    years_of_experience: string
  ) {
    this.access_token = access_token;
    this.profile_image_uri = profile_image_uri;

    this.name = name;
    this.role = role;
    this.phone = phone;
    this.emergency_phone = emergency_phone;
    this.blood_group = blood_group;
    this.age = age;
    this.gender = gender;
    this.medical_profession = medical_profession;
    this.degree = degree;
    this.years_of_experience = years_of_experience;
  }
}

const authConnector = {
  isAuthenticated: false,
  login(
    data: loginForm,
    cb: (user: Patient | Doctor) => void,
    cbe: (e: AxiosError) => void
  ) {
    authConnector.isAuthenticated = true;
    axios
      .post(`${AUTH_SERVICE}/login`, data)
      .then((response) => {
        // console.log(response);
        cb(response.data);
      })
      .catch(cbe);
  },
  signout(cb: () => void) {
    authConnector.isAuthenticated = false;
    cb();
  },
  registerPatient(
    data: registerForm_Patient,
    cb: (response: AxiosResponse) => void
  ) {
    authConnector.isAuthenticated = false;

    // TODO: update url
    axios
      .post(`${AUTH_SERVICE}/register`, data)
      .then((response) => {
        // console.log(response);
        cb(response);
      })
      .catch((error) => {
        // console.log(error.response);
        cb(error.response);
      });
  },
  registerDoctor(
    data: registerForm_Doctor,
    cb: (response: AxiosResponse) => void
  ) {
    authConnector.isAuthenticated = false;

    // TODO: update url
    axios
      .post(`${AUTH_SERVICE}/register`, data)
      .then((response) => {
        // console.log(response);
        cb(response);
      })
      .catch((error) => {
        // console.log(error.response);
        cb(error.response);
      });
  },
};

export type AuthContextType = {
  user: Patient | Doctor | null;
  login: (
    data: loginForm,
    cb: () => void,
    cbe: (e: AxiosError) => void
  ) => void;
  signout: (cb: () => void) => void;
  registerPatient: (
    data: registerForm_Patient,
    cb: (response: AxiosResponse) => void
  ) => void;
  registerDoctor: (
    data: registerForm_Doctor,
    cb: (response: AxiosResponse) => void
  ) => void;
  authHeader: () => AxiosRequestConfig;
};

export const authContext = createContext<AuthContextType | null>(null);

function ProvideAuth(props: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<Patient | Doctor | null>(
    getUserFromLocalStorage()
  );

  const login = (
    data: loginForm,
    cb: () => void,
    cbe: (e: AxiosError) => void
  ) => {
    return authConnector.login(
      data,
      async (user) => {
        setUser(user);
        const { data } = await axios.get(`${AUTH_SERVICE}/details`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("tokens", JSON.stringify(user));
        cb();
      },
      cbe
    );
  };

  const signout = (cb: () => void) => {
    return authConnector.signout(() => {
      setUser(null);
      localStorage.removeItem("user");
      cb();
    });
  };

  const registerPatient = (
    data: registerForm_Patient,
    cb: (response: AxiosResponse) => void
  ) => {
    return authConnector.registerPatient(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const registerDoctor = (
    data: registerForm_Doctor,
    cb: (response: AxiosResponse) => void
  ) => {
    return authConnector.registerDoctor(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const authHeader = (): AxiosRequestConfig => {
    if (user !== null) {
      return {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      };
    }
    return {};
  };

  return {
    user,
    login,
    signout,
    registerPatient,
    registerDoctor,
    authHeader,
  };
}

function getUserFromLocalStorage(): Patient | Doctor | null {
  let userJSON = localStorage.getItem("user");
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
}

export { ProvideAuth, useAuth };
