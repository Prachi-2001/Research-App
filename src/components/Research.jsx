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
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Our Research App
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[45%]">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-5">
            <BasicTabs />
          </div>
        </div>
      </div>

      {/* after login  */}

      {/* <div className="min-h-screen bg-gray-100 flex flex-col sm:py-12 justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Our Research App
        </h2>
      </div>

      <div className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md">
        <input
          type="text"
          placeholder="Search for research content"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-[40px] w-full px-3 border-[2px] border-black  rounded-md"
        />
        <AiOutlineSearch
          size={30}
          className="absolute right-2 top-1.5 cursor-pointer"
          onClick={() => handleSearch()}
        />
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          {researchResults.length !== 0 ? (
            <div className="py-4 sm:rounded-lg">
              <ul>
                {researchResults.map((result, index) => (
                  <div key={index}>
                    <h2>{result.title}</h2>
                    <span>
                      {hiddenStates[index] && result.abstract 
                        ? (`${result.abstract?.substr(0, 200).trim()}...`)
                        : (result.abstract && result.abstract)}
                      <a
                        style={{
                          color: hiddenStates[index] ? "blue" : "red",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setHiddenStates([
                            ...hiddenStates.slice(0, index),
                            !hiddenStates[index],
                            ...hiddenStates.slice(index + 1),
                          ])
                        }
                      >
                        {result.abstract ? 
                        (hiddenStates[index] && result.abstract ? "Read more" : "read less") : null }
                      </a>
                    </span>
                    <p>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Paper
                      </a>
                    </p>
                    <p>Citation Count: {result.citationCount}</p>

                    <label htmlFor={`citation-select-${index}`}>
                      Choose Citation format
                    </label>

                    <select
                      id={`citation-select-${index}`}
                      value={
                        citationStyles[index]
                          ? citationStyles[index].style
                          : "default"
                      }
                      onChange={(e) =>
                        generateCitation(
                          result.citationStyles.bibtex,
                          index,
                          e.target.value
                        )
                      }
                    >
                      <option value="default">Choose citation style..</option>
                      <option value="apa">APA</option>
                      <option value="harvard1">Harvard</option>
                      <option value="vancouver">Vancouver</option>
                      {/* Add more citation styles here */}
      {/* </select>
                    <br />
                    {citationStyles[index] && (
                      <div>
                        <h3>
                          Selected Citation Style:{" "}
                          {`${citationStyles[index].style}`}
                        </h3>
                        <button>Generate Citation</button>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: citationStyles[index].citation,
                          }}
                        />
                      </div>
                    )} */}
      {/* //               </div> */}
      {/* //             ))} */}
      {/* //           </ul> */}
      {/* //         </div>
    //       ) : (
    //         "No content found"
    //       )}
    //     </div>
    //   </div>
    // </div> */}
    </>
  );
}

export default Research;
