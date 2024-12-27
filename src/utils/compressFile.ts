import imageCompression from "browser-image-compression";

const compressFile = async (e: any): Promise<File | null> => {
  const imageFile = e.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressFile = await imageCompression(imageFile, options);
    return compressFile;
  } catch (error) {
    console.log("Compression error:", error);
    return null;
  }
};
