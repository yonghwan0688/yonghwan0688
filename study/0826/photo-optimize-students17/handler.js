const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const Sharp = require("sharp");

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-northeast-2",
});

exports.optimize = async (event) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const destBucket = process.env.DEST_BUCKET;
  const destKey = `optimized-${srcKey}`;

  try {
    const getObjectParams = {
      Bucket: srcBucket,
      Key: srcKey,
    };

    const originalImageResponse = await s3Client.send(
      new GetObjectCommand(getObjectParams)
    );
    const originalImageBuffer = Buffer.concat(
      await originalImageResponse.Body.toArray()
    );

    const optimizedImage = await Sharp(originalImageBuffer)
      .resize(800, 600)
      .jpeg({ quality: 80 })
      .toBuffer();

    const putObjectParams = {
      Bucket: destBucket,
      Key: destKey,
      Body: optimizedImage,
      ContentType: "image/jpeg",
    };

    await s3Client.send(new PutObjectCommand(putObjectParams));

    console.log(`Optimized image saved to s3://${destBucket}/${destKey}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Image optimized and saved to s3://${destBucket}/${destKey}`,
      }),
    };
  } catch (error) {
    console.error("Error optimizing image:", error);
    throw error;
  }
};
