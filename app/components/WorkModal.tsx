'use client';

import { useEffect } from 'react';
import type { WorkData } from '../../lib/works';

// 닫기(X) 아이콘
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

// 링크 화살표 아이콘
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

interface Props {
  work: WorkData;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: Props) {
  // 모달이 열려있을 때 뒤쪽 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    // 1. 배경 오버레이 (클릭하면 닫힘)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* 2. 모달 박스 (내용물 클릭해도 안 닫힘) */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        >
          <XIcon />
        </button>

        {/* 왼쪽: 이미지 영역 */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-800">
          <img 
            src={work.image} 
            alt={work.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽: 정보 영역 */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          {/* 장르 태그 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {work.genres.map((genre) => (
              <span key={genre} className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {genre}
              </span>
            ))}
            {work.gender && (
              <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {work.gender}
              </span>
            )}
          </div>

          {/* 제목 */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
            {work.title}
          </h2>

          {/* 줄거리/설명 */}
          <div className="prose dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base flex-grow">
            {work.summary}
          </div>

          {/* 하단 링크 버튼 */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <a 
              href={work.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-red-500/20 gap-2"
            >
              <span>EveChat 에서 보기</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}