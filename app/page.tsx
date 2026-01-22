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
         <WorkGallery allWorks={allWorks} />
       </div>
     </div>
   );
 }
