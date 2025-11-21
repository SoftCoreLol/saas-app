import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermissions } from "@/lib/actions/companion.actions"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"


const NewCompanion = async() => {

  const {userId} = await auth()
  if(!userId) redirect('/sign-in')


  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="w-full max-w-3xl mx-auto flex items-center justify-center py-12">
      {canCreateCompanion?(
        <article className="w-full max-w-md mx-auto gap-4 flex flex-col">
        <h1 className="text-center">Companion Builder</h1>
        <CompanionForm/>
      </article>
      ):(
        <article className="cta-section max-w-2xl">
          <Image
            src='/images/limit.svg'
            alt='Companion limit reached'
            width={360}
            height={330}
            className="max-w-xs md:max-w-sm"
          />
          <div className="cta-badge px-4 py-2">Upgrade your plan</div>
          <h2 className="text-2xl md:text-3xl font-bold max-w-md">
            You've reached your limit
          </h2>
          <p className="text-base md:text-lg text-gray-200 max-w-md">
            You've reached your companion limit. Upgrade to create more companions and premium features.
          </p>
          <Link href='/subscription' className='w-full max-w-xs mx-auto'>
            <button className="btn-primary bg-white text-black w-full justify-center py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Upgrade my plan
            </button>
          </Link>
        </article>
      )}

    </main>
  )
}

export default NewCompanion
