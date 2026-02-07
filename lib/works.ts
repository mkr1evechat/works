import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const worksDirectory = path.join(process.cwd(), 'works');
const publicImagesDirectory = path.join(process.cwd(), 'public', 'images');

export interface WorkData {
  id: string;
  title: string;
  date: string;
  image: string; // 대표 이미지 (기존 유지)
  link: string;
  summary: string;
  genres: string[];
  gender?: string;
  galleryImages: string[]; // 👈 새로 추가된 갤러리 이미지 목록
}

export function getSortedWorksData(): WorkData[] {
  if (!fs.existsSync(worksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worksDirectory);
  const allWorksData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(worksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // --- 갤러리 이미지 자동 스캔 로직 ---
    let galleryImages: string[] = [];
    const workImageFolder = path.join(publicImagesDirectory, id);

    // 1. 해당 작품 ID로 된 폴더가 있는지 확인
    if (fs.existsSync(workImageFolder)) {
      // 2. 폴더 안의 파일들을 읽어서 이미지 파일만 골라냄
      const files = fs.readdirSync(workImageFolder);
      galleryImages = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // 이미지 확장자만 필터링
        .map(file => `/images/${id}/${file}`); // 웹 경로로 변환
    }
    // ----------------------------------

    return {
      id,
      ...(matterResult.data as { 
        title: string; 
        date: string; 
        image: string; 
        link: string; 
        summary: string; 
        genres: string[];
        gender?: string; 
      }),
      galleryImages, // 👈 데이터에 추가
    };
  });

  return allWorksData.sort((a, b) => (a.date < b.date ? 1 : -1));
}