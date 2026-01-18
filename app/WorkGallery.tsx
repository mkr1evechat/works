'use client';

import { useState, useMemo, useEffect } from 'react';
import type { WorkData } from '../lib/works';
import ThemeToggle from './components/ThemeToggle';
import WorkModal from './components/WorkModal';

// --- 아이콘 컴포넌트들 ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const MaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"></circle><line x1="19" y1="5" x2="13.6" y2="10.4"></line><line x1="19" y1="5" x2="14" y2="5"></line><line x1="19" y1="5" x2="19" y2="10"></line></svg>
);
const FemaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="5"></circle><line x1="12" y1="15" x2="12" y2="21"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>
);
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.699.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

export default function WorkGallery({ allWorks }: { allWorks: WorkData[] }) {
  const [filter, setFilter] = useState('All');
  const [sortOption, setSortOption] = useState('random');
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkData | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // PC 사이드바용 토글 (기본값: 닫힘)
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // 모바일 드로어용 토글 (기본값: 닫힘)
  const [isMobileTagsOpen, setIsMobileTagsOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  const sortOptions = [
    { id: 'newest', label: 'Newest (최신순)' },
    { id: 'oldest', label: 'Oldest (오래된순)' },
  ];

  const allGenres = ['All', ...Array.from(new Set(allWorks.flatMap(work => work.genres)))];

  const [seed, setSeed] = useState(0);
  useEffect(() => { setSeed(Math.random()); }, []);

  // 메뉴 열릴 때 스크롤 막기
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter(g => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const processedWorks = useMemo(() => {
    if (selectedGenders.length === 0) {
      return [];
    }

    let result = filter === 'All'
      ? [...allWorks]
      : allWorks.filter((work) => work.genres.includes(filter));

    result = result.filter((work) => 
      work.gender && selectedGenders.includes(work.gender)
    );

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
      {/* 작품 상세 모달 */}
      {selectedWork && (
        <WorkModal 
          work={selectedWork} 
          onClose={() => setSelectedWork(null)} 
        />
      )}

      {/* --- 📱 모바일 전용 슬라이드 메뉴 (Drawer) - 오른쪽에서 열림 --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white dark:bg-[#1a1a1a] z-50 shadow-2xl transform transition-transform duration-300 md:hidden overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* 헤더: 왼쪽(테마) --- 오른쪽(X버튼) */}
          <div className="flex justify-between items-center mb-6">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-gray-500 dark:text-gray-400">
              <XIcon />
            </button>
          </div>

          {/* 모바일: 성별 선택 */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Character</h3>
            <div className="flex gap-2">
              <button
                onClick={() => toggleGender('Male')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  selectedGenders.includes('Male')
                    ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400' 
                    : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
                }`}
              >
                <MaleIcon /> Male
              </button>
              <button
                onClick={() => toggleGender('Female')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                  selectedGenders.includes('Female')
                    ? 'bg-pink-50 border-pink-500 text-pink-600 dark:bg-pink-900/20 dark:border-pink-400 dark:text-pink-400'
                    : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
                }`}
              >
                <FemaleIcon /> Female
              </button>
            </div>
          </div>

          {/* 모바일: Tags */}
          <div className="mb-6">
            <button 
              onClick={() => setIsMobileTagsOpen(!isMobileTagsOpen)}
              className="flex items-center justify-between w-full py-2 text-lg font-bold text-gray-900 dark:text-white"
            >
              Tags
              <ChevronIcon className={`transition-transform ${isMobileTagsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`space-y-1 overflow-hidden transition-all ${isMobileTagsOpen ? 'max-h-[1000px] mt-2' : 'max-h-0'}`}>
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  // 👇 여기! 클릭해도 메뉴가 닫히지 않도록 수정했습니다.
                  onClick={() => setFilter(genre)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    filter === genre
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* 모바일: Sort by */}
          <div className="mb-8">
            <button 
              onClick={() => setIsMobileSortOpen(!isMobileSortOpen)}
              className="flex items-center justify-between w-full py-2 text-lg font-bold text-gray-900 dark:text-white"
            >
              Sort by
              <ChevronIcon className={`transition-transform ${isMobileSortOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`space-y-1 overflow-hidden transition-all ${isMobileSortOpen ? 'max-h-[500px] mt-2' : 'max-h-0'}`}>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  // 👇 여기! 클릭해도 메뉴가 닫히지 않도록 수정했습니다.
                  onClick={() => setSortOption(option.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    sortOption === option.id
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 모바일: Discord (버튼 스타일) */}
          <a
            href="https://www.discord.com/users/1410475071549608058"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-[#5865F2]/10 text-[#5865F2] font-bold mt-auto hover:bg-[#5865F2]/20 transition-colors"
          >
            <DiscordIcon className="w-6 h-6" />
            Discord
          </a>
        </div>
      </div>
      {/* --------------------------------------------------- */}


      {/* 메인 헤더 */}
      <header className="flex justify-between items-center mb-6 md:mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Works
          </h1>

          {/* PC용 성별 버튼 */}
          <div className="hidden md:flex items-center gap-2">
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
          
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-auto"
            aria-label="메뉴 열기"
          >
            <MenuIcon />
          </button>
        </div>
        
        <ThemeToggle />
      </header>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
        {/* PC 사이드바 (모바일에서는 숨김) */}
        <aside className="hidden md:block w-1/5 lg:w-1/6 shrink-0">
          {/* PC: Tags */}
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

          {/* PC: Sort by */}
          <div className="mb-6">
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

          {/* PC: Discord (border-t 없음) */}
          <div className="mt-8">
            <a
              href="https://www.discord.com/users/1410475071549608058"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#5865F2]/10 text-[#5865F2] font-bold hover:bg-[#5865F2]/20 transition-colors"
            >
              <DiscordIcon className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>
        </aside>

        {/* 작품 목록 그리드 */}
        <main className="flex-1">
          {selectedGenders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fadeIn text-gray-400 dark:text-gray-500">
              <div className="flex gap-4 mb-4 opacity-50">
                <MaleIcon />
                <FemaleIcon />
              </div>
              <p className="text-lg font-medium mb-1">
                <span className="hidden md:block">상단의 성별 아이콘을 선택해 주세요.</span>
                <span className="md:hidden">메뉴를 열어 성별을 선택해 주세요.</span>
              </p>
              <p className="text-sm">
                캐릭터 성별에 따라 작품을 보여드립니다.
              </p>
            </div>
          ) : processedWorks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fadeIn">
              {processedWorks.map((work) => (
                <div 
                  key={work.id} 
                  onClick={() => setSelectedWork(work)} 
                  className="group block cursor-pointer"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 relative">
                    <img src={work.image} alt={`${work.title} 표지`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-gray-900 dark:text-white text-md truncate">{work.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-gray-500 dark:text-gray-400">조건에 맞는 작품이 없습니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}