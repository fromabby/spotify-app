import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/Genre.module.css'
import Pagination from '@components/Pagination'
import InfiniteLoad from '@components/InfiniteLoad'
import { useState, useEffect } from 'react'
import { ITEMS_PER_PAGE } from 'constants'

export default function Podcasts(props) {
    const { playlists } = props
    const [currentPage, setCurrentPage] = useState(1)
    const [playlist, setPlaylist] = useState(playlists)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) {
            setPlaylist(playlists.slice((currentPage - 1) * ITEMS_PER_PAGE, (currentPage * ITEMS_PER_PAGE)))
            setLoading(false)
        }
    }, [loading])

    return (
        <div>
            <Head>
                <title>Spotify /</title>
            </Head>
            <h1>Playlists</h1>
            <div className={styles.grid_container}>
                {loading ? <p>Loading...</p> : playlist.map(playlist =>
                    <div key={playlist.name}>
                        <Link href={`/${playlist.name}`}>
                            <a className={styles.genre}>{playlist.name}</a>
                        </Link>
                    </div>
                )}
            </div>
            <InfiniteLoad
                loading={loading}
                arr={playlists}
                setList={setPlaylist}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}


export async function getStaticProps() {
    const { playlists } = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
        }
    }).then(res => res.json())

    return {
        props: {
            playlists: playlists.items
        }
    }
}