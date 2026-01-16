 // app/page.tsx
 import { getSortedWorksData } from '../lib/works';
 import WorkGallery from './WorkGallery';
 import ThemeToggle from './components/ThemeToggle';

 export default function Home() {
   const allWorks = getSortedWorksData();

   return (
     // 👇 불필요한 배경색 클래스 제거
     <div>
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
         <header className="flex justify-between items-center mb-8 lg:mb-12">
           <div>
             {/* 👇 텍스트에 dark: 접두사 적용 */}
             <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
               Works
             </h1>
           </div>
           <ThemeToggle />
         </header>

         <WorkGallery allWorks={allWorks} />
       </div>
     </div>
   );
 }
