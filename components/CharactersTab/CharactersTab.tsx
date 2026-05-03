import { useQuery } from "@tanstack/react-query";
import { Character } from "@/types/api";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";
import { api, ApiError } from "@/services/api";
import { LOADING_MESSAGES, ERROR_MESSAGES, EMPTY_MESSAGES } from "@/constants/messages";

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
    return <LoadingContainer>{LOADING_MESSAGES.characters}</LoadingContainer>;
  }

  if (error) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : ERROR_MESSAGES.generic;
    
    return <ErrorContainer>{errorMessage}</ErrorContainer>;
  }

  if (!data || data.length === 0) {
    return <ErrorContainer>{EMPTY_MESSAGES.characters}</ErrorContainer>;
  }

  return (
    <Grid>
      {data.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};
