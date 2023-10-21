import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
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
            bgcolor: "#f1f3f5",
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
              label="SUMMARISE"
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
              label="ELABORATE"
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
              label="RESEARCH"
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
              label="CHAT WITH PDF"
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
        <TabPanel value="one">Summarise text</TabPanel>
        <TabPanel value="two">Elaborate text</TabPanel>
        <TabPanel value="three" sx={{ paddingRight: 0, paddingLeft: 0}}>
          <ResearchApp />
        </TabPanel>

        <TabPanel value="four">Chat with pdf feature</TabPanel>
      </TabContext>
    </>
  );
}
