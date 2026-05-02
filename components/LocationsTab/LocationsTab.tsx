import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/api";
import { LocationCard } from "@/components/LocationCard/LocationCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";
import { api } from "@/services/api";

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
    return (
      <ErrorContainer>
        Error loading locations: {(error as Error).message}
      </ErrorContainer>
    );
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
