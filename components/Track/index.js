import Image from 'next/image'
import styles from '@styles/Track.module.css'
import shortenText from '@utils/shortenText'

const Track = ({ track, index }) => {
    const { id, name, album, external_urls } = track

    const { spotify } = external_urls

    return (
        <a href={spotify}>
            <div className={styles.track_container}>
                <Image
                    src={album.images[0].url}
                    height="50px"
                    width="50px"
                    alt={name}
                    layout="responsive"
                />
                <div className={styles.name_container}>
                    <h3 className={styles.name}>{shortenText(name)}</h3>
                </div>
            </div>
        </a>
    )
}

export default Track
