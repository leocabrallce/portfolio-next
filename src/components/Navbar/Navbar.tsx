'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  items: {
    name: string;
    link: string;
  }[];
};

function Navbar({ items }: Props) {
  // check if current route is root
  const pathname = usePathname();
  const isRoot = pathname === '/';

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {
          !isRoot && (
            <li>
              <Link href="/" className=' text-lg underline hover:text-primary transition-colors'>
                Home
              </Link>
            </li>
          )
        }
        {items.map((item) => (
          <li key={`link-${item.name}`}>
            <Link href={item.link} className=' text-lg underline hover:text-primary transition-colors'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;