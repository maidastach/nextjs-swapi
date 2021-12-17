import axios from 'axios'
import Head from 'next/head'
import Films from '../components/Films'
import styles from '../styles/Home.module.scss'

// https://www.swapi.tech/api/films

export const getStaticProps = async() =>
{
  const res = await axios.get('https://www.swapi.tech/api/films')
  return {
    props: { films: res.data.result }
  }
}

export default function Home( { films } ) {
  return (
    <div className='container'>
      <Head>
        <title>SDR | SWAPI Home</title>
        <meta name="description" content="Salvatore De Rosa Next.js SWAPI App" />
      </Head>
      <Films films={films} />
    </div>
  )
}
