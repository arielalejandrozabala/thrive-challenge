import { useState } from "react";
import styled from "styled-components";
import { CharactersTab } from "@/components/CharactersTab";
import { LocationsTab } from "@/components/LocationsTab";
import { TabsContainer, TabList, TabButton, TabPanel } from "@/components/Tabs/Tabs.styles";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0 0 40px 0;
`;

type TabType = "characters" | "locations";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("characters");

  return (
    <PageContainer>
      <Title>Rick and Morty Explorer</Title>
      <TabsContainer>
        <TabList role="tablist" aria-label="Content sections">
          <TabButton
            id="tab-characters"
            role="tab"
            aria-selected={activeTab === "characters"}
            aria-controls="panel-characters"
            $active={activeTab === "characters"}
            onClick={() => setActiveTab("characters")}
          >
            Characters
          </TabButton>
          <TabButton
            id="tab-locations"
            role="tab"
            aria-selected={activeTab === "locations"}
            aria-controls="panel-locations"
            $active={activeTab === "locations"}
            onClick={() => setActiveTab("locations")}
          >
            Locations
          </TabButton>
        </TabList>

        <TabPanel
          id="panel-characters"
          role="tabpanel"
          aria-labelledby="tab-characters"
          $visible={activeTab === "characters"}
        >
          <CharactersTab isVisible={activeTab === "characters"} />
        </TabPanel>

        <TabPanel
          id="panel-locations"
          role="tabpanel"
          aria-labelledby="tab-locations"
          $visible={activeTab === "locations"}
        >
          <LocationsTab isVisible={activeTab === "locations"} />
        </TabPanel>
      </TabsContainer>
    </PageContainer>
  );
}
