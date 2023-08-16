import { useEffect, useState } from "react";
 import './App.css';
import NavBar from "./Component/NavBar";
import Main from "./Component/Main";
import Logo from "./Component/Logo";
import Input from "./Component/Input";
import NumResult from "./Component/NumResult";
import ListBox from "./Component/ListBox";
import WatchedBox from "./Component/WatchedBox";
import MovieList from "./Component/MovieList";
import WatchedList from "./Component/WatchedList";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


const KEY='fdd2163c';
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {


  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [err,setError]=useState("");


  useEffect(
    
    function () {
      async function fetchMovies() {
        
      try {
        
        setError('');
        const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`);
        const data=res.json();
        setMovies(data.Search);
      if(!res.ok){
        throw new Error("Something wrong went with fetch !!!");
      }
      }
        catch(err) {
setError(err.message);
        }

        
      }
      fetchMovies();
    },[])


  return (
    <>
      <NavBar movies={movies}>

      <Logo/>
<Input/>
<NumResult movies={movies}/>
      </NavBar>
      
      <Main>
      <ListBox >

        {!err ? <MovieList movies={movies}></MovieList> :<ErrorMessage message={err}/>}

        </ListBox>
      <WatchedBox >

        <WatchedList average={average} watched={watched}></WatchedList>
        </WatchedBox>

      </Main>


    </>
  );
}

function ErrorMessage ({message}) {
return <p className="error">
  <span>❌</span>
  {message}</p>
}



////////////////////////////Expendor///////////////////////////////


// import { useState } from 'react';
// import './style.css';

// export default function App() {
//   return (
//     <div>
//       <TextExpander>
//         Space travel is the ultimate adventure! Imagine soaring past the stars
//         and exploring new worlds. It's the stuff of dreams and science fiction,
//         but believe it or not, space travel is a real thing. Humans and robots
//         are constantly venturing out into the cosmos to uncover its secrets and
//         push the boundaries of what's possible.
//       </TextExpander>

//       <TextExpander
//         collapsedNumWords={20}
//         expandButtonText="Show text"
//         collapseButtonText="Collapse text"
//         buttonColor="#ff6622"
//       >
//         Space travel requires some seriously amazing technology and
//         collaboration between countries, private companies, and international
//         space organizations. And while it's not always easy (or cheap), the
//         results are out of this world. Think about the first time humans stepped
//         foot on the moon or when rovers were sent to roam around on Mars.
//       </TextExpander>

//       <TextExpander expanded={true} className="box">
//         Space missions have given us incredible insights into our universe and
//         have inspired future generations to keep reaching for the stars. Space
//         travel is a pretty cool thing to think about. Who knows what we'll
//         discover next!
//       </TextExpander>
//     </div>
//   );
// }

// function TextExpander(
//   {
//     collapsedNumWords=10,
//     expandButtonText="Show text",
//     collapseButtonText="Show less",
//     buttonColor="#ff6622",
//     children,
//     expanded=false,
//     className
//   }
// ) {
//   const [isexpanded,setExpanded]=useState(expanded);

//   const displayText=isexpanded ? children : children.split(' ').slice(0,collapsedNumWords).join(' ')+'...';


//   return <div className={className}><span>{displayText} </span>
  
//   {/* {isexpanded ?  <button style={{color:buttonColor}} onClick={()=>setExpanded((exp)=>!exp)}><button style={{color:buttonColor}} onClick={()=>setExpanded((exp)=>!exp)}>{collapseButtonText}</button>}</button>} */}

//   <button style={{color:buttonColor}} onClick={()=>setExpanded((exp)=>!exp)}>{ isexpanded ? collapseButtonText:expandButtonText}</button>

//   </div>;
// }
