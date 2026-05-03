import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/api";
import { LocationCard } from "@/components/LocationCard/LocationCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";
import { api, ApiError } from "@/services/api";
import { LOADING_MESSAGES, ERROR_MESSAGES, EMPTY_MESSAGES } from "@/constants/messages";

interface LocationsTabProps {
  isVisible: boolean;
}

export const LocationsTab = ({ isVisible }: LocationsTabProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["locations"],
    queryFn: api.locations.getAll,
    enabled: isVisible,
  });

  if (isLoading) {
    return <LoadingContainer>{LOADING_MESSAGES.locations}</LoadingContainer>;
  }

  if (error) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : ERROR_MESSAGES.generic;
    
    return <ErrorContainer>{errorMessage}</ErrorContainer>;
  }

  if (!data || data.length === 0) {
    return <ErrorContainer>{EMPTY_MESSAGES.locations}</ErrorContainer>;
  }

  return (
    <Grid>
      {data.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </Grid>
  );
};
