'use client';

import { Question } from '@/components/english/question';

export default function Page() {
  return (
    <div
      className="min-h-screen min-w-full"
      style={{
        backgroundImage: 'url("/image/en0111.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-center">
        <Question />
      </div>
    </div>
  );
}
