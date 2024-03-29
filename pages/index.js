import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/Genre.module.css'
import Pagination from '@components/Pagination'
import InfiniteLoad from '@components/InfiniteLoad'
import { useState, useEffect } from 'react'
import { ITEMS_PER_PAGE } from 'constants'

export default function Home(props) {
    const { genres } = props
    const [currentPage, setCurrentPage] = useState(1)
    const [genreList, setGenreList] = useState(genres)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) {
            setGenreList(genres.slice((currentPage - 1) * ITEMS_PER_PAGE, (currentPage * ITEMS_PER_PAGE)))
            setLoading(false)
        }
    }, [loading])

    return (
        <div>
            <Head>
                <title>Spotify /</title>
            </Head>
            <h1>Genres</h1>
            <div className={styles.grid_container}>
                {loading ? <p>Loading...</p> : genreList.map(genre =>
                    <div key={genre}>
                        <Link href={`/${genre}`}>
                            <a className={styles.genre}>{genre}</a>
                        </Link>
                    </div>
                )}
            </div>
            <InfiniteLoad
                loading={loading}
                arr={genres}
                setList={setGenreList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
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