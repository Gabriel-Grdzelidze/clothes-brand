import { NextResponse } from "next/server";
import { S3Client , PutObjectCommand } from "@aws-sdk/client-s3";




const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})


async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log("Preparing to upload file:", fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpeg",  // Ensure this matches the file type
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("File uploaded successfully to S3 with key:", params.Key);
    return `${fileName}-${Date.now()}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Error uploading file to S3.");
  }
}

export async function POST(request) {
  try {
    console.log("Received request to upload file...");
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("No file received");
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    console.log("File received:", file.name);

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    console.log("File uploaded successfully to S3. File name:", fileName);

    return NextResponse.json({ success: true, fileUrl: `https://your-s3-bucket-url/${fileName}` }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
