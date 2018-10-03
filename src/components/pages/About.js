import React from "react";
//if route would have about/:id I could access id {props.match.params.id}
export default () => {
  return (
    <div>
      <h1 className="display-r">About this app</h1>
      <p className="lead">Contacts app</p>
      <p className="text-secondary">version 1.0.0</p>
    </div>
  );
};
