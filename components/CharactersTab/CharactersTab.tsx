import { useQuery } from "@tanstack/react-query";
import { Character, ApiResponse } from "@/types/api";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";

const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data: ApiResponse<Character> = await response.json();
  return data.results;
};

interface CharactersTabProps {
  isVisible: boolean;
}

export const CharactersTab = ({ isVisible }: CharactersTabProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
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
