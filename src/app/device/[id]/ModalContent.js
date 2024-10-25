import styles from "./device.module.css"
import Link from 'next/link'

export default function ModalContent({ onClose }) {
    return (
      <div className={styles.modal}>
        <p>Device deleted succesfully</p>
        <button onClick={onClose}><Link href="/">Back to home</Link></button>
      </div>
    )
  }
  