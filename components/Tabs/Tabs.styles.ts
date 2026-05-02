import styled from "styled-components";

export const TabsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const TabList = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 30px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  background: ${(props) => (props.$active ? "#0070f3" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#666666")};
  border: none;
  border-bottom: 3px solid ${(props) => (props.$active ? "#0070f3" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -2px;

  &:hover {
    background: ${(props) => (props.$active ? "#0070f3" : "#f5f5f5")};
    color: ${(props) => (props.$active ? "#ffffff" : "#333333")};
  }
`;

export const TabPanel = styled.div<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? "block" : "none")};
`;
