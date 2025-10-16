import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs"
import mime from "mime-types";
const s3Client = new S3Client({
    region : "ap-south-1",
    credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
})
export const uploadSingleFile = async(keyName,filePath)=>{
  const contentType = mime.lookup(filePath) || "application/octet-stream"; // detect type
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: keyName, 
      Body: fs.createReadStream(filePath),
      ContentType:contentType
    };
    try {
        const s3PutCommand = new PutObjectCommand(uploadParams);
        const s3Response = await s3Client.send(s3PutCommand);
        console.log(s3Response)
        return keyName
    } catch (error) {
        console.error('Error uploading file to S3:', error);
    }

}
export const uploadMultipleFile = async(files=[])=>{
    try {
      const uploadPromises = files.map((el)=>{
        return uploadSingleFile(el.filename,`${el.destination}/${el.filename}`)
      })
      const uploadPromise = Promise.all(uploadPromises)
      console.log(uploadPromise,"----uploadPromise------")
      return uploadPromise
    } catch (error) {
        console.error('Error uploading multiple files to S3:', error);
    }

}