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
    <footer className="mx-8 mt-20 p-16 text-lg flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-16 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark">
      <p className="text-center">
        &copy; {moment().format('YYYY')} Leonardo Cabral
      </p>

      <div className='flex flex-col md:flex-row gap-4'>
        {links.map((link) => (
          <Link key={link.link} href={link.link} className=' hover:text-primary underline' target='_blank'>
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;