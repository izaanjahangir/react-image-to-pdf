import { useState } from "react";
import { Container, Button } from "reactstrap";
import { FileDrop } from "react-file-drop";

import DropGif from "./assets/drop.gif";
import "./app.css";

function App() {
  const [isDragging, setIsDragging] = useState(false);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  const endDragging = () => {
    setIsDragging(false);
  };

  const handleOnFrameDragEnter = () => {
    startDragging();
  };

  const handleOnFrameDragLeave = () => {
    endDragging();
  };

  const handleFrameDrop = () => {
    endDragging();
  };

  const handleDrop = async (files) => {
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const string = await blobToBase64(files[0]);
      images.push(string);
    }

    endDragging();
  };

  return (
    <Container className="app-container">
      <FileDrop
        onFrameDragEnter={handleOnFrameDragEnter}
        onFrameDragLeave={handleOnFrameDragLeave}
        onFrameDrop={handleFrameDrop}
        onDrop={handleDrop}
      >
        <div className="app-upload-container">
          {isDragging ? (
            <div className="dragging-container">
              <img src={DropGif} alt="drop" />
            </div>
          ) : (
            <>
              <h3>Upload images to convert them into pdf</h3>
              <input
                type="file"
                id="images-input"
                style={{ display: "none" }}
              />

              <Button tag="label" htmlFor="images-input" className="mt-2">
                Upload Images
              </Button>

              <h3 className="mt-2">OR</h3>
              <h3 className="mt-2">Drag and drop images here</h3>
            </>
          )}
        </div>
      </FileDrop>
    </Container>
  );
}

export default App;
