export interface Review {
  author: string;
  authorId: number;
  date: Date;
  id: number;
  rating: number;
  text: string;
}

export interface Movie {
  actors: string[];
  bgColor: string;
  bgPoster: string;
  src: string;
  description: string;
  director: string;
  genre: string;
  id: number;
  isFavorite: boolean;
  poster: string;
  previewPoster: string;
  rating: {
    count: number,
    score: number,
  };
  releaseYear: number;
  runTime: number;
  title: string;
};
