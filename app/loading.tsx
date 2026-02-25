import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4F39F6"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
