import React from "react";
import { Composition } from "remotion";
import { ClinicPR } from "./ClinicPR";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClinicPR"
        component={ClinicPR}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
