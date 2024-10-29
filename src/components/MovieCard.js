import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constans";

const MovieCard = ({ posterPath, movieID }) => {
  if (!posterPath) return null;
 // console.log(movieID);
  return (
    <div className="w-36 md:w-48 pr-4">
      <Link to={`/watch/${movieID}`}>
        <img
          alt="Movie Card"
          src={IMG_CDN_URL + posterPath}
          className="rounded-md transition-transform transform hover:scale-110"
        />
      </Link>
    </div>
  );
};
export default MovieCard;
