import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } =  await params;
  const companion = await getCompanion(id);


  if(!companion){
    redirect('/companions');
  }

  const user = await currentUser();

  const { name, subject, topic, duration } = companion;


  if (!user) {
    redirect('/sign-in');
  }

  if (!name) {
    redirect('/companions');
  }

console.log("Dynamic route param:", params);


  return (
    <main className="w-full">
      <article className="flex flex-col sm:flex-row rounded-border justify-between p-6 w-full max-w-none">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <div className="size-[72px] flex items-center justify-center rounded-lg " style={{backgroundColor:getSubjectColor(subject)}}>
            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35}/>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-2xl">
                {name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>

            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="text-2xl max-md:hidden flex items-start sm:items-center">
          {duration} mins
        </div>
      </article>
      <CompanionComponent companionId={id} userName={user.firstName!} userImage={user.imageUrl!} {...companion}/>
    </main>
  )
}

export default CompanionSession
