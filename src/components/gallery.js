import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



export default function ImageGallery() {
  const [movies, setMovies] = useState([]);
  const queryParams = new URLSearchParams(window.location.search)
  const mov = queryParams.get("mov");
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");
  const requestOptions = {
    method: 'get', 
    headers: {
      
      'User': userName, 
         'Authorization': ('Bearer '+ token),
      
    }
    };

      useEffect(() => {
              if (mov == 0){
                fetch(`http://localhost:8084/api/movie/getMovies`,requestOptions)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                  })
              } else{
              fetch(`http://localhost:8082/api/movie/getRecommendationForMovie/${mov}`,requestOptions)
              .then(response => response.json())
              .then(data => {
                  setMovies(data.results);
                })}
            
        }, []);

  
return (
    <ImageList  sx={{ width: '60%', height: '100%', margin: 'auto', py: 15 }} variant="mansory" cols={3} gap={8}>
      {movies.map(movie => (
        <ImageListItem key={movie.id}>
          <a href={`http://localhost:3000/recommendation/?mov=${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="MuiImageListItem-img"/>
            </a>
          </ImageListItem>
      ))}
    </ImageList>
  );
};

