import Link from 'next/link';

type Props = {
  items: {
    name: string;
    link: string;
  }[];
};

function Navbar({ items }: Props) {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={`link-${item.name}`}>
            <Link href={item.link} className='text-primary-dark text-lg underline hover:text-primary transition-colors'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;