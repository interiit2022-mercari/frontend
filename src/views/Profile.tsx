import React from "react";
import { useHistory } from "react-router";
import ProfileImage from "../component/ProfileImage";
import TitleHeader from "../component/TitleHeader";
import { useAuth } from "../hooks/Auth";

export default function Profile() {
  let history = useHistory();

  const auth = useAuth();

  console.log(auth?.user);

  return (
    <div className="main_content">
      <TitleHeader title="Profile" role="Patient" />
      <div className="user_panel">
        <ProfileImage size={128} name={auth?.user?.name || "User"} />
        <div className="name">{auth?.user?.name}</div>
        <button
          className="button small default"
          onClick={(e) => {
            auth?.signout(() => {
              history.push("/");
            });
          }}
        >
          Signout
        </button>
      </div>
    </div>
  );
}
