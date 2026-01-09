import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>Stone Your Style</h3>
                    <p className={styles.text}>
                        Acessórios autênticos que realçam sua beleza natural com a energia das pedras.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Links Úteis</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/monte-sua-peca">Monte sua peça</Link></li>
                        <li><Link href="/about">Sobre Nós</Link></li>
                        <li><Link href="/faq">Perguntas Frequentes</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contato</h4>
                    <p className={styles.text}>contato@stoneyourstyle.com</p>
                    <p className={styles.text}>+55 11 99999-9999</p>
                    <div className={styles.socials}>
                        {/* Social Icons would go here */}
                        <span>Instagram</span>
                        <span>Facebook</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Stone Your Style. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
