import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import ProgressBar from "../ProgressBar/ProgressBar";

function ImageCompressor({ filesToCompress, setCompressedImages }) {
  const [imageSizes, setImageSizes] = useState([]);
  const [progresses, setProgresses] = useState([]);

  const handleCompressImages = async () => {
    if (!filesToCompress.length) return;

    setImageSizes(
      filesToCompress.map((file) => ({
        name: file.name,
        size: file.size,
        compressedSize: 0,
      }))
    );
    setProgresses(filesToCompress.map(() => 0));

    try {
      const compressedFiles = await Promise.all(
        filesToCompress.map((file, index) => compressImage(file, index))
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

  React.useEffect(() => {
    if (filesToCompress.length > 0) {
      handleCompressImages();
    }
  }, [filesToCompress]);

  return (
    <div className="flex flex-col space-y-4">
      {filesToCompress.length > 0 && (
        <h1 className="text-2xl font-bold mb-10 text-left pt-10 p-6 text-gray">
          Compressed Images:
        </h1>
      )}
      {filesToCompress.map((file, index) => (
        <div key={index} className="mb-4 p-4 border border-sky-600 rounded-lg">
          <section className="flex flex-col">
            <div className="pl-2 items-center max-w-full flex rounded-xl justify-between">
              <img
                src={URL.createObjectURL(file)}
                alt={`Compressed ${index}`}
                className="w-24 h-24 object-cover mb-2 rounded"
              />
              <p className="text-gray-600 text-xs">
                Before: {(file.size / 1024).toFixed(2)} KB
              </p>
              <p className="text-gray-600 text-xs">
                After: {(imageSizes[index]?.compressedSize / 1024).toFixed(2)}{" "}
                KB
              </p>
              <a
                href={URL.createObjectURL(file)}
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
  );
}

export default ImageCompressor;
