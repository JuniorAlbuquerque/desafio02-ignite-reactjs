import { GenreResponseProps } from "../App";
import { Button } from "./Button";
import '../styles/sidebar.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface SidebarProps {
  onChange: (id: number) => void
  selectedGenreId: number
}

export function SideBar({ onChange, selectedGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onChange(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}