import CardMovie from "./CardMovie";
import { Row } from "react-bootstrap";
import Paginationcomponent from "./Pagination";

const MovieList = ({ Movies, getpage, totalPage, currentPage }) => {
  return (
    <Row className="mt-3">
      {Movies.length >= 1 ? (
        Movies.map((mov) => {
          return <CardMovie key={mov.id} mov={mov} />;
        })
      ) : (
        <h1 className="py-5 text-center">لا يوجد افلام ...</h1>
      )}
      {Movies.length >= 1 ? (
        <Paginationcomponent
          getpage={getpage}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      ) : null}
    </Row>
  );
};

export default MovieList;
