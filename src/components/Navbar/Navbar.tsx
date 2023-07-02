import Link from 'next/link'
import Image from 'next/image'
import Account from './Account'

// import Account from './Account';
import logo from 'public/img/zkPass.svg'

import s from './Navbar.module.css'

export default async function Navbar() {
  return (
    <nav className={s.root}>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.left}>
            <Link href="/" className={s.logo} aria-label="Logo">
              <Image src={logo} alt={'Logo'} />
            </Link>
          </div>
          <div className={s.right}>
            <Account />
          </div>
        </div>
      </div>
    </nav>
  )
}
