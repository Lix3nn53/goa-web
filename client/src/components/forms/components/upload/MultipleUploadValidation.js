import * as Yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024; //5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
];

const testSize = (array) => {
  if (!array) return false;

  for (var i = 0; i < array.length; i++) {
    const value = array[i];
    const result = value && value.size <= FILE_SIZE;

    if (!result) return false;
  }

  return true;
};

const testFormat = (array) => {
  if (!array) return false;

  for (var i = 0; i < array.length; i++) {
    const value = array[i];
    const result = value && SUPPORTED_FORMATS.includes(value.type);

    if (!result) return false;
  }

  return true;
};

export default Yup.mixed()
  .required("A file is required")
  .test("fileSize", "File too large", (value) => testSize(value))
  .test("fileFormat", "Unsupported Format", (value) => testFormat(value));
