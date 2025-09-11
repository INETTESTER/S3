
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
import { AWS_ACCESS_KEY_ID, AWS_ACCESS_KEY_ID2, AWS_ENDPOINT_URL, AWS_ENDPOINT_URL2, AWS_REGION, AWS_REGION2, AWS_SECRET_ACCESS_KEY, AWS_SECRET_ACCESS_KEY2, S3_BUCKET_NAME } from './env.js';
import crypto from 'k6/crypto';

// กำหนด config จาก environment variables
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
const bucketName = __ENV.S3_BUCKET_NAME || 'test-zte';
const fileSizeBytes = __ENV.FILE_SIZE_BYTES ? parseInt(__ENV.FILE_SIZE_BYTES) : 1024 * 1024; // default 1MB

export async function putObject() {
    // สร้าง key แบบสุ่มไม่ซ้ำ
    const objectKey = `loadtest/simple-put-${__VU}-${__ITER}.bin`;

    // สร้างไฟล์แบบ random bytes
    const fileData = crypto.randomBytes(fileSizeBytes);

    try {
        //console.log(`Uploading ${objectKey} to bucket ${bucketName} ...`);
        const res = await s3.putObject(bucketName, objectKey, fileData);
        //console.log(`Upload complete: ${objectKey}`);
        return res
    } catch (err) {
        console.error(`PUT error: ${err}`);
    }
}
