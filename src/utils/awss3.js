import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_S3_ID,
  secretAccessKey: process.env.VUE_APP_S3_KEY
});
const BUCKET_NAME = process.env.VUE_APP_S3_BUCKET;

export function uploadFile(file, dir) {
  const params = {
    Bucket: BUCKET_NAME,
    ContentType: file.type,
    Body: file,
    Key: `${dir}/${file.name}`
  };
  return s3.upload(params).promise();
}

export default s3;
