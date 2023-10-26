import React from "react";
import { MutatingDots } from "react-loader-spinner";

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <MutatingDots
        height="100"
        width="100"
        color="#32b768"
        secondaryColor="#32b768"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
