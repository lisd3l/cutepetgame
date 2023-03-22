import React, { useMemo } from "react";

interface IconProps {
  name: string;
  size: number;
}

export default function Icon(props: IconProps) {
  const iconStyles = useMemo(() => {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
    };
  }, [props.size]);
  return (
    <svg style={iconStyles} fill="none">
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`#icon-${props.name}`} />
    </svg>
  );
}
