import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const worksDirectory = path.join(process.cwd(), 'works');

// 작품 데이터의 타입을 정의합니다. (성별 gender 추가됨)
export interface WorkData {
  id: string;
  title: string;
  date: string;
  image: string;
  link: string;
  summary: string;
  genres: string[];
  gender?: string; // 👈 성별 추가 (선택사항)
}

export function getSortedWorksData(): WorkData[] {
  // works 폴더가 없으면 빈 배열 반환 (에러 방지)
  if (!fs.existsSync(worksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worksDirectory);
  const allWorksData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(worksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      // 마크다운 파일의 내용을 데이터로 변환
      ...(matterResult.data as { 
        title: string; 
        date: string; 
        image: string; 
        link: string; 
        summary: string; 
        genres: string[];
        gender?: string; // 👈 데이터를 읽어올 때도 성별 포함
      }),
    };
  });

  // 날짜순 정렬 (최신순)
  return allWorksData.sort((a, b) => (a.date < b.date ? 1 : -1));
}