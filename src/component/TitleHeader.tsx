import React from "react";
import * as Icon from "react-feather";
export default function TitleHeader(props: { title: string; role: string }) {
  return (
    <div className="title_header">
      <h1>{props.title}</h1>
      <div className="role">{props.role}</div>
      <div className="icon">
        <Icon.Bell></Icon.Bell>
      </div>
    </div>
  );
}
