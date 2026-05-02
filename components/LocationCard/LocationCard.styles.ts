import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const CardType = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const TypeLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 8px;
`;
