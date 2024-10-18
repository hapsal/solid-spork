"use client"

import styles from "./homepage.module.css";
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HomePage = ()  => {
  const [devices, setDevices] = useState([])
  const [filteredDevice, setFilteredDevice] = useState([])
  const [searchDeviceByName, setSearchDeviceByName] = useState('')
  const [searchInitiated, setSearchInitiated] = useState(false)

  useEffect(() => {
    async function fetchDevices() {
      const response = await fetch('/api/devicelist')
      const data = await response.json()

      setDevices(data)
    }

    fetchDevices()
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()

    if (searchDeviceByName.trim() === '') {
      setFilteredDevice([]);
      setSearchInitiated(true)
      return;
    }

    const filteredDevice = devices.filter((device) =>
      device.deviceName.toLowerCase().includes(searchDeviceByName.toLowerCase().trim())
    )

    setFilteredDevice(filteredDevice)
    setSearchInitiated(true)
  }

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
                  {devices.length > 0 ? (
                    devices.map((device) => (
                      <tr key={device._id}>
                        <td><Link href={`/device/${device._id}`}>{device.deviceName}</Link></td>
                        <td>{device.name}</td>
                        <td>{new Date(device.entryDate).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  )}
                </tbody>
                  </table>
                </article>
          
            <article className={`${styles.searchcontent} ${styles.spacing2xl}`}>
              <h2 className={styles.bold}>Search devices</h2>
                <form className={styles.searchform}>
                  <div className={styles.inputs}>
                    <label>Device name:</label>
                    <input type="text" name="device-name" placeholder="e.g. CO-123456" value={searchDeviceByName} onChange={(e) => setSearchDeviceByName(e.target.value)}/>
                  </div>
                  <div>
                    <button className={styles.searchbutton} type="submit" onClick={handleSearch}>Search</button>
                  </div>
              </form>
              <div className={styles.searchresult}>
                {searchInitiated && filteredDevice.length === 0 
                  ? <p>No devices found</p> 
                  : 
                  <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Service ID</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                      {filteredDevice.map(device =>
                        <tr key={device._id}>
                          <th>
                            <Link href={`/device/${device._id}`}>{device.deviceName}</Link>
                          </th>
                          <th>
                            {device.serviceid}
                          </th>
                          <th>
                            {device.devicetype}
                          </th>
                        </tr>
                      )}
                      </tbody> 
                    </table>
                }
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
