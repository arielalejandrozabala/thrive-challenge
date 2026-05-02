import { useQuery } from "@tanstack/react-query";
import { Character } from "@/types/api";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";
import { api } from "@/services/api";

interface CharactersTabProps {
  isVisible: boolean;
}

export const CharactersTab = ({ isVisible }: CharactersTabProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: api.characters.getAll,
    enabled: isVisible,
  });

  if (isLoading) {
    return <LoadingContainer>Loading characters...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        Error loading characters: {(error as Error).message}
      </ErrorContainer>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Grid>
      {data.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};
