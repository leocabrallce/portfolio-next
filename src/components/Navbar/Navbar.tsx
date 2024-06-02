import Link from 'next/link';

type Props = {
  items: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
};

function Navbar({ items, className }: Props) {
  return (
    <nav className="bg-black text-white flex justify-between py-2 px-4 sm:py-4 sm:px-8">
      <Link href="/" className="text-lg font-bold">
        Leo
      </Link>

      <ul className="flex gap-4">
        {items.map((item) => (
          <li key={`link-${item.name}`}>
            <Link href={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;