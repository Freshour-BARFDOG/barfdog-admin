import { Fragment } from "react";

interface TextWithBreaksProps {
  text: string;
}

export default function TextWithBreaks({ text }: TextWithBreaksProps) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
