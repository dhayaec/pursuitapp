import Link from 'next/link';

export default list => (
  <ul>
    {list.map(item => (
      <li>
        <Link href={item.slug}>
          <a>{item.name}</a>
        </Link>
      </li>
    ))}
  </ul>
);
