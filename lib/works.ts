import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const worksDirectory = path.join(process.cwd(), 'works');

export interface WorkData {
  id: string;
  title: string;
  date: string;
  image: string;
  link: string;
  summary: string;
  genres: string[];
}

export function getSortedWorksData(): WorkData[] {
  const fileNames = fs.readdirSync(worksDirectory);
  const allWorksData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(worksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; image: string; link: string; summary: string; genres: string[] }),
    };
  });

  return allWorksData.sort((a, b) => (a.date < b.date ? 1 : -1));
}