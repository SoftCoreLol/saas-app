'use client'

import Image from "next/image";
import Link from "next/link";
import BANBtn from "./ui/build-a-new-companion-btn";

const CTA = () => {
  return (
   <section className="cta-section">
      <div className="cta-badge px-4 py-2">Start learning your way.</div>
      <h2 className="text-2xl md:text-3xl font-bold max-w-md">
        Build and Personalize Your Learning Companion
      </h2>
      <p className="text-base md:text-lg text-gray-200 max-w-md">
        Pick a name , subject , voice & personality - and start learning through
        voice conversations that feel real natural and fun.
      </p>
      <Image
        src={'/images/cta.svg'}
        alt='cta'
        width={362}
        height={232}
        className="max-w-full h-auto"
      />
      <Link href={'/companions/new'} className="w-full max-w-xs">
        <button className="btn-primary bg-white text-black w-full justify-center py-3 rounded-lg hover:bg-gray-100 transition-colors">
          <Image src='/icons/plus.svg' alt="plus" width={16} height={16}/>
          Build a new Companion
        </button>
      </Link>
   </section>
  );
}


export default CTA;
