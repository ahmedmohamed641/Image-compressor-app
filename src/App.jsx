import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import "./App.css";
import Button from "@mui/material/Button";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function App() {
  const [compressedImages, setCompressedImages] = useState([]);
  const [imageSizes, setImageSizes] = useState([]);
  const [progresses, setProgresses] = useState([]);
  const [filesToCompress, setFilesToCompress] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setFilesToCompress(files);
    setImageSizes(
      files.map((file) => ({
        name: file.name,
        size: file.size,
        compressedSize: 0,
      }))
    );
    setProgresses(files.map(() => 0));

    await handleCompressImages(files);
  };

  const handleCompressImages = async (files) => {
    if (!files.length) return;

    try {
      const compressedFiles = await Promise.all(
        files.map((file, index) => compressImage(file, index))
      );

      setCompressedImages(
        compressedFiles.map((file) => URL.createObjectURL(file))
      );

      setImageSizes((prevSizes) =>
        prevSizes.map((original, index) => ({
          ...original,
          compressedSize:
            compressedFiles[index]?.size || original.compressedSize,
        }))
      );
    } catch (error) {
      console.error("Error compressing images:", error);
    }
  };

  const compressImage = async (file, index) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      onProgress: (progress) => {
        setProgresses((prev) => {
          const newProgresses = [...prev];
          newProgresses[index] = progress;
          return newProgresses;
        });
      },
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
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
        <div
          className="dropzone border-2 border-dashed border-sky-500 rounded-lg bg-gray-100 mb-4 pt-20 pb-20 p-10 cursor-pointer h-96 sm:w-3/5 mx-auto flex items-center flex-col justify-center gap-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CloudUploadIcon className="mr-2 text-gray w-28 h-auto" />
          <p className="text-slate-400">
            Drag and drop files here, or click the button to select files
          </p>
          <Button
            variant="outlined"
            onClick={handleFileSelect}
            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 mb-4 border-3 mt-8 border-solid border-sky-6 text-sky-600"
          >
            Select Files
          </Button>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          id="file-input"
          className="hidden"
          onChange={handleImageUpload}
        />

        <div className="mt-10">
          <h1 className="text-2xl font-bold mb-10 text-left pt-10 p-6 text-gray">
            Compressed Images:
          </h1>
          <div className="flex flex-col space-y-4">
            {compressedImages.map((image, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-sky-600 rounded-lg"
              >
                <section className="flex flex-col">
                  <div className="pl-2 items-center max-w-full flex rounded-xl justify-between">
                    <img
                      src={image}
                      alt={`Compressed ${index}`}
                      className="w-24 h-24 object-cover mb-2 rounded"
                    />
                    <p className="text-gray-600 text-xs">
                      Before: {(imageSizes[index]?.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-gray-600 text-xs">
                      After:{" "}
                      {(imageSizes[index]?.compressedSize / 1024).toFixed(2)} KB
                    </p>
                    <a
                      href={image}
                      download={`compressed_image_${index}.jpg`}
                      className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 mb-4 border-3 mt-8 border-solid border-sky-6 text-sky-600"
                    >
                      Download Compressed Image
                    </a>
                  </div>
                  <ProgressBar value={progresses[index] || 0} />
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
