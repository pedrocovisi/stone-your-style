'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

const images = [
    '/images/hero1.png',
    '/images/hero2.png',
    '/images/hero3.png'
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className={styles.carouselSection}>
            <h2 className={styles.carouselTitle}>Nossa Galeria</h2>
            <div className={styles.carouselContainer}>
                <div className={styles.slides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((src, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.indicators}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
