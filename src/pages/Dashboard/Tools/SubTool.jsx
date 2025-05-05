import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tools } from "../../../data/ToolsContainer.json";
import ToolBox from "../../../components/ToolBox";
import PageTitle from "../../../components/PageTitle";
import Swal from "sweetalert2";

const SubTool = () => {
  const { toolTitle } = useParams();
  const navigate = useNavigate()

  // Find the tool data based on the title parameter
  const toolData = tools.find((tool) => tool.title === toolTitle);

  useEffect(() => {
    if (toolTitle === "Search-Engine-Scanner") {
      Swal.fire({
        title: 'Coming Soon!!',
        text: 'This tool is under working',
        background: '#0b0f1a',
        color: '#00e0d0',
        icon: 'success',
        iconColor: '#00e0d0',
        timer: 1500, // auto close after 3 seconds
        timerProgressBar: true, // show progress bar
        showConfirmButton: false, // hide OK button
      }).then(() => {
        navigate("/tools");
      });
    }
  }, [toolTitle, navigate]);

  console.log(toolTitle)

  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <div className="main-cintainers">
        <PageTitle
          title={`${toolTitle} Subtools`}
          desc={`${toolData
            ? toolData.description
            : "No additional subtools information available for this tool."
            }`}
        />
        <div className="flex flex-wrap -mx-3">
          {/* Render subtools content here. If your toolData has a subtools array, you can map over it */}
          {toolData && toolData.subtools ? (
            toolData.subtools.map((subtool, index) => (
              <ToolBox
                key={index}
                title={subtool.title}
                description={subtool.description}
              />
            ))
          ) : (
            <p>No subtools available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubTool;
