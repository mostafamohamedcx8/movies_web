import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const MovieDetalis = () => {
  const { id } = useParams();
  const [Movie, setMovie] = useState([]);

  // Fetch movie data from API using the provided ID
  const getMovieDetails = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ar`
    );
    setMovie(res.data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <Container className="pt-1">
      <Row className="justify-content-center">
        <Col
          md="12"
          xs="12"
          sm="12"
          className=" mt-4 card-detalis d-flex align-items-center"
        >
          <img
            className="img-movie w-30"
            src={`https://image.tmdb.org/t/p/w500${Movie.backdrop_path}`}
            alt="بوستر الفيلم"
          />
          <div className="justify-content-center  text-center mx-auto">
            <p className="card-text-details border-bottom">
              اسم الفيلم: {Movie.title}
            </p>
            <p className="card-text-details border-bottom">
              تاريخ الفيلم: {Movie.release_date}
            </p>
            <p className="card-text-details border-bottom">
              عدد المقيمين:{Movie.vote_count}
            </p>
            <p className="card-text-details border-bottom">
              التقييم: {Movie.vote_average}
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center ">
        <Col md="12" xs="12" sm="12" className=" mt-1">
          <div className="card-story d-flex flex-column align-item-start">
            <div className="text-end p-4">
              <p className="card-text-title border-bottom">القصة:</p>
            </div>
            <div className="text-end p-4">
              <p className="card-text-story ">{Movie.overview}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={8} className="d-flex justify-content-between">
          <Link to="/">
            <Button variant="warning">العودة للرئيسية</Button>
          </Link>
          <a href={Movie.homepage}>
            <Button variant="danger">مشاهدة الفيلم</Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetalis;
