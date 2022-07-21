import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/Genre.module.css'
import Pagination from '@components/Pagination'
import { useState, useEffect } from 'react'
import { ITEMS_PER_PAGE } from 'constants'

export default function Home(props) {
    const { genres } = props
    const [currentPage, setCurrentPage] = useState(1)
    // const [genreList, setGenreList] = useState(genres.splice(0, ITEMS_PER_PAGE))

    console.log(currentPage)

    return (
        <div>
            <Head>
                <title>Spotify /</title>
            </Head>
            <div>
                <h1>Genres</h1>
                <Pagination arr={genres} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <div className={styles.grid_container}>
                    {genres.map(genre =>
                        <div>
                            <Link href={`/${genre}`} key={genre}>
                                <a className={styles.genre}>{genre}</a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export async function getStaticProps() {
    const { genres } = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
        }
    }).then(res => res.json())

    return {
        props: {
            genres
        }
    }
}