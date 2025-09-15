function appendFormData(fd: FormData, key: string, value: unknown) {
  if (value instanceof File) {
    fd.append(key, value);
  } else {
    fd.append(key, String(value));
  }
}
export default appendFormData;
