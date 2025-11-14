'use client'

import Image from "next/image";
import Link from "next/link";
import BANBtn from "./ui/build-a-new-companion-btn";

const CTA = () => {
  return (
   <section className="cta-section w-auto mx-auto">
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text-3xl font-bold ">
        Build and Personalize Your Learning Companion
      </h2>
      <p className="cta-">
        Pick a name , subject , voice & personality - and start learning through 
        voice conversations that feel real natural and fun.
      </p>
      <Image src={'images/cta.svg'} alt='cta' width={362} height={232}/>
      <button className="btn-primary bg-[#0f0f0f]">
        <Image src='icons/plus.svg' alt="plus" width={12} height={12}/>
        <Link href={'/companions/new'}>
          Build a new Companion</Link>
      </button>
   </section>
  );
}


export default CTA;
