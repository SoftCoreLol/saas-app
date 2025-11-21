
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
    <article className={cn('companion-list min-w-3xl max-w-6xl mx-auto px-4',className)}>
      <h2 className="font-bold text-3xl mb-6">{title}</h2>
      <Table className="border rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-lg font-semibold py-4 px-4 w-2/3">Lessons</TableHead>
            <TableHead className="text-lg font-semibold py-4 px-4">Subject</TableHead>
            <TableHead className="text-lg font-semibold py-4 px-4 text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions
              ?.filter((companion, index, self) =>
              index === self.findIndex(c => c.id === companion.id)
              ).map(({id,subject,name,topic,duration})=> (
            <TableRow key={id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="py-4 px-4 w-2/3">
                <Link href={`/companions/${id}`} className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 shrink-0 flex justify-center items-center rounded-lg"
                    style={{backgroundColor:getSubjectColor(subject)}}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={35}
                      height={35}
                      className="max-md:hidden"
                    />
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={24}
                      height={24}
                      className="md:hidden"
                    />
                  </div>
                  <div className="flex flex-col md:max-w-40">
                    <p className="font-semibold text-lg truncate">{name}</p>
                    <p className="text-muted-foreground truncate text-base">
                      {topic}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex items-center">
                  <span className="capitalize max-md:hidden">{subject}</span>
                  <div className="flex items-center justify-center rounded-lg w-10 h-10 p-2 md:hidden" style={{backgroundColor:getSubjectColor(subject)}}>
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <p className="text-xl font-medium">
                    {duration}
                  </p>
                  <span className="max-md:hidden text-muted-foreground ml-1">mins</span>
                  <Image
                    src={'/icons/clock.svg'}
                    alt="minutes"
                    width={16}
                    height={16}
                    className="max-md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList
