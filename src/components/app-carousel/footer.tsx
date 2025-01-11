import { Copyright } from 'lucide-react';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer
      className={`
        mt-10 flex border-t p-8 text-muted-foreground
        sm:flex-row
      `}
    >
      <div className="flex flex-grow items-center gap-1 text-end">
        <span>archie tool</span>
        <Copyright size={15} />
        <span>2025</span>
      </div>

      <div className="md:flex-wrap">
        <Button>關於作者</Button>
        <Button variant="link" className="text-gray-500">隱私條款</Button>
      </div>
    </footer>
  );
}
