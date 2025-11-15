"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current subject from URL once on mount
  const initialSubject = searchParams.get("subject") || "all";
  const [subject, setSubject] = useState(initialSubject);

  // Only update URL when subject changes, no sync back from URL
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      
      if (subject === "all" || !subject) {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });
      }
      
      router.push(newUrl, { scroll: false });
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [subject]); // Only depend on subject

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="w-full sm:w-[180px] input capitalize">
        <SelectValue placeholder="Filter by subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subjectItem) => (
          <SelectItem key={subjectItem} value={subjectItem} className="capitalize">
            {subjectItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
  
export default SubjectFilter;