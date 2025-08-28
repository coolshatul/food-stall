import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string,
    },
});

const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME as string;

export const updateConfigInS3 = async (configData: object) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "config.json",
        Body: JSON.stringify(configData, null, 2),
        ContentType: "application/json",
    });
    return s3.send(command);
};

export const updateMenuInS3 = async (menuData: object) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "menu.json",
        Body: JSON.stringify(menuData, null, 2),
        ContentType: "application/json",
    });
    return s3.send(command);
};