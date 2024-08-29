import { UploadClient } from "@uploadcare/upload-client";

export const uploadFiles = async (fileList: FileList) => {
  const client = new UploadClient({
    // publicKey: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
    publicKey: "8ef2bebef913f5ba4831",
  });

  const { cdnUrl } = await client.uploadFile(fileList[0]);

  return cdnUrl;
};
