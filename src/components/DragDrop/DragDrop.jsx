import React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function DragDrop({
  handleDrop,
  handleDragOver,
  handleFileSelect,
  handleImageUpload,
}) {
  return (
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
      <input
        type="file"
        accept="image/*"
        multiple
        id="file-input"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default DragDrop;
