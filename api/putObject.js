
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
import crypto from 'k6/crypto';

// กำหนด config จาก environment variables
const awsConfig = new AWSConfig({
    region: "us-east-1",
    accessKeyId: "xfJm1oGpEdvNHVx0pNXr",
    secretAccessKey: "unEcVjXtmSpLUwDCobG5zKV1vLD4d6lmbUK7i8t3",
    endpoint: "https://inet-s3-object-gw-c.inet.co.th",
});

const s3 = new S3Client(awsConfig);
const bucketName = __ENV.S3_BUCKET_NAME || 'test-zte';
const fileSizeBytes = __ENV.FILE_SIZE_BYTES ? parseInt(__ENV.FILE_SIZE_BYTES) : 1024 * 1024; // default 1MB

export async function putObject() {
    // สร้าง key แบบสุ่มไม่ซ้ำ
    const objectKey = `simple-put-${__VU}-${__ITER}.bin`;

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
