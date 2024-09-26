import styles from "./homepage.module.css";
import Link from 'next/link'

const HomePage = ()  => {
  return (
    <div className={styles.spacing2xl}>
      <h1 className={styles.bold}>Welcome to device management</h1>
      <Link href="/register"><span className={styles.registerlink}>Register a new device</span></Link>
        <section className={`${styles.maincontent} ${styles.spacing2xl}`}>
              <article className={styles.devicecontent}>
                <h2>Latest devices</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Device name</th>
                      <th>Username</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><Link href="#">CO-123456</Link></td>
                      <td>John Doe</td>
                      <td>5.6.2023</td>
                    </tr>
                    <tr>
                      <td><Link href="#">CO-123456</Link></td>
                      <td>John Doe</td>
                      <td>5.6.2023</td>
                    </tr>
                    <tr>
                      <td><Link href="#">CO-123456</Link></td>
                      <td>John Doe</td>
                      <td>5.6.2023</td>
                    </tr>
                    <tr>
                      <td><Link href="#">CO-123456</Link></td>
                      <td>John Doe</td>
                      <td>5.6.2023</td>
                    </tr>
                    <tr>
                      <td><Link href="#">CO-123456</Link></td>
                      <td>John Doe</td>
                      <td>5.6.2023</td>
                    </tr>
                  </tbody>
                  </table>
                </article>
          
            <article className={`${styles.searchcontent} ${styles.spacing2xl}`}>
              <h2 className={styles.bold}>Search devices</h2>
                <form className={styles.searchform}>
                  <div className={styles.inputs}>
                    <label>Device name:</label>
                    <input type="text" name="device-name" placeholder="e.g. CO-123456"/>
                    <label>Device ID:</label>
                    <input type="text" name="device-id" placeholder="e.g. ABCDEFG"/>
                  </div>
                  <div>
                    <button className={styles.searchbutton}>Search</button>
                  </div>
              </form>
              <div>
                <p>Search result comes here</p>
              </div> 
            </article>
      </section>


      <div>
        <section className={`${styles.terms} ${styles.spacing2xl}`}>
          <h3>Terms of use</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
