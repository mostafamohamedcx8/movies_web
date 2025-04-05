import { Container } from "react-bootstrap";
import NavBar from "./component/NavBar";
import MovieList from "./component/MoviesList";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MovieDetalis from "./component/MovieDetails";
import axios from "axios";

function App() {
  const [Movies, setMovies] = useState([]);
  const [totalPage, settotalPage] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const getAllMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ar`
    );
    setMovies(res.data.results);
    settotalPage(res.data.total_pages);
    setCurrentPage(0);
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  const search = async (word) => {
    setSearchWord(word);
    setCurrentPage(0);
    console.log(currentPage);
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${word}`
      );
      setMovies(res.data.results);
      settotalPage(res.data.total_pages);
    }
  };

  const getpage = async (page) => {
    setCurrentPage(page - 1);
    let res;
    if (searchWord !== "") {
      res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchWord}&page=${page}`
      );
    } else {
      res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
      );
    }
    setMovies(res.data.results);
    settotalPage(res.data.total_pages);
  };

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  Movies={Movies}
                  getpage={getpage}
                  totalPage={totalPage}
                  currentPage={currentPage}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetalis />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
