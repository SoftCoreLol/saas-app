import Image from "next/image";
import Link from "next/link";



interface CompanionCardProps{
  name:string;
  id:string;
  subject:string,
  topic:string,
  duration:number,
  color?:string,
}



console.log()




const CompanionCard = ({id,name,subject,topic,duration,color}:CompanionCardProps) => {
  const backgroundColor = color || '#f0f0f0'; // Default color if none provided

  return (
    <article className="companion-card relative" style={{backgroundColor}}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">
          {subject}
        </div>
        <div className="flex items-center gap-2">
          <button className="companion-bookmark">
            <Image src={"/icons/bookmark.svg"} alt="bookmark" width={12.5} height={15}/>
          </button>

        </div>
      </div>
      <div className="flex flex-col items-start text-left grow">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm mt-1">{topic}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image src={'/icons/clock.svg'} alt="duration" width={13.5} height={13.5}/>
        <span className="text-sm">{duration} min</span>
      </div>
      <Link href={`/companions/${id}`} className="w-full mt-auto">
        <button className="btn-primary bg-black w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  )
}

export default CompanionCard
