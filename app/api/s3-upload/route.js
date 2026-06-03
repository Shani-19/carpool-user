import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const { filename, contentType, type } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Filename and contentType are required' }, { status: 400 });
    }

    // Determine the path based on file type (image or video)
    const folder = type === 'video' ? 'videos' : 'images';
    
    // Generate 16 random alphabets for the filename
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < 16; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Get file extension
    const extension = filename.split('.').pop();
    const newFilename = `${randomString}.${extension}`;
    const key = `assets/claim/${folder}/${newFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    // Generate presigned URL
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Construct public URL based on AWS_URL from .env
    const publicUrl = `${process.env.AWS_URL}/${key}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      filename: newFilename,
      key
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}
