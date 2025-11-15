import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/search-input';
import SubjectFilter from '@/components/subject-filter';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

const CompanionLibrary = async({searchParams}:SearchParams) => {

  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;
  const subject = params.subject || '';
  const topic = params.topic || '';

  const hasFilters = !!subject || !!topic;

  // Fetch companions - show all if no filters, or filtered results
  const companions = await getAllCompanions({
    subject,
    topic,
    limit: 20
  });


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
              {hasFilters ? (
                <p className='text-lg text-gray-500'>No companions match your search. Try different keywords or filters!</p>
              ) : (
                <div className='text-center'>
                  <p className='text-lg text-gray-500'>No companions available yet.</p>
                  <p className='text-sm text-gray-400 mt-2'>Try searching by topic or filtering by subject above.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </section>

    </main>
  )
}

export default CompanionLibrary
