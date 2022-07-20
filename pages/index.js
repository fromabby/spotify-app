import Head from 'next/head'
import Link from 'next/link'

export default function Home(props) {
    const { genres } = props

    return (
        <div>
            <Head>
                <title>Spotify /</title>
            </Head>
            <div>
                <ul>
                    {genres.map(genre =>
                        <li>
                            <Link href={`/${genre}`} key={genre}>
                                <a>{genre}</a>
                            </Link>
                        </li>
                    )}
                </ul>
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