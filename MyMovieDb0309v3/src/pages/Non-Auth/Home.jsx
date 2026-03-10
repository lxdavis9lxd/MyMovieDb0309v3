import { Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import MovieDetails from "./MovieDetails";
function Home (){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await apiClient.getAll("/movie/popular");
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Latest Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <Card key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <CardHeader>
                            <CardTitle>{movie.title}</CardTitle>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{movie.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Link to={`/moviedetails/${movie.id}`} className="text-blue-500 hover:underline"> View Details</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Home;
