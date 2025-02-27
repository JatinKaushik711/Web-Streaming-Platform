import { IMG_CDN_URL } from "../utils/constants";


const MovieCard = ({posterPath}) => {
    return (
    <div className="w-48 pr-2 hover:cursor-pointer" >
       <img className="rounded-md"
       alt="MovieCard"
       src={IMG_CDN_URL + posterPath}/>
    </div>
    );
};

export default MovieCard;