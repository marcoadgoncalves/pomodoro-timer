import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Timer } from "./Timer";
import { useState } from "react";

const BG_COLORS = {
  "Pomodoro time": "#ba4949",
  "Short rest": "#38858a",
  "Long rest": "#397097",
};

function App() {
  const [currentTimer, setCurrentTimer] =
    useState<keyof typeof BG_COLORS>("Pomodoro time");

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: BG_COLORS[currentTimer],
        borderRadius: "10px",
      }}
    >
      <Tabs>
        <TabList>
          <Tab onClick={() => setCurrentTimer("Pomodoro time")}>
            Pomodoro time
          </Tab>
          <Tab onClick={() => setCurrentTimer("Short rest")}>Short rest</Tab>
          <Tab onClick={() => setCurrentTimer("Long rest")}>Long rest</Tab>
        </TabList>
        <TabPanel>
          <Timer timeLeft={25} description="Pomodoro" />
        </TabPanel>
        <TabPanel>
          <Timer timeLeft={5} description="Short rest" />
        </TabPanel>
        <TabPanel>
          <Timer timeLeft={15} description="Long rest" />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
