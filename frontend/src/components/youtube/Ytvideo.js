import React from "react";
import { Ytplays } from "./Ytplays";
import ytvideo from "./Ytdata";

export const Ytvideo = () => {
  return (
    <>
      <div
        style={{
          width: "500px",

          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Ytplays ytvideo={ytvideo.ytvideos}></Ytplays>
      </div>
    </>
  );
};
