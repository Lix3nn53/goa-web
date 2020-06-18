import * as Yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024; //5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "application/pdf",
];

const testSize = (value) => {
  if (!value) return false;

  return value && value.size <= FILE_SIZE;
};

const testFormat = (value) => {
  if (!value) return false;

  return value && SUPPORTED_FORMATS.includes(value.type);
};

export default Yup.mixed()
  .required("A file is required")
  .test("fileSize", "File too large", (value) => testSize(value))
  .test("fileFormat", "Unsupported Format", (value) => testFormat(value));
