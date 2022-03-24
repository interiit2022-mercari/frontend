import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import ProfileImage from "../component/ProfileImage";
import TitleHeader from "../component/TitleHeader";
import { DOCTOR_CRUD } from "../constants/constants";
import { Doctor, useAuth } from "../hooks/Auth";

export default function SearchDoctor() {
  const auth = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    axios
      .get(`${DOCTOR_CRUD}/doctor/all`)
      .then((res) => {
        // console.log(res);
        res.data.reverse();
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" role="Doctor"></TitleHeader>
      <div className="right_aligned">
        <p>Doctors</p>
        <button className="default small">
          Filters
          <ChevronDown></ChevronDown>
        </button>
      </div>
      <div className="search_bar">
        <input type="text" name="search" id="search" placeholder="Search" />
        <button className="button small">
          <Search></Search>
        </button>
      </div>
      <div className="cards">
        {doctors?.map((doctor, i) => (
          <div className="card">
            <div className="row">
              <ProfileImage size={40} name={doctor.name} />
              <h1>{doctor.name}</h1>
            </div>
            <p>{doctor.medical_profession}</p>
            <p>{doctor.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
