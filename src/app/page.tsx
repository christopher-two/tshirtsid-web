import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  return (
      <section className="min-h-[calc(100vh-80px)] -my-8 -mx-8">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-[auto_1fr] h-full">
          <div className="md:col-span-2 grid grid-cols-2 grid-rows-2">
            
            {/* Top row */}
            <div className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1572804013427-4d7ca726b65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Woman" fill className="object-cover" data-ai-hint="woman fashion" />
            </div>
            <div className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1512303500393-2b2f6f5b2da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Man" fill className="object-cover" data-ai-hint="man fashion" />
            </div>

            {/* Bottom row */}
            <div className="relative aspect-square group">
               <Link href="/collection/women">
                <Image src="https://images.unsplash.com/photo-1509395043312-9c1622ed307f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Mujer" fill className="object-cover group-hover:opacity-75 transition-opacity" data-ai-hint="woman portrait" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Mujer</h2>
                </div>
               </Link>
            </div>
             <div className="relative aspect-square group">
               <Link href="/collection/men">
                <Image src="https://images.unsplash.com/photo-1593452506440-78155b5f257e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Hombre" fill className="object-cover group-hover:opacity-75 transition-opacity" data-ai-hint="man portrait" />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Hombre</h2>
                </div>
               </Link>
            </div>
          </div>

          <div className="relative md:row-span-2 group">
             <Link href="/collection/kids">
              <Image src="https://images.unsplash.com/photo-1513224729462-475246ba1136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Kids" fill className="object-cover h-full group-hover:opacity-75 transition-opacity" data-ai-hint="kids fashion" />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase">Kids</h2>
              </div>
             </Link>
          </div>
        </div>
      </section>
  );
}
