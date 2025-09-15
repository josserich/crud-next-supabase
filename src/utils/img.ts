// validasi ekstensi image
const validateExt = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  return validTypes.includes(file.type);
};

// convert File ke base64
const getImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (typeof base64 === "string") {
        resolve(base64);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export { validateExt, getImageBase64 };
