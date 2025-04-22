import React from "react";

const PageTitle = ({title, desc}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-[#04D2D2]">{title}</h1>
      <p className="text-sm text-gray-300 mt-1">
        {desc}
      </p>
    </div>
  );
};

export default PageTitle;
