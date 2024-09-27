import styles from "./footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.copyright}>
                <p>&copy; Hannu Salo</p>
            </section>
        </footer>
    )
}

export default Footer;