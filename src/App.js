import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const STAR_WARS_FILMS = gql`
  {
    allFilms(first: 6, orderBy: releaseDate_ASC) {
      episodeId
      title
      releaseDate
      director
    }
  }
`;

export default function App() {
  const { loading: loadingFilms, error: errorFilm, data: dataFilms } = useQuery(
    STAR_WARS_FILMS
  );

  if (loadingFilms) return <p>Loading...</p>;
  if (errorFilm) return <p>There's an error: {errorFilm.message}</p>;

  console.dir(dataFilms);

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '18px',
    cursor: 'pointer'
  };

  const main_box = {
    border: '1px solid #eee',
    boxShadow: '0 2px 2px #ccc',
    width: '400px',
    padding: '20px'
    
  }

  

  const films = dataFilms.allFilms.map(film => (
    
    <div style={main_box}>
      <p key={film.episodeId}></p>

      <p> <b>Title:{" "} </b>{film.title}</p>
      <p> <b>Director:{" "}</b> {film.director}</p>
      <p> <b>Release Date:</b>{" "}{film.releaseDate.substr(0, 4)}</p>
    </div>
    
  ));
  return (
    <Fragment>
      <h1>Star Wars Films</h1>
      {films}
  </Fragment>
  );
}