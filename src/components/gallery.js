import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



export default function ImageGallery() {
    const [movies, setMovies] = useState([]); //nowy
    const queryParams = new URLSearchParams(window.location.search)
    const mov = queryParams.get("mov")

        useEffect(() => {
            // Pobierz dane z pliku JSON
            fetch(`http://localhost:8082/api/movie/getRecommendationForMovie/${mov}`)
            .then(response => response.json())
            .then(data => {
                // const results = data.results.filter(result => result.adult == false);
                // console.log(results);
                setMovies(data.results);
              })
        }, []);

  
return (
    <ImageList  sx={{ width: '60%', height: '100%', margin: 'auto', py: 15 }} variant="mansory" cols={3} gap={8}>
      {movies.map(movie => (
        <ImageListItem key={movie.id}>
          <a href={`http://localhost:3000/?mov=${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="MuiImageListItem-img"/>
            </a>
          </ImageListItem>
      ))}
    </ImageList>
  );
};

