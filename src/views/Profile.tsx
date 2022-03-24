import Avatar from "boring-avatars";
import React from "react";
import { useHistory } from "react-router";
import TitleHeader from "../component/TitleHeader";
import { useAuth } from "../hooks/Auth";

export default function Profile() {
  let history = useHistory();

  const auth = useAuth();

  console.log(auth?.user);

  return (
    <div className="main_content">
      <TitleHeader title="Profile" role={auth?.user?.role || "Patient"} />
      <div className="user_panel">
        <Avatar
          size={128}
          name={auth?.user?.name}
          variant="marble"
          colors={[
            "#feffbf",
            "#bebf60",
            "#ffffe6",
            "#feff80",
            "#f2ffbf",
            "#abbf60",
            "#faffe6",
            "#e4ff80",
            "#fff9bf",
            "#bfb660",
            "#fffde6",
            "#fff380",
            "#ebbfff",
            "#a160bf",
            "#f7e6ff",
            "#d780ff",
          ]}
        />
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
