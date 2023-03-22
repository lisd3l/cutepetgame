import React, { useMemo } from "react";
import IconsMap from "../assets/icons.json";

export default function IconSprite() {
  const IconKeys = useMemo(() => {
    return Object.keys(IconsMap);
  }, []);

  return (
    <svg
      width="0"
      height="0"
      style={{ display: "none" }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >{IconKeys.map(key =>
        <symbol
          key={key}
          id={`icon-${key}`}
          viewBox="0 0 24 24"
          dangerouslySetInnerHTML={{ __html: IconsMap[key] }}
        />
      )
    }</svg>
  );
}
