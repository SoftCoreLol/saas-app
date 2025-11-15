import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/search-input';
import SubjectFilter from '@/components/subject-filter';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

const CompanionLibrary = async({searchParams}:SearchParams) => {

  const subject = searchParams.subject || '';
  const topic = searchParams.topic || '';

  const hasFilters = !!subject || !!topic;

  // Only fetch companions if a search query or filter is active
  const companions = hasFilters ? await getAllCompanions({subject,topic}) : [];


  return (
    <main>
      <section className='flex justify-between gap-4 max-sm:flex-col'>
        <div className='flex gap-4 '>
          <SearchInput/>
          <SubjectFilter/>
        </div>
        <section className='companions-grid'>
          {companions && companions.length > 0 ? companions.map((companion)=>(
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
          )) : (
            <div className='flex items-center justify-center w-full h-full col-span-full'>
              <p className='text-lg text-gray-500'>No companions found. Try a different search!</p>
            </div>
          )}
        </section>
      </section>

    </main>
  )
}

export default CompanionLibrary
