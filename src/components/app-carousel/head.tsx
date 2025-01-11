import Link from 'next/link';
import { ModeButton } from './mode-button';

export function AppHead() {
  return (
    <div className={`
      flex select-none justify-between border-b border-gray-300 p-4
    `}
    >
      <div className="flex">
        <Link href="/">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-cover)' }}>Archie Pratice</h1>
        </Link>
      </div>
      <div className="p-1">
        <ModeButton />
      </div>
    </div>
  );
}
