import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';
import { Header } from './Header';

import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreIdProps {
  selectedGenreId: number;
}

export function Content(props: GenreIdProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${props.selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [props.selectedGenreId]);

  // Complete aqui
  return (
    <div className='container'>
      <Header selectedGenre={selectedGenre} />

      <main>
        <div className='movies-list'>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
