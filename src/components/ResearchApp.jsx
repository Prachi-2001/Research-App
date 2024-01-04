import React, { useState } from "react";
import axios from "axios";
import Cite from "citation-js";
import { Paginator } from "primereact/paginator";
import { AiOutlineSearch } from "react-icons/ai";

const ResearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [researchResults, setResearchResults] = useState([]);
  const [citationStyles, setCitationStyles] = useState({});
  const [hiddenStates, setHiddenStates] = useState(new Array(10).fill(true));
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

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
      bibtex: reference.format("bibtex", {
        format,
      }),
      biblatex: reference.format("biblatex", {
        format,
      }),
      bibtxt: reference.format("bibtxt", {
        format,
      }),
      ris: reference.format("ris", {
        format,
      }),
    };

    setCitationStyles({
      ...citationStyles,
      [itemIndex]: {
        style,
        citation: citationStyle[style],
      },
    });
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.post(
          "https://api.gyanibooks.com/search_publication/",
          {
            keyword: searchTerm,
            limit: 100,
          }
        );
        const researchData = response?.data?.data;
        setResearchResults(researchData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderPapers = () => {
    const visiblePapers = researchResults?.slice(first, first + rows);
    return visiblePapers?.map((result, index) => (
      <div key={index} className="bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="font-bold text-[18px]">{result?.title}</h2>
        <br />
        <p>
          <span>
            {hiddenStates[index] && result.abstract
              ? `${result.abstract?.substr(0, 200).trim()}...`
              : result.abstract && result.abstract}
            <a
              style={{
                color: hiddenStates[index] ? "#408DF9" : "red",
                cursor: "pointer",
              }}
              onClick={() =>
                setHiddenStates([
                  ...hiddenStates?.slice(0, index),
                  !hiddenStates[index],
                  ...hiddenStates?.slice(index + 1),
                ])
              }
            >
              {result?.abstract
                ? hiddenStates[index] && result?.abstract
                  ? "Read more"
                  : "Read less"
                : null}
            </a>
          </span>
        </p>
        <p>
          <a
            href={result?.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#408DF9", // Change the color to your preference
              fontWeight: "bold",
              borderBottom: "2px solid #408DF9", // Add a bottom border for emphasis
            }}
          >
            View Paper
          </a>
        </p>

        <p>Citation Count: {result?.citationCount}</p>

        <label htmlFor={`citation-select-${index}`}>
          Choose Citation format
        </label>

        <select
          id={`citation-select-${index}`}
          value={
            citationStyles[index] ? citationStyles[index].style : "default"
          }
          onChange={(e) =>
            generateCitation(
              result?.citationStyles?.bibtex,
              index,
              e.target.value
            )
          }
          className="ml-4"
          style={{
            backgroundColor: "#408DF9",
            color: "white",
            padding: "5px",
            fontWeight: "bold",
            borderRadius: "15px",
            maxWidth: "90px",
          }}
        >
          <option value="default">Cite</option>
          <option value="apa">APA</option>
          <option value="harvard1">Harvard</option>
          <option value="bibtex">bibtex</option>
          <option value="biblatex">biblatex</option>
          <option value="bibtxt">bibtxt</option>
        </select>

        <br />
        {citationStyles[index] && (
          <div className="mt-1">
            <h3>Selected Citation Style: {citationStyles[index].style}</h3>
            <button className="font-semibold mb-2">Generated Citation</button>
            <p
              dangerouslySetInnerHTML={{
                __html: citationStyles[index].citation,
              }}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <div>
        <div className="w-full flex justify-between relative">
          <div className="w-[88%]">
            <input
              type="text"
              placeholder="Search for research content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[40px] w-full px-3 border-[2px] bg-[#eaf5fc] rounded-md"
            />
          </div>
          <div className="bg-[#408DF9] w-[10%] rounded-[10px]">
            <AiOutlineSearch
              size={30}
              className="absolute right-3 top-1.5 cursor-pointer border-none text-white"
              onClick={() => handleSearch()}
            />
          </div>
        </div>
        <div className="py-4 sm:rounded-lg">
          {researchResults?.length !== 0 ? (
            <div>
              <ul>{renderPapers()}</ul>
              <div className="card">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={researchResults?.length}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          ) : (
            "No content found"
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchApp;
