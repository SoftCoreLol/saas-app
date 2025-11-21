'use client'
import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import NewButton from './ui/Sign-in-button-landing-page'
import { SignInButton,SignedOut,UserButton,SignedIn } from '@clerk/nextjs'

const Navbar = () => {

  
  console.log('navbar rendered')
  

  return (
    <header className='sticky top-0 z-50'>
        <nav className='navbar  h-[60px] min-w-screen bg-white backdrop-blur-sm'>
            <Link href='/'>
                <div className='flex items-center gap-2.5 cursor-pointer'>
                    <Image src={'/images/logo.svg'} alt='logo' width={46} height={44}/>
                </div>
            </Link>

            <div className='flex items-center gap-8'>
                <NavItems/>
                <SignedOut>
                  <SignInButton>
                    <NewButton >Sign In</NewButton>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton/>
                </SignedIn>


            </div>

        </nav>
    </header>
  )
}

export default Navbar
