'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">Stone Your Style</Link>
                </div>

                <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                    <li>
                        <Link
                            href="/"
                            className={pathname === '/' ? styles.active : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/monte-sua-peca"
                            className={pathname === '/monte-sua-peca' ? styles.active : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Monte sua peça
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={pathname === '/about' ? styles.active : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={pathname === '/contact' ? styles.active : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contato
                        </Link>
                    </li>
                </ul>

                <div className={styles.actions}>
                    <button className={styles.cartButton}>Sacola (0)</button>
                    <button className={styles.menuButton} onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
