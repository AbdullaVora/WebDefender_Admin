import React from "react";
import ToolBox from "../../../components/ToolBox";
import { tools } from "../../../data/ToolsContainer.json";
import PageTitle from "../../../components/PageTitle";
const Tools_Main = () => {
  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <div className="main-cintainers">
        <PageTitle
          title="Tools for Attacks and Scanning"
          desc="Identify and fix security vulnerabilities before they become threats. Stay protected with advanced vulnerability scanning solutions!"
        />
        {/* <div className="flex flex-wrap">
          {tools.map((tool, index) => (
            <ToolBox
              key={index}
              title={tool.title}
              description={tool.description}
              subtool={tool.subtool}
            />
          ))}
        </div> */}
         <div className="flex flex-wrap -mx-3">
        {tools.map((tool, index) => (
          <ToolBox
            key={index}
            title={tool.title}
            description={tool.description}
            subtool={tool.subtool}
            icon={tool.icon}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Tools_Main;
