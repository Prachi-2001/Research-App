import React, { useState } from "react";
import axios from "axios";
import Cite from "citation-js";
import { AiOutlineSearch } from "react-icons/ai";

const ResearchApp = () => {
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
    <div>
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for research content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[40px] w-full px-3 border-[2px] border-black rounded-md"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
            onClick={() => handleSearch()}
          />
        </div>
        <div className="py-4 sm:rounded-lg">
          {researchResults.length !== 0 ? (
            <ul>
              {researchResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow-md rounded-md mb-4"
                >
                  <h2>{result.title}</h2>
                  <br />
                  <p>
                    {" "}
                    <span>
                      {hiddenStates[index] && result.abstract
                        ? `${result.abstract?.substr(0, 200).trim()}...`
                        : result.abstract && result.abstract}
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
                        {result.abstract
                          ? hiddenStates[index] && result.abstract
                            ? "Read more"
                            : "Read less"
                          : null}
                      </a>
                    </span>
                  </p>
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
                  </select>
                  <br />
                  {citationStyles[index] && (
                    <div>
                      <h3>
                        Selected Citation Style: {citationStyles[index].style}
                      </h3>
                      <button>Generate Citation</button>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: citationStyles[index].citation,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </ul>
          ) : (
            "No content found"
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchApp;
