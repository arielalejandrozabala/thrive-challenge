import { useQuery } from "@tanstack/react-query";
import { Location, ApiResponse } from "@/types/api";
import { LocationCard } from "@/components/LocationCard/LocationCard";
import { Grid, LoadingContainer, ErrorContainer } from "@/components/Grid/Grid.styles";

const fetchLocations = async (): Promise<Location[]> => {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  const data: ApiResponse<Location> = await response.json();
  return data.results;
};

interface LocationsTabProps {
  isVisible: boolean;
}

export const LocationsTab = ({ isVisible }: LocationsTabProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
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
