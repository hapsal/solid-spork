import styles from "./homepage.module.css";
import Link from 'next/link'

const HomePage = ()  => {
  return (
    <div>
      <section>
          <h1 className={styles.bold}>Welcome to device management</h1>
          <Link href="/register">Register a new device</Link>

          <article>
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

      </section>

      <section>
        <h1 className={styles.bold}>Search devices</h1>
          <form>
            <label for="device">Device name:</label>
            <input type="text" name="device-name" />
            <label for="id">Device ID:</label>
            <input type="text" name="device-id" />
            <input type="submit" value="Search" />
        </form>
        <article>
          <p>Search result comes here</p>
        </article> 
      </section>

      <div>
        <section>
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
