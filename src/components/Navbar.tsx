import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">Stone Your Style</Link>
                </div>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Início</Link></li>
                    <li><Link href="/monte-sua-peca">Monte sua peça</Link></li>
                    <li><Link href="/about">Sobre</Link></li>
                    <li><Link href="/contact">Contato</Link></li>
                </ul>
                <div className={styles.actions}>
                    <button className={styles.cartButton}>Sacola (0)</button>
                </div>
            </div>
        </nav>
    );
}
