import { Location } from "@/types/api";
import { Card, CardTitle, CardType, TypeLabel } from "./LocationCard.styles";

interface LocationCardProps {
  location: Location;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  return (
    <Card>
      <CardTitle>{location.name}</CardTitle>
      <CardType>
        <TypeLabel>Type:</TypeLabel>
        {location.type}
      </CardType>
    </Card>
  );
};
