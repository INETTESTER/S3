
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
//import { AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_ID2, AWS_ENDPOINT_URL, AWS_ENDPOINT_URL2, AWS_REGION, AWS_REGION2, AWS_SECRET_ACCESS_KEY, AWS_SECRET_ACCESS_KEY2, S3_BUCKET_NAME } from './env.js';
import crypto from 'k6/crypto';
import { AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from './env.js';

const awsConfig = new AWSConfig({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    endpoint: AWS_ENDPOINT_URL,
    forcePathStyle: true,
});
const s3 = new S3Client(awsConfig);
const bucketName = __ENV.S3_BUCKET_NAME || 'loadtest-lenovo-object-b';
const fileSizeBytes = __ENV.FILE_SIZE_BYTES ? parseInt(__ENV.FILE_SIZE_BYTES) : 1024 * 1024; // default 1MB

export async function putObject(cid) {
    // สร้าง key แบบสุ่มไม่ซ้ำ
    const objectKey = `loadtest5/simple-put-${__VU}-${__ITER}${cid}.bin`;

    // สร้างไฟล์แบบ random bytes
    const fileData = crypto.randomBytes(fileSizeBytes);

    try {
        //console.log(`Uploading ${objectKey} to bucket ${bucketName} ...`);
        const res = await s3.putObject(S3_BUCKET_NAME, objectKey, fileData);
        //console.log(`Upload complete: ${objectKey}`);
        return res
    } catch (err) {
        console.error(`PUT error: ${err}`);
    }
}
