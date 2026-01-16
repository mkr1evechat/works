 'use client';

 import { useState, useMemo } from 'react';
 import type { WorkData } from '../lib/works';

 export default function WorkGallery({ allWorks }: { allWorks: WorkData[] }) {
   const [filter, setFilter] = useState('전체');
   const allGenres = ['전체', ...Array.from(new Set(allWorks.flatMap(work => work.genres)))];

   const filteredWorks = useMemo(() => {
     if (filter === '전체') {
       return allWorks;
     }
     return allWorks.filter((work) => work.genres.includes(filter));
   }, [filter, allWorks]);

   return (
     <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
       <aside className="w-full md:w-1/5 lg:w-1/6">
         <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">장르</h2>
         <nav className="flex flex-col space-y-2">
           {allGenres.map((genre) => (
             <button
               key={genre}
               onClick={() => setFilter(genre)}
               className={`px-3 py-2 rounded-md text-left text-sm font-semibold transition-colors duration-200 ${
                 filter === genre
                   ? 'bg-sky-500 text-white dark:bg-red-600' // ✅ 라이트: 하늘색, 다크: 붉은색
                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
               }`}
             >
               {genre}
             </button>
           ))}
         </nav>
       </aside>

       <main className="flex-1">
         {filteredWorks.length > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
             {filteredWorks.map((work) => (
               <a href={work.link} key={work.id} target="_blank" rel="noopener noreferrer" className="group block">
                 <div className="aspect-[2/3] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
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
           <div className="flex items-center justify-center h-full min-h-96">
             <p className="text-gray-500 dark:text-gray-400">이 장르에는 작품이 없습니다.</p>
           </div>
         )}
       </main>
     </div>
   );
 }