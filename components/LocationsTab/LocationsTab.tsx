import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/api";
import { LocationCard } from "@/components/LocationCard/LocationCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";
import { api, ApiError } from "@/services/api";

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
    return <LoadingContainer>Loading locations...</LoadingContainer>;
  }

  if (error) {
    // Show friendly message to user
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : "Oops, algo salió mal. Por favor intenta de nuevo.";
    
    return <ErrorContainer>{errorMessage}</ErrorContainer>;
  }

  if (!data) {
    return null;
  }

  return (
    <Grid>
      {data.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </Grid>
  );
};
