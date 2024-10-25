"use client"

import styles from "../homepage.module.css"
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SearchPage = () => {
    const [devices, setDevices] = useState([])
    const [filteredDevices, setFilteredDevices] = useState([])
    const [searchInitiated, setSearchInitiated] = useState(false)
    const [searchParams, setSearchParams] = useState({
        name: '',
        type: '',
        serviceId: '',
        mac: '',
        uuid: '',
        costCenter: '',
        location: '',
    })

    useEffect(() => {
        async function fetchDevices() {
          const response = await fetch('/api/devicelist')
          const data = await response.json()
    
          const sortedDevices = data.sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate))
          setDevices(sortedDevices)
        }
    
        fetchDevices()
      }, [])

     const handleSearch = (event) => {
        event.preventDefault()
    
        const { name, type, serviceId, mac, uuid, costCenter, location } = searchParams
    
        const filtered = devices.filter(device => {
            return (
                (name ? device.deviceName.toLowerCase().includes(name.toLowerCase().trim()) : true) &&
                (type ? device.devicetype === type : true) &&
                (serviceId ? device.serviceid && device.serviceid.toLowerCase().includes(serviceId.toLowerCase().trim()) : true) &&
                (mac ? device.mac && device.mac.toLowerCase().includes(mac.toLowerCase().trim()) : true) && 
                (uuid ? device.uuid && device.uuid.toLowerCase().includes(uuid.toLowerCase().trim()) : true) &&
                (costCenter ? device.costcenter === costCenter : true) &&
                (location ? device.location.toLowerCase().includes(location.toLowerCase().trim()) : true)
            )
        })


        setFilteredDevices(filtered)
        setSearchInitiated(true)
      }

      const handleChange = (e) => {
        const { name, value } = e.target
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    return (
        <div className={styles.advancedsearch}>
            <h1>Advanced search</h1>
            <section className={styles.advancedcontent}>
                <article className={styles.spacing2xl}>
                <h2 className={styles.bold}>Search devices</h2>
                    <form className={styles.searchform}>
                    <div className={styles.inputs}>
                            <label>Device Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="e.g. CO-123456" 
                                value={searchParams.name} 
                                onChange={handleChange} 
                            />
                                <label>Device Type:</label>
                                <select name="type" value={searchParams.type} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Desktop Computer">Desktop Computer</option>
                                    <option value="Printer">Printer</option>
                                </select>

                            <label>Service ID:</label>
                            <input 
                                type="text" 
                                name="serviceId" 
                                placeholder="e.g. ABCDEFG" 
                                value={searchParams.serviceId} 
                                onChange={handleChange} 
                            />

                            <label>MAC Address:</label>
                            <input 
                                type="text" 
                                name="mac" 
                                placeholder="e.g. A1:B4:C5:D2:EE:3F" 
                                value={searchParams.mac} 
                                onChange={handleChange} 
                            />

                            <label>UUID:</label>
                            <input 
                                type="text" 
                                name="uuid" 
                                placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6" 
                                value={searchParams.uuid} 
                                onChange={handleChange} 
                            />

                            <label>Cost Center:</label>
                            <select name="costCenter" value={searchParams.costCenter} onChange={handleChange}>
                                <option value="">Select Cost Center</option>
                                <option value="Compliance">Compliance</option>
                                <option value="Customer Service">Customer Service</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Facilities Management">Facilities Management</option>
                                <option value="Finance and Accounting">Finance & Accounting</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Legal Department">Legal Department</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Procurement">Procurement</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                                <option value="Research and Development">Research & Development</option>
                                <option value="Risk Management">Risk Management</option>
                            </select>

                            <label>Location:</label>
                            <input 
                                type="text" 
                                name="location" 
                                placeholder="e.g. New York" 
                                value={searchParams.location} 
                                onChange={handleChange} 
                            />
                        </div>
                    <div>
                        <button className={styles.searchbutton} type="submit" onClick={handleSearch}>Search</button>
                    </div>
                </form>
                <div className={styles.searchresult}>
                    {searchInitiated && filteredDevices.length === 0 
                    ? <p>No devices found</p> 
                    : 
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Service ID</th>
                                <th>MAC</th>
                                <th>UUID</th>
                                <th>Cost Center</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredDevices.map(device =>
                            <tr key={device._id}>
                                <th>
                                    <Link href={`/device/${device._id}`}>{device.deviceName}</Link>
                                </th>
                                <th>
                                    {device.devicetype}
                                </th>
                                <th>
                                    {device.serviceid}
                                </th>
                                <th>
                                    {device.mac}
                                </th>
                                <th>
                                    {device.uuid}
                                </th>
                                <th>
                                    {device.costcenter}
                                </th>
                                <th>
                                    {device.location}
                                </th>
                            </tr>
                        )}
                        </tbody> 
                        </table>
                    }
                </div> 
                </article>
            </section>
        </div>
    )
}

export default SearchPage