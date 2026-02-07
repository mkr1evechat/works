'use client';

import { useState, useEffect } from 'react';
import type { WorkData } from '../../lib/works';

// --- 아이콘 ---
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const LeftArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const RightArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

interface Props {
  work: WorkData;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: Props) {
  // 폴더에 있는 이미지들만 갤러리로 사용
  const galleryImages = work.galleryImages || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-[#121212] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <XIcon />
        </button>

        {/* --- 왼쪽: 고정된 대표 표지 --- */}
        <div className="w-full md:w-[50%] h-[30%] md:h-full relative bg-gray-100 dark:bg-black">
          <img 
            src={work.image} 
            alt={work.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- 오른쪽: 정보 + 갤러리 + 링크 --- */}
        <div className="w-full md:w-[50%] p-6 md:p-8 flex flex-col overflow-y-auto border-l border-gray-100 dark:border-gray-800 scrollbar-hide">
          
          {/* 1. 작품 정보 */}
          <div className="flex flex-wrap gap-2 mb-3">
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

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
            {work.title}
          </h2>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-mono">
            {work.date}
          </p>

          <div className="prose dark:prose-invert max-w-none mb-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
            {work.summary}
          </div>

          {/* 빈 공간 채우기 (내용이 적을 때 갤러리를 아래로 밀어줌) */}
          <div className="flex-grow"></div>

          {/* 2. 📸 1:1 이미지 갤러리 (폴더에 이미지가 있을 때만 표시) */}
          {galleryImages.length > 0 && (
            <div className="mb-6 w-full max-w-[400px] mx-auto">
              <div className="relative aspect-square w-full rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900 group">
                
                <img 
                  src={galleryImages[currentIndex]} 
                  alt={`Gallery ${currentIndex + 1}`} 
                  className="w-full h-full object-contain"
                />

                {/* 갤러리 화살표 (2장 이상일 때) */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <LeftArrow />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RightArrow />
                    </button>
                    {/* 페이지 번호 */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-xs font-mono">
                      {currentIndex + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* 3. 하단 링크 버튼 */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
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