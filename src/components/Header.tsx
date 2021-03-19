interface GenreResponseProps {
  selectedGenre: {
    title: string;
  };
}

export function Header(props: GenreResponseProps) {
  return (
    <header>
      <span className='category'>
        Categoria:<span> {props.selectedGenre.title}</span>
      </span>
    </header>
  );
}
