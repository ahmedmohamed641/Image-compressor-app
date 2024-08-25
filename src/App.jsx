import React, { useState } from "react";
import Container from "@mui/material/Container";
import DragDrop from "./components/DragDrop/DragDrop";
import ImageCompressor from "./components/ImageCompressor/ImageCompressor";

function App() {
  const [compressedImages, setCompressedImages] = useState([]);
  const [filesToCompress, setFilesToCompress] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setFilesToCompress(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload({ target: { files: e.dataTransfer.files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = () => {
    document.getElementById("file-input").click();
  };

  return (
    <Container maxWidth="xl" className="text-center p-10">
      <div className="App">
        <h2 className="text-3xl font-bold mb-10 text-gray">
          Image Compressor App
        </h2>
        <DragDrop
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleFileSelect={handleFileSelect}
          handleImageUpload={handleImageUpload}
        />
        <ImageCompressor
          filesToCompress={filesToCompress}
          setCompressedImages={setCompressedImages}
        />
      </div>
    </Container>
  );
}

export default App;
