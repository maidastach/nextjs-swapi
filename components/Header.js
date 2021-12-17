import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../styles/Header.module.scss'


const Header = () => {
    const router = useRouter()
    const isHomePage = router.pathname === '/';
    return ( 
        <div className={styles.navbar}>
            <div className={styles.content}>
                <h1>
                    SWAPI App!
                </h1>
                    { !isHomePage && <Link href='/'><a className={styles.homepage}>Back To HomePage</a></Link> }
            </div>
      </div>
     );
}
 
export default Header;
