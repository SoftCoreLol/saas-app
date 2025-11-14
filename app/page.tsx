import CompanionCard from "@/components/CompanionCard"
import CompanionList from "@/components/CompanionList"
import CTA from "@/components/CTA"
import { recentSessions } from "@/constants"

const page = () => {
  return (
    <main>
      <h1 className="text-2xl">
        Popular Companions
      </h1>

      <section className="home-section">
        <CompanionCard id='123' name='Nura the Brainy Explorer' topic='Neural network of brain' subject='Science' duration={45} color={'#bde6ff'}/>
        <CompanionCard id='456' name='Courtsy the Number Wizard' topic='Derivatives and Integrals' subject='Maths' duration={30} color={'#e4d0fd'}/>
        <CompanionCard id='678' name='Verba the Vocublary Builder' topic='language' subject='English Literature' duration={35} color={'#ffda6c'}/>
        
      </section>

      <section className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <CompanionList
            title='Recently Completed Sessions'
            companions={recentSessions}
            className="w-full max-w-4xl mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <CTA/>
        </div>
      </section>

    </main>
  )
}

export default page
