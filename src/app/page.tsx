import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const womanImg = {
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMGZhc2hpb258ZW58MHx8fHwxNzYxMjM1NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "woman fashion"
  };
  const manImg = {
    imageUrl: "https://images.unsplash.com/photo-1653694053345-b22f94c95bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYW4lMjBmYXNoaW9ufGVufDB8fHx8MTc2MTI5MTY4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "man fashion"
  };
  const kidsImg = {
    imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxraWRzJTIwZmFzaGlvbnxlbnwwfHx8fDE3NjEzMjcxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "kids fashion"
  };

  return (
      <section className="min-h-[calc(100vh-160px)] flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="relative group min-h-[60vh] md:min-h-0">
            {womanImg && (
              <Link href="/collection/women" className="absolute inset-0">
                <Image 
                  src={womanImg.imageUrl} 
                  alt="Mujer" 
                  fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint={womanImg.imageHint} 
                />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase px-2">Mujer</h2>
                </div>
              </Link>
            )}
          </div>

          <div className="relative group min-h-[60vh] md:min-h-0">
            {manImg && (
              <Link href="/collection/men" className="absolute inset-0">
                <Image 
                  src={manImg.imageUrl} 
                  alt="Hombre"                    fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint={manImg.imageHint}
                />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase px-2">Hombre</h2>
                </div>
              </Link>
            )}
          </div>

          <div className="relative group md:col-span-2 lg:col-span-1 min-h-[60vh] md:min-h-0">
             {kidsImg && (
               <Link href="/collection/kids" className="absolute inset-0">
                <Image 
                  src={kidsImg.imageUrl} 
                  alt="Kids" 
                  fill 
                  className="object-cover group-hover:opacity-75 transition-opacity" 
                  data-ai-hint={kidsImg.imageHint}
                />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-5xl md:text-6xl font-black text-white uppercase px-2">Kids</h2>
                </div>
               </Link>
             )}
          </div>

        </div>
      </section>
  );
}
