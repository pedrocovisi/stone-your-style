import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>STONE YOUR STYLE</h3>
                    <p className={styles.text}>
                        Acessórios autênticos que realçam sua beleza natural com a energia das pedras.
                    </p>
                </div>

                {/* <div className={styles.column}>
                    <h4 className={styles.heading}>Links Úteis</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/monte-sua-peca">Monte sua peça</Link></li>
                        <li><Link href="/about">Sobre Nós</Link></li>
                        <li><Link href="/faq">Perguntas Frequentes</Link></li>
                    </ul>
                </div> */}

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contato</h4>
                    <div className={styles.socials}>
                        <a
                            href="https://www.instagram.com/stoneyourstyle/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialButton}
                        >
                            <FaInstagram size={20} />
                            <span>Instagram</span>
                        </a>
                        <a
                            href="https://wa.me/5519991188733"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialButton}
                        >
                            <FaWhatsapp size={20} />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Stone Your Style. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
