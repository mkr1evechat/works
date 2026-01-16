'use client';

 import { useState, useEffect } from 'react';

 // 간단한 아이콘 SVG 컴포넌트
 const SunIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
 );
 const MoonIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
 );

 export default function ThemeToggle() {
   const [isMounted, setIsMounted] = useState(false);
   const [theme, setTheme] = useState('dark');

   useEffect(() => {
     setIsMounted(true);
     // 브라우저의 저장 공간(localStorage)에서 테마를 가져오거나, 없으면 OS 설정을 따름
     const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
     setTheme(savedTheme);
   }, []);

   useEffect(() => {
     if (theme === 'dark') {
       document.documentElement.classList.add('dark');
       localStorage.setItem('theme', 'dark'); // 사용자의 선택을 브라우저에 저장
     } else {
       document.documentElement.classList.remove('dark');
       localStorage.setItem('theme', 'light'); // 사용자의 선택을 브라우저에 저장
     }
   }, [theme]);

   if (!isMounted) {
     return null; // 렌더링 불일치를 피하기 위해, 브라우저가 준비되기 전에는 아무것도 표시하지 않음
   }

   const toggleTheme = () => {
     setTheme(theme === 'dark' ? 'light' : 'dark');
   };

   return (
     <button
       onClick={toggleTheme}
       className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
       aria-label="Toggle theme"
     >
       {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
     </button>
   );
 }