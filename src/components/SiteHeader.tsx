import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function SiteHeader() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
      isActive && 'bg-accent'
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">React JS Quiz</Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Ana Sayfa
          </NavLink>
          <NavLink to="/react" className={linkClass}>
            React
          </NavLink>
          <NavLink to="/react-native" className={linkClass}>
            React Native
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
