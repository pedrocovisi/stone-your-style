'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">Stone Your Style</Link>
                </div>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/" className={pathname === '/' ? styles.active : ''}>
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/monte-sua-peca"
                            className={pathname === '/monte-sua-peca' ? styles.active : ''}
                        >
                            Monte sua peça
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={pathname === '/about' ? styles.active : ''}
                        >
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={pathname === '/contact' ? styles.active : ''}
                        >
                            Contato
                        </Link>
                    </li>
                </ul>
                <div className={styles.actions}>
                    <button className={styles.cartButton}>Sacola (0)</button>
                </div>
            </div>
        </nav>
    );
}
