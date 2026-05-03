import { Location } from "@/types/api";
import { Card, CardTitle, CardType, TypeLabel } from "./LocationCard.styles";
import { UI_LABELS } from "@/constants/messages";

interface LocationCardProps {
  location: Location;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <Card>
      <CardTitle>{location.name}</CardTitle>
      <CardType>
        <TypeLabel>{UI_LABELS.type}</TypeLabel>
        {location.type}
      </CardType>
    </Card>
  );
};
