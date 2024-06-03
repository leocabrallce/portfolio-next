import moment from 'moment';
import Link from 'next/link';

function Footer() {
  const links = [
    {
      type: 'email',
      name: 'Email',
      link: 'mailto:leocabrallce@gmail.com'
    },
    {
      type: 'link',
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/leocabrallce/'
    },
    {
      type: 'link',
      name: 'X / Twitter',
      link: 'https://twitter.com/leocabrallce'
    },
    {
      type: 'link',
      name: 'GitHub',
      link: 'https://github.com/leocabrallce'
    },
  ];

  return (
    <footer className="mx-8 mt-20 p-16 text-lg flex flex-row justify-between items-center bg-primary-dark text-primary-light">
      <p className="text-center">
        &copy; {moment().format('YYYY')} Leonardo Cabral
      </p>

      <div className='flex flex-row gap-4'>
        {links.map((link, idx) => (
          <Link key={`link-${idx}`} href={link.link} className='text-primary-light hover:text-primary underline'>
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;