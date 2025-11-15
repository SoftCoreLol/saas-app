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
    setSearchQuery(topicQuery);
  }, [topicQuery]);

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
      const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
      if (currentUrl !== newUrl) {
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
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-3 py-2 h-11 w-full sm:w-80">
      <Image src={'/icons/search.svg'} alt="search" width={18} height={18}/>
      <input
        placeholder={placeholder}
        className="outline-none w-full text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
