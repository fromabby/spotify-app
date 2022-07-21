import Link from 'next/link'
import styles from '@styles/Header.module.css'

const Header = () => {
    return (
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/"><a>Genres</a></Link>
                </li>
                <li>
                    <Link href="/podcasts"><a>Podcasts</a></Link>
                </li>
            </ul>
        </div>
    )
}

export default Header
