import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
import { AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from './env.js';

const awsConfig = new AWSConfig({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    endpoint: AWS_ENDPOINT_URL,
    forcePathStyle: true,
});
const s3 = new S3Client(awsConfig);


// ---------- delete ----------
export async function deleteObject(cid) {
    const objectKey = `upload/simple-put-${__VU}-${__ITER}${cid}.bin`;
    try {
        const res = await s3.deleteObject(S3_BUCKET_NAME, objectKey);
        //console.log(`🗑️ Deleted: ${objectKey}`);
        return res;
    } catch (err) {
        console.error(`DeleteObject error: ${err}`);
    }
}

