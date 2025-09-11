import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
import { AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_ID2, AWS_ENDPOINT_URL, AWS_ENDPOINT_URL2, AWS_REGION, AWS_REGION2, AWS_SECRET_ACCESS_KEY, AWS_SECRET_ACCESS_KEY2, S3_BUCKET_NAME } from './env.js';
// config เดียวกับ putObject
const awsConfig = new AWSConfig({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    endpoint: AWS_ENDPOINT_URL,
    forcePathStyle: true,
});
// const awsConfig = new AWSConfig({
//     region: AWS_REGION2,
//     accessKeyId: AWS_ACCESS_KEY_ID2,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY2,
//     endpoint: AWS_ENDPOINT_URL2,
//     forcePathStyle: true,
// });
const s3 = new S3Client(awsConfig);

// ---------- function listObjects ----------
export async function listObjects(bucketName) {
    try {
        const res = await s3.listObjects(bucketName);
        //console.log(`Objects in ${bucketName}: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(`ListObjects error: ${err}`);
    }
}
