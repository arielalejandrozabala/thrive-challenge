export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
}

export interface ApiResponse<T> {
  results: T[];
}
