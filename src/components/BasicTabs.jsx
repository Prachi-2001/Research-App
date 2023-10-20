import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from '@mui/lab/TabContext';
import ResearchApp from "./ResearchApp";

export default function BasicTabs() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box
          sx={{
            borderRadius: "10px",
            width: "100%",
            bgcolor: "#e8e8e8",
            height: "50px", // Set the height to match your desired tab height
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="none"
            sx={{
              height: "100%", // Set the height to '100%'
              "& button": { color: "#408DF9", fontWeight: "600" },
            }}
            variant="fullWidth"
            aria-label="secondary tabs example"
          >
            <Tab
              value="one"
              label="Item One"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#408DF9",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "10px",
                  height: "100%", // Set the height to '100%'
                },
              }}
            />
            <Tab
              value="two"
              label="Item Two"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#408DF9",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "10px",
                  height: "100%", // Set the height to '100%'
                },
              }}
            />
            <Tab
              value="three"
              label="Item Three"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#408DF9",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "10px",
                  height: "100%", // Set the height to '100%'
                },
              }}
            />
            <Tab
              value="four"
              label="Item Four"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#408DF9",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "10px",
                  height: "100%", // Set the height to '100%'
                },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value="one">Content for Item One</TabPanel>
        <TabPanel value="two">Content for Item Two</TabPanel>
        <TabPanel value="three" sx={{width: "100%"}}><ResearchApp/></TabPanel>
        <TabPanel value="four">Content for Item Four</TabPanel>
      </TabContext>
    </>
  );
}
