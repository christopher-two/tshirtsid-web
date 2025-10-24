import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(p => p.id === id);

  const womanImg = getImage('woman-fashion-1');
  const manImg = getImage('man-fashion-1');
  const kidsImg = getImage('kids-fashion-1');

  return (
      <section className="min-h-[calc(100vh-80px)] -my-8 -mx-8 flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="relative group">
            {womanImg && (
              <Link href="/collection/women" className="absolute inset-0">
                <Image 
                  src={womanImg.imageUrl} 
                  alt="Mujer" 
                  fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint="woman fashion" 
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase">Mujer</h2>
                </div>
              </Link>
            )}
          </div>

          <div className="relative group">
            {manImg && (
              <Link href="/collection/men" className="absolute inset-0">
                <Image 
                  src={manImg.imageUrl} 
                  alt="Hombre" 
                  fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint="man fashion"
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase">Hombre</h2>
                </div>
              </Link>
            )}
          </div>

          <div className="relative group md:col-span-2 lg:col-span-1">
             {kidsImg && (
               <Link href="/collection/kids" className="absolute inset-0">
                <Image 
                  src={kidsImg.imageUrl} 
                  alt="Kids" 
                  fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint="kids fashion"
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase">Kids</h2>
                </div>
               </Link>
             )}
          </div>

        </div>
      </section>
  );
}
