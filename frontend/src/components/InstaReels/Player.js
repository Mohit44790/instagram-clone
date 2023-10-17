import React from "react";

import { InstagramEmbed } from "react-social-media-embed";

export const Player = ({ video, index }) => {
  return (
    <div key={index}>
      {video?.map((instagramvideos) => (
        <div key={instagramvideos.id}>
          <InstagramEmbed
            url={instagramvideos.url}
            width={328}
            height={600}
            // autoplay={true}
          />
        </div>
      ))}
    </div>
  );
};
