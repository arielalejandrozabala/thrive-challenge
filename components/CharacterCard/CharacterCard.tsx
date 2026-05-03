import { Character } from "@/types/api";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardInfo,
  InfoRow,
  InfoLabel,
  StatusBadge,
} from "./CharacterCard.styles";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Card>
      <CardImage 
        src={character.image} 
        alt={`${character.name}, ${character.species}`}
      />
      <CardContent>
        <CardTitle>{character.name}</CardTitle>
        <CardInfo>
          <InfoRow>
            <InfoLabel>Status:</InfoLabel>
            <StatusBadge $status={character.status}>
              {character.status}
            </StatusBadge>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Species:</InfoLabel>
            <span>{character.species}</span>
          </InfoRow>
        </CardInfo>
      </CardContent>
    </Card>
  );
};
