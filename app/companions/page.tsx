import CompanionCard from '@/components/CompanionCard';

import SearchInput from '@/components/search-input';
import SubjectFilter from '@/components/subject-filter';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';


interface SearchParams {
  searchParams: Promise<{
    subject?: string;
    topic?: string;
  }>;
}

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
    <main className="p-4 w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Companion Library</h1>
      </div>
      <section className='flex flex-col gap-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1 min-w-0'>
            <SearchInput/>
          </div>
          <div className='flex-1 min-w-0'>
            <SubjectFilter/>
          </div>
        </div>
        <section className='companions-grid'>
          {companions && companions.length > 0 ? (
            companions.map((companion) => (
              <div key={companion.id} className="relative">
                <CompanionCard 
                  {...companion} 
                  color={getSubjectColor(companion.subject)}
                />
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center w-full h-full col-span-full'>
              {hasFilters ? (
                <p className='text-lg text-gray-500'>No companions match your search. Try different keywords or filters!</p>
              ) : (
                <div className='text-center'>
                  <p className='text-lg text-gray-500'>No companions available yet</p>
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