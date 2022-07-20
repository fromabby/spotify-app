import Head from 'next/head'
import Track from '@components/Track'
import styles from '@styles/Track.module.css'

export default function Genre(props) {
    const { genre, tracks } = props

    return (
        <div>
            <Head>
                <title>{genre}</title>
            </Head>
            <div>
                <h1>A genre: {genre}</h1>
                <h2>Recommended music</h2>
                <div className={styles.grid_container}>
                    {tracks.map((track, index) => <Track track={track} index={index} />)}
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const { genres } = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
        }
    }).then(res => res.json())

    const genrePaths = genres.map(genre => ({
        params: { genre }
    }))

    return {
        paths: genrePaths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { genre } = params

    const { tracks } = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genre}`, {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
        }
    }).then(res => res.json())

    return {
        props: {
            genre,
            tracks
        },
        revalidate: 60
    }
}