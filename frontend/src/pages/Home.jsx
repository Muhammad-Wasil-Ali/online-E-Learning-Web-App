import Hero from "@/components/homePageComponents/Hero";
import { LatestCourses } from "@/components/homePageComponents/LatestCourses";
import SearchBar from "@/components/homePageComponents/SearchBar";
import { StatCounter } from "@/components/homePageComponents/StatCounter";
import { Testmonials } from "@/components/homePageComponents/Testmonials";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <SearchBar /> */}
      <LatestCourses />
      <StatCounter />
      <Testmonials />
    </div>
  );
};

export default Home;
