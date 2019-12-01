import React, { useState } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import ImageMode from "./components/ImageMode";
import ProjectsSummary from "./components/ProjectsSummary";
import SettingsHelp from "./components/SettingsHelp";
import Help from "./components/Help";

import gateway from "./utils/gateway";

export default () => {
  const [currentPage, setCurrentPage] = useState("projects");
  const [selectedProjectVersion, setSelectedProjectVersion] = useState(
    undefined
  );

  const onHelp = () => setCurrentPage("help");
  const loadProjectList = () => setCurrentPage("projects");
  const loadProjectVersion = projectVersionArn => {
    setSelectedProjectVersion(projectVersionArn);
    setCurrentPage("image");
  };

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        onHelp={onHelp}
        loadProjectList={loadProjectList}
      />
      <Container>
        <SettingsHelp show={!window.rekognitionSettings} />
        {currentPage === "projects" && (
          <ProjectsSummary
            gateway={gateway}
            onVersionClick={loadProjectVersion}
          />
        )}
        {currentPage === "help" && <Help />}
        {currentPage === "image" && (
          <ImageMode
            gateway={gateway}
            projectVersionArn={selectedProjectVersion}
          />
        )}
      </Container>
    </div>
  );
};
