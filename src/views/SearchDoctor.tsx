import axios from "axios";
import fuzzysort from "fuzzysort";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import ProfileImage from "../component/ProfileImage";
import TitleHeader from "../component/TitleHeader";
import { DOCTOR_CRUD } from "../constants/constants";
import { Doctor, useAuth } from "../hooks/Auth";

export default function SearchDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doctor[]>([]);

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

  useEffect(() => {
    if (query !== "") {
      const res = fuzzysort
        .go(query, doctors, { key: "name", allowTypo: true })
        .map((item) => item.obj);

      setResults(res);
    } else {
      setResults(doctors);
    }
  }, [query, doctors]);

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
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button small">
          <Search></Search>
        </button>
      </div>
      <div className="cards">
        {results?.map((doctor, i) => (
          <div className="card" key={i}>
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
