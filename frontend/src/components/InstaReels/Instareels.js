import React from "react";
import { Player } from "./Player";
import video from "./Videodata";
export const Instareels = () => {
  return (
    <>
      <div
        style={{
          width: "300px",

          margin: " 85px auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Player video={video.instagramvideos}></Player>
      </div>
    </>
  );
};
