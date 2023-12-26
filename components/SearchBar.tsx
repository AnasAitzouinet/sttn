"use client";
import React from "react";
import {RiSearchLine} from "react-icons/ri";
import { BeakerIcon } from '@heroicons/react/24/solid'
import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
interface SearchBarProps {
  classDiv?: string;
  classInput?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({classDiv,classInput,placeholder,onChange}:SearchBarProps) => {
  return (
    <div className={twMerge("text-white flex flex-row-reverse gap-5 justify-center items-center px-2",classDiv)}>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder || "Search for a destination"}
        autoCorrect="false"
        className={twMerge("bg-transparent border-white rounded-m placeholder-gray-400 text-gray-200 placeholder:text-sm placeholder:text-left text-md focus:ring-0 focus:outline-none focus:border-white border-b-2 border-t-0 border-l-0 border-r-0", classInput)}
      />
      <Search className="text-center h-8 w-8 my-2"/>
    </div>
  );
};

export default SearchBar;
