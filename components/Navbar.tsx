import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import NewButton from './ui/Sign-in-button-landing-page'

const Navbar = () => {
  return (
    <header>
        <nav className='navbar'>
            <Link href='/'>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image src={'/images/logo.svg'} alt='logo' width={46} height={44}/>
                </div>
            </Link>
            
            <div className='flex items-center gap-8'>
                <NavItems/>
                <NewButton type='blue' onClick={undefined} >Sign in</NewButton>
                
            </div>

        </nav>
    </header>
  )
}

export default Navbar
