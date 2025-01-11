import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div
        className={`
          relative min-h-screen bg-gradient-to-r from-yellow-100 to-gray-50
        `}
        style={{
          backgroundImage: 'url("/image/20250101.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >

        <main className="relative flex min-h-screen flex-col px-4">
          <div className="ml-24 mt-16 px-8">
            <div className={`
              absolute left-3 inline-block rounded-xl px-8 py-4 text-left
            `}
            >
              <h1
                className={`
                  mb-2 flex flex-col gap-2 text-left text-9xl font-bold
                  text-blue-950
                  dark:text-gray-500
                `}
                style={{ fontFamily: 'var(--font-cover)' }}
              >
                <span>Archie</span>
                <span>WebSite</span>
              </h1>
              <p className="pl-5 text-lg text-gray-600" style={{ fontFamily: 'var(--font-cover), serif' }}>
                Explore, Learn, and ENJOY
              </p>
              <Link href="/english">
                <Button className="mt-2" variant="outline">
                  Getting Start
                  <ArrowBigRight />
                </Button>
              </Link>
            </div>

            <div className="absolute bottom-1/4 left-3/4">
              <span className="text-7xl font-bold" style={{ fontFamily: 'var(--font-cover)' }}>Pursue excellence  and success will follow</span>
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}
