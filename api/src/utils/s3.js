import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

export async function uploadToS3(localFilePath, s3Key) {
  try {
    const fileStream = fs.createReadStream(localFilePath);
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: s3Key,
      Body: fileStream,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
  } catch (error) {
    console.error(" S3 upload error", error);
    throw error;
  }
}
