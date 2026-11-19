"use client";

import { Counter } from "@/components/ui/counter";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function Example() {
  return (
    <Tabs className="w-full max-w-xl">
      <TabList aria-label="Prospect detail">
        <Tab id="overview">Overview</Tab>
        <Tab id="activity">Activity <Counter>14</Counter></Tab>
        <Tab id="signals">Buying signals</Tab>
        <Tab id="notes">Notes</Tab>
      </TabList>
      <TabPanel id="overview" className="text-fg-secondary">Profile, company and ICP fit.</TabPanel>
      <TabPanel id="activity" className="text-fg-secondary">Emails, replies and meetings.</TabPanel>
      <TabPanel id="signals" className="text-fg-secondary">Funding, hiring and intent signals.</TabPanel>
      <TabPanel id="notes" className="text-fg-secondary">Team notes.</TabPanel>
    </Tabs>
  );
}
