"use client";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  url: string;
  search: string;
};

const Search = ({ url, search }: Props) => {
  const [keyword, setKeyword] = useState<string>(search);
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`${url}?search=${keyword}`);
  };

  return (
    <div className="relative w-full">
  <input
    type="text"
    id="keyword"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    className="text-base w-full rounded-xl pl-10 p-3 bg-white border border-secondary focus:border-primary focus:outline-none"
    placeholder="Search something good in your mind"
    onKeyUp={handleSearch}
  />
  {/* iicon search */}
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
    <FaSearch />
  </div>
</div>
  );
};
export default Search;
