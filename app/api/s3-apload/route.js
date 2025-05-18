import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(fileBuffer, fileName) {
  const timestamp = Date.now();
  const key = `${fileName}-${timestamp}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    const uploadedUrls = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadFileToS3(buffer, file.name);
      uploadedUrls.push(url);
    }

    return NextResponse.json({ success: true, urls: uploadedUrls }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
