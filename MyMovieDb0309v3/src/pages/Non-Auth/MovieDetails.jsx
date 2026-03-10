import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await apiClient.getOne(`/movie/${id}`);
                setMovie(response.data);        
            }   catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <Card className="bg-white shadow-md rounded-lg overflow-hidden w-1/4">
                <CardHeader>
                    <CardTitle>{movie.title}</CardTitle>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </CardHeader>
                <CardDescription className="p-4">{movie.description}</CardDescription>
                <CardContent>
                   
                    {movie.release_date && <p><strong>Release Date:</strong> {movie.release_date}</p>   }
                    {movie.rating && <p><strong>Rating:</strong> {movie.rating}</p>}
                    {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
                    {movie.runtime && <p><strong>Runtime:</strong> {movie.runtime} minutes</p>}
                           
                    {movie.budget
                        ? <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
                        : <p><strong>Budget:</strong> N/A</p>
                    }
                    {movie.box_office
                        ? <p><strong>Box Office:</strong> ${movie.box_office.toLocaleString()}</p>
                        : <p><strong>Box Office:</strong> N/A</p>
                    }      
{movie.director && <p><strong>Director:</strong> {movie.director}</p>}
                    {movie.cast && <p><strong>Cast:</strong> {movie.cast.join(", ")}</p>}
                    {movie.trailer && (
                        <div>
                            <strong>Trailer:</strong>
                            <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Watch Trailer
                            </a>
                        </div>
                    )}  
                    {movie.reviews && (
                        <div>
                            <strong>Reviews:</strong>
                            <ul className="list-disc list-inside">
                                {movie.reviews.map((review, index) => (
                                    <li key={index}>{review}</li>
                                ))}
                            </ul>
                        </div>
                    )}   

                </CardContent>
                <CardFooter>
                    
                    <Link to="/" className="text-blue-500 hover:underline"> Back to Home</Link>     
                </CardFooter>
            </Card>
        </div>    );
}

export default MovieDetails;    
