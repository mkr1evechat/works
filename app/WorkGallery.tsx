'use client';

import { useState, useMemo, useEffect } from 'react';
import type { WorkData } from '../lib/works';
import ThemeToggle from './components/ThemeToggle';

// --- 아이콘 컴포넌트 ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
// ♂ 남성 아이콘
const MaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"></circle><line x1="19" y1="5" x2="13.6" y2="10.4"></line><line x1="19" y1="5" x2="14" y2="5"></line><line x1="19" y1="5" x2="19" y2="10"></line></svg>
);
// ♀ 여성 아이콘
const FemaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="5"></circle><line x1="12" y1="15" x2="12" y2="21"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>
);

export default function WorkGallery({ allWorks }: { allWorks: WorkData[] }) {
  const [filter, setFilter] = useState('All');
  const [sortOption, setSortOption] = useState('random');
  
  // 성별 필터 상태 (기본값: 선택 안 됨)
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { id: 'newest', label: 'Newest (최신순)' },
    { id: 'oldest', label: 'Oldest (오래된순)' },
  ];

  const allGenres = ['All', ...Array.from(new Set(allWorks.flatMap(work => work.genres)))];

  const [seed, setSeed] = useState(0);
  useEffect(() => { setSeed(Math.random()); }, []);

  // 성별 토글 함수
  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const processedWorks = useMemo(() => {
    // 💥 핵심 변경: 성별이 하나도 선택되지 않았으면 빈 배열 반환 (아무것도 안 보여줌)
    if (selectedGenders.length === 0) {
      return [];
    }

    // 1. 장르 필터링
    let result = filter === 'All'
      ? [...allWorks]
      : allWorks.filter((work) => work.genres.includes(filter));

    // 2. 성별 필터링
    result = result.filter((work) => 
      work.gender && selectedGenders.includes(work.gender)
    );

    // 3. 정렬
    if (sortOption === 'newest') {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortOption === 'random' && seed !== 0) {
      result.sort(() => Math.random() - 0.5);
    }

    return result;
  }, [filter, sortOption, allWorks, seed, selectedGenders]);

  return (
    <div>
      {/* 헤더 영역 */}
      <header className="flex justify-between items-center mb-6 md:mb-10">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Works
          </h1>

          {/* 성별 토글 버튼 영역 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleGender('Male')}
              className={`p-2 rounded-full transition-all duration-200 border ${
                selectedGenders.includes('Male')
                  ? 'bg-blue-100 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-400' 
                  : 'bg-transparent border-gray-300 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
              title="남성 캐릭터 필터"
            >
              <MaleIcon />
            </button>

            <button
              onClick={() => toggleGender('Female')}
              className={`p-2 rounded-full transition-all duration-200 border ${
                selectedGenders.includes('Female')
                  ? 'bg-pink-100 border-pink-500 text-pink-600 dark:bg-pink-900/30 dark:border-pink-400 dark:text-pink-400'
                  : 'bg-transparent border-gray-300 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
              title="여성 캐릭터 필터"
            >
              <FemaleIcon />
            </button>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-auto"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        
        <ThemeToggle />
      </header>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
        {/* 사이드바 */}
        <aside 
          className={`
            w-full md:w-1/5 lg:w-1/6 shrink-0
            ${isMenuOpen ? 'block' : 'hidden'} 
            md:block
          `}
        >
          {/* Tags 섹션 */}
          <div className="mb-6">
            <button 
              onClick={() => setIsTagsOpen(!isTagsOpen)}
              className="flex items-center justify-between w-full mb-3 md:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 group"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-red-500 transition-colors">
                Tags
              </h2>
              <ChevronIcon className={`text-gray-500 transition-transform duration-200 ${isTagsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-300 overflow-hidden ${isTagsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <nav className="flex flex-col space-y-2">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setFilter(genre)}
                    className={`px-3 py-2 rounded-md text-left text-sm font-semibold transition-colors duration-200 ${
                      filter === genre
                        ? 'bg-sky-500 text-white dark:bg-red-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Sort by 섹션 */}
          <div>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-between w-full mb-3 md:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 group"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-red-500 transition-colors">
                Sort by
              </h2>
              <ChevronIcon className={`text-gray-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${isSortOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <nav className="flex flex-col space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortOption(option.id)}
                    className={`px-3 py-2 rounded-md text-left text-sm font-semibold transition-colors duration-200 ${
                      sortOption === option.id
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* 작품 목록 그리드 */}
        <main className="flex-1">
          {selectedGenders.length === 0 ? (
            // 👇 1. 성별을 선택하지 않았을 때 보이는 안내 화면
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fadeIn text-gray-400 dark:text-gray-500">
              <div className="flex gap-4 mb-4 opacity-50">
                <MaleIcon />
                <FemaleIcon />
              </div>
              <p className="text-lg font-medium mb-1">
                상단의 성별 아이콘을 선택해 주세요.
              </p>
              <p className="text-sm">
                캐릭터 성별에 따라 작품을 보여드립니다.
              </p>
            </div>
          ) : processedWorks.length > 0 ? (
            // 👇 2. 작품이 있을 때 (그리드 표시)
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fadeIn">
              {processedWorks.map((work) => (
                <a href={work.link} key={work.id} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="aspect-[2/3] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 relative">
                    <img src={work.image} alt={`${work.title} 표지`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-md truncate">{work.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">{work.summary}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            // 👇 3. 성별은 선택했으나 해당하는 작품이 없을 때
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-gray-500 dark:text-gray-400">조건에 맞는 작품이 없습니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}