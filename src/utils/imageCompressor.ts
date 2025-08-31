import imageCompression, { Options } from "browser-image-compression";
import { toast } from "react-toastify";

const defaultOptions: Options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const compressImage = async (
  file: File,
  customOptions?: Partial<Options>
): Promise<File | undefined> => {
  const options = { ...defaultOptions, ...customOptions };

  try {
    return await imageCompression(file, options);
  } catch (err) {
    console.error(
      `Error compressing image "${file.name}" (${file.size} bytes):`,
      err
    );
    toast.error("Something went wrong while compressing your image.");
  }
};

export const compressImages = async (files: File[]) => {
  const compressedFiles = await Promise.all(
    files.map((file) => compressImage(file))
  );

  return compressedFiles;
};
