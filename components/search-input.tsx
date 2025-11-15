'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search Companions..."
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicQuery = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState(topicQuery);
  const debouncedTimeout = useRef<NodeJS.Timeout | null>(null);

  // Update local state when URL parameter changes
  useEffect(() => {
    if (topicQuery !== searchQuery) {
      setSearchQuery(topicQuery);
    }
  }, [topicQuery, searchQuery]);

  // Debounced search handler
  useEffect(() => {
    if (debouncedTimeout.current) {
      clearTimeout(debouncedTimeout.current);
    }

    debouncedTimeout.current = setTimeout(() => {
      let newUrl = '';

      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'topic',
          value: searchQuery
        });
      } else {
        newUrl = removeKeysFromUrlQuery({ params: searchParams.toString(), keysToRemove: ['topic']})
      }

      // Only push to router if the URL has actually changed
      if (pathname + searchParams.toString() !== newUrl) {
        router.push(newUrl, { scroll: false });
      }
    }, 500); // 500ms debounce delay

    return () => {
      if (debouncedTimeout.current) {
        clearTimeout(debouncedTimeout.current);
      }
    };
  }, [searchQuery, searchParams, router, pathname]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src={'/icons/search.svg'} alt="search" width={16} height={16}/>
      <input
        placeholder={placeholder}
        className="outline-none w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
