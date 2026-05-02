import { useState } from "react";
import styled from "styled-components";
import { CharactersTab } from "@/components/CharactersTab/CharactersTab";
import { LocationsTab } from "@/components/LocationsTab/LocationsTab";
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
        <TabList>
          <TabButton
            $active={activeTab === "characters"}
            onClick={() => setActiveTab("characters")}
          >
            Characters
          </TabButton>
          <TabButton
            $active={activeTab === "locations"}
            onClick={() => setActiveTab("locations")}
          >
            Locations
          </TabButton>
        </TabList>

        <TabPanel $visible={activeTab === "characters"}>
          <CharactersTab isVisible={activeTab === "characters"} />
        </TabPanel>

        <TabPanel $visible={activeTab === "locations"}>
          <LocationsTab isVisible={activeTab === "locations"} />
        </TabPanel>
      </TabsContainer>
    </PageContainer>
  );
}
