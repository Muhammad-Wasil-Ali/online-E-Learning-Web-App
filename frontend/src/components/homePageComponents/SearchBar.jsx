// components/SearchBar.jsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 py-10 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 px-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={24}
          />
          <Input
            placeholder="Search courses, skills, or categories..."
            className="pl-14 pr-6 py-5 text-lg bg-white border border-gray-300 rounded-2xl shadow-md focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all"
          />
        </div>

        {/* Search Button */}
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-5 rounded-2xl shadow-md w-full sm:w-auto transition-all">
          Search
        </Button>
      </div>
    </section>
  );
};

export default SearchBar;
