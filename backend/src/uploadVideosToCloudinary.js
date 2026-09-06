import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videosToUpload = [
  // Homepage Top Hero Videos
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepage/hero.mp4'),
    publicId: 'ssil_hero_video_1',
    key: 'hero_1'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepage/video-2.mp4'),
    publicId: 'ssil_hero_video_2',
    key: 'hero_2'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepage/video-3.mp4'),
    publicId: 'ssil_hero_video_3',
    key: 'hero_3'
  },
  // Homepage Advertisement / Media Showcase Videos
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo1.mp4'),
    publicId: 'ssil_ad_video_1',
    key: 'ad_1'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo2.mp4'),
    publicId: 'ssil_ad_video_2',
    key: 'ad_2'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo3.mp4'),
    publicId: 'ssil_ad_video_3',
    key: 'ad_3'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo4.mp4'),
    publicId: 'ssil_ad_video_4',
    key: 'ad_4'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo5.mp4'),
    publicId: 'ssil_ad_video_5',
    key: 'ad_5'
  },
  {
    localPath: path.resolve(__dirname, '../../frontend/public/videos/homepageadvertisementVideo6.mp4'),
    publicId: 'ssil_ad_video_6',
    key: 'ad_6'
  },
];

async function uploadAllVideos() {
  console.log('--- Starting Cloudinary Video Upload ---');
  const results = {};

  for (const item of videosToUpload) {
    if (!fs.existsSync(item.localPath)) {
      console.warn(`[Skip] File not found: ${item.localPath}`);
      continue;
    }

    console.log(`Uploading ${item.publicId} (${path.basename(item.localPath)})...`);
    try {
      const res = await cloudinary.uploader.upload(item.localPath, {
        resource_type: 'video',
        public_id: item.publicId,
        overwrite: true,
        chunk_size: 6000000, // 6MB chunks for reliable video upload
      });

      console.log(`[Success] ${item.publicId} -> ${res.secure_url}`);
      results[item.key] = {
        publicId: item.publicId,
        url: res.secure_url,
        duration: res.duration,
        format: res.format,
        bytes: res.bytes,
      };
    } catch (err) {
      console.error(`[Error] Failed to upload ${item.publicId}:`, err);
    }
  }

  const outputPath = path.resolve(__dirname, '../../frontend/data/cloudinary-videos.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nAll video mapping saved to: ${outputPath}`);
}

uploadAllVideos().catch(console.error);
