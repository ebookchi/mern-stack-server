import s3client from "@/cloud/aws";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { File } from "formidable";
import fs from "fs";

export const uploadAvatarToAws = async (
  file: File,
  uniqueFileName: string,
  avatarId: string
) => {
  const bucketName = "ebookchi-public";

  //remove the previous image from s3 if exists
  if (avatarId) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: avatarId,
    });
    await s3client.send(deleteCommand);
  }

  //upload the image to aws s3
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueFileName,
    Body: fs.readFileSync(file.filepath),
  });
  const imageUrl = await s3client.send(putCommand);

  return {
    id: uniqueFileName,
    url: `https://${bucketName}.s3.amazonaws.com/${uniqueFileName}`,
  };
};
