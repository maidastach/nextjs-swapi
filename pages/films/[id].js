import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styles from '../../styles/Film.module.scss'

const getCharacters = async film => 
{
    const characters = await Promise.all(
        film.properties.characters.map(
            async character => {
                const res = await axios.get(character);
                return res.data.result
            }
        )
    )
    return characters
}

export const getStaticPaths = async() =>
{
  const res = await axios.get('https://www.swapi.tech/api/films')
  const paths = await res.data.result.map(
      film => (
          {
            params: { id: film.uid.toString() }
        }
      )
  )
  return {
      paths,
      fallback: false
  }
}

export const getStaticProps = async(context) =>
{
    const id = context.params.id
    const res = await axios.get(`https://www.swapi.tech/api/films/${id}`)

    const characters = await getCharacters(res.data.result)

    return {
        props: { film: res.data.result, characters: characters}
      }
}

const Film = ( { film, characters } ) => 
{
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltip, setTooltip] = useState({})

    const createTooltip = event =>
    {
        const id = event.target.id
        const char = characters.find(ele => ele.uid === id)
        const character = {
            name: char.properties.name,
            birth: char.properties.birth_year,
            eye: char.properties.eye_color,
            gender: char.properties.gender,
            hair: char.properties.hair_color,
            mass: char.properties.mass,
            height: char.properties.height,
            skin: char.properties.skin_color,
            source: char.properties.url,
        }
        setShowTooltip(true)
        setTooltip(prev => character)
    }

    //this function can make the tooltip disappear onMouseLeave event
    const hideTooltip = () =>
    {
        setShowTooltip(false)
        setTooltip({})
    }

    return (
        <>
            <Head>
                <title>{ film.properties.title } Page Details | SDR</title>
                <meta name="description" content={`${film.properties.title} Page Details | SDR`} />
            </Head>
            <div className={styles.container}>
                {
                    showTooltip
                        && 
                            <div className={styles.tooltip}>
                                <span className={styles.closeTooltip} onClick={hideTooltip}>X</span>
                                <div>
                                    <h3>{tooltip.name}</h3>
                                    <p><span>Birth Date: </span>{tooltip.birth}</p>
                                    <p><span>Eye Color: </span>{tooltip.eye}</p>
                                    <p><span>Gender: </span>{tooltip.gender}</p>
                                    <p><span>Hair Color: </span>{tooltip.hair}</p>
                                    <p><span>Weight: </span>{tooltip.mass}</p>
                                    <p><span>Height: </span>{tooltip.height}</p>
                                    <p><span>Skin Color: </span>{tooltip.skin}</p>
                                    <p><a href={tooltip.source}>Source</a></p>
                                </div>
                            </div>
                }
                <h1>{film.properties.title}</h1>
                <p>{film.description}</p>
                <p><span>ID: </span>{film._id}</p>
                <p><span>UID: </span>{film.uid}</p>
                <br></br>
                <p><span>Director: </span>{film.properties.director}</p>
                <p><span>Producer: </span>{film.properties.producer}</p>
                <p><span>Release Date: </span>{film.properties.release_date}</p>
                <p><span>Episode ID: </span>{film.properties.episode_id}</p>
                <p><span>Characters: </span></p>
                {
                    characters.map(
                        char => <div className={styles.character} key={char.uid} id={char.uid} /* onMouseLeave={hideTooltip} */ onMouseOver={createTooltip}>{char.properties.name}</div>
                    )
                }
                <br></br>
                <p><span>Crawl: </span><br></br>{film.properties.opening_crawl}</p>
                <br></br>
                <p><span>Source: </span><a href={film.properties.url}>SWAPI.tech</a></p>
                <p><span>Created on: </span>{film.properties.created}</p>
                <p><span>Edited on: </span>{film.properties.edited}</p>
            </div>
        </>
    );
}
 
export default Film;