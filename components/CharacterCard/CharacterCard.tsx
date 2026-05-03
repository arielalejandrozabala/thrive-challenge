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
import { UI_LABELS } from "@/constants/messages";

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
            <InfoLabel>{UI_LABELS.status}</InfoLabel>
            <StatusBadge $status={character.status}>
              {character.status}
            </StatusBadge>
          </InfoRow>
          <InfoRow>
            <InfoLabel>{UI_LABELS.species}</InfoLabel>
            <span>{character.species}</span>
          </InfoRow>
        </CardInfo>
      </CardContent>
    </Card>
  );
};
