import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.imageOverlay}>
                <Image
                    src="/images/hero1.png"
                    alt="Natural Stone Jewelry"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlayColor}></div>
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>Elegância <span className={styles.highlight}>Natural</span></h1>
                <p className={styles.subtitle}>
                    Descubra a energia e a beleza das pedras naturais em peças exclusivas.
                </p>
                <Link href="/monte-sua-peca" className={styles.ctaButton}>
                    Monte sua peça personalizada
                </Link>
            </div>
        </section>
    );
}
