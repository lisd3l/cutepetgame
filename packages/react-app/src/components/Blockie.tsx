import React from "react";
import Blockies, { IdenticonProps } from "react-blockies";

// provides a blockie image for the address using "react-blockies" library

export default function Blockie(props: IdenticonProps) {
  const { seed, ...rest } = props;
  if (!seed || typeof seed.toLowerCase !== "function") {
    return <span />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Blockies seed={seed.toLowerCase()} {...rest} />;
}
