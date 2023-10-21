import React, { useState } from "react";
import axios from "axios";
import Cite from "citation-js";
import { AiOutlineSearch } from "react-icons/ai";
import ReactReadMoreReadLess from "react-read-more-read-less";
import BasicTabs from "./BasicTabs";
import ResearchApp from "./ResearchApp";

function Research() {
  const [searchTerm, setSearchTerm] = useState("");
  const [researchResults, setResearchResults] = useState([]);
  const [citationStyles, setCitationStyles] = useState({}); // Store citation styles for each item
  const [hiddenStates, setHiddenStates] = useState(new Array(10).fill(true));

  const generateCitation = (data, itemIndex, style) => {
    const reference = new Cite(data);

    const format = "text";
    const citationStyle = {
      apa: reference.format("bibliography", {
        template: "apa",
        format,
      }),
      harvard1: reference.format("bibliography", {
        template: "harvard1",
        format,
      }),
      vancouver: reference.format("bibliography", {
        template: "vancouver",
        format,
      }),
      // Add more citation styles here
    };

    setCitationStyles({
      ...citationStyles,
      [itemIndex]: {
        style,
        citation: citationStyle[style],
      },
    });

    console.log(citationStyles);
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.post(
          "https://api.gyanibooks.com/search_publication/",
          {
            keyword: searchTerm,
            limit: 10,
          }
        );
        const researchData = response.data.data;
        setResearchResults(researchData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-gray-100 flex flex-col sm:py-12 justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-[45%]">
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            Research App
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[45%]">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-5">
            <BasicTabs />
          </div>
        </div>
      </div>
    </>
  );
}

export default Research;
