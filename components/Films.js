import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.scss'

const Films = ( { films } ) => 
{
    const [movies, setMovies] = useState(films);
    const [favs, setFavs] = useState([]);

    const searcher = event =>
    {
        console.log(movies);
        const query = event.target.value.toLowerCase();
        if(!query)
            setMovies(films)
        setMovies(
            prev => films.filter(
                film => film.properties.title.toLowerCase().startsWith(query)
            )
        )
    }

    const saveFav = event =>
    {
        const id = event.target.id
        if(favs.includes(id))
            setFavs(prev => prev.filter(fav => fav !== id))
        else
            setFavs(prev => [...prev, id])
    }

    useEffect(
        () => 
        {
            if(window.localStorage.getItem('favs'))
                setFavs(JSON.parse(window.localStorage.getItem('favs')))
        }, 
        []
    )

    useEffect(
        () => 
        {
            if(favs.length > 0)
                window.localStorage.setItem('favs', JSON.stringify(favs))
            else
                window.localStorage.removeItem('favs')
        }, 
        [favs]
    )

    return ( 
        <div className={styles.container}>
            <div>
                <label>Search Film: </label>
                <input type='text' onChange={searcher} />
            </div>
            <div>
                <div>
                    <h2 style={ { textAlign: "center" } }>
                        List of Star Wars Films
                    </h2>
                </div>
                <div>
                    {
                        (movies.length > 0) 
                            ? 
                            <>
                                {
                                    movies.map(
                                        film => {
                                            if(favs.includes(film.uid))
                                                return (
                                                    <div className={styles.filmlist} key={film._id}>
                                                        <Link href={`/films/${film.uid}`}>
                                                            <a>{film.properties.title}</a>
                                                        </Link> 
                                                        <span id={film.uid} onClick={saveFav} style={ { color: favs.includes(film.uid) ? 'red' : 'black' } }>FAV</span>
                                                    </div>
                                                )
                                        }
                                    )
                                }
                                {
                                    movies.map(
                                        film => {
                                            if(!favs.includes(film.uid))
                                                return (
                                                    <div className={styles.filmlist} key={film._id}>
                                                        <Link href={`/films/${film.uid}`}>
                                                            <a>{film.properties.title}</a>
                                                        </Link> 
                                                        <span id={film.uid} onClick={saveFav} style={{color: favs.includes(film.uid) ? 'red' : 'black'}}>FAV</span>
                                                    </div>
                                                )
                                        }
                                    )           
                                }
                            </>
                            : 
                                <p>No Film matching your query</p>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Films;