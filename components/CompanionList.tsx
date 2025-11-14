
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { subjects } from "@/constants";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


interface CompanionsListProps{
  title:string;
  companions?:Companion[];
  className?:string;
}

const CompanionList = ({title,companions,className}:CompanionsListProps) => {
  return (
    <article className={cn('companion-list',className)}>
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({id,subject,name,topic,duration})=> (
            <TableRow key={id}>
              <TableCell className="text-lg w-2/3">
                <Link href={`/companions/${id}`} className="flex items-center gap-4">
                  <div 
                    className="size-[72px] shrink-0 flex justify-center items-center rounded-lg max-md:hidden" 
                    style={{backgroundColor:getSubjectColor(subject)}}
                  >
                    <Image 
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-lg truncate">{name}</p>
                    <p className="text-muted-foreground truncate">
                      {topic}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-lg">
                <div className="max-md:hidden">
                  <span className="capitalize">{subject}</span>
                </div>
                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{backgroundColor:getSubjectColor(subject)}}>
                  <Image 
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell className="flex items-center gap-2 w-full justify-end">
                <p className="text-2xl ">
                  {duration} {' '}
                </p>
                <span className="max-md:hidden">mins</span>
                <Image src={'/icons/clock.svg'} alt="minutes" width={14} height={14} className="max-md:hidden max-sm:hidden"/>
              </TableCell>
            </TableRow>
          ))}
            
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList
