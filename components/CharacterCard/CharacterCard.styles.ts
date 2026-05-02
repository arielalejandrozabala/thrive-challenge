import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  aspect-ratio: 1 / 1;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$status.toLowerCase()) {
      case "alive":
        return "#d4edda";
      case "dead":
        return "#f8d7da";
      default:
        return "#d1ecf1";
    }
  }};
  color: ${(props) => {
    switch (props.$status.toLowerCase()) {
      case "alive":
        return "#155724";
      case "dead":
        return "#721c24";
      default:
        return "#0c5460";
    }
  }};
`;
