import Wrapper from '../components/Wrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
