import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";

export const Ytplays = ({ ytvideo }) => {
  return (
    <div>
      {ytvideo?.map((ytvideos) => (
        <div>
          <YouTubeEmbed
            url={ytvideos.src}
            width={530}
            height={480}
            playing={true}
          />
        </div>
      ))}
    </div>
  );
};
