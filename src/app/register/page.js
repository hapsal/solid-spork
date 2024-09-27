"use client"

import styles from "./register.module.css";
import { useState } from "react";

import ComputerDevice from "./computer";
import PrinterDevice from "./printer";

const RegisterPage = () => {
    const [selectedDevice, setSelectedDevice] = useState("laptop")

    return (
        <div>
            <h1 className={styles.registertitle}>Register a new device</h1>
            <section>
                <form id="deviceregister">
                    <div className={styles.formsection}>
                        <p>User information</p>
                        <label>Name:*</label>
                        <input type="text" name="username" placeholder="e.g. John Doe"/>
                        <label>Email:*</label>
                        <input type="text" name="email" placeholder="e.g. john.doe@company.com"/>
                    </div>
                    <div className={styles.formsection}>
                        <p>Organization</p>
                        <label>Cost Center:*</label>
                        <input type="text" name="costcenter" placeholder="e.g. 123456 Human Resources"/>
                        <label>Location:*</label>
                        <input type="text" name="location" placeholder="e.g. New York"/>
                        <label>Home CO-Domain:*</label>
                        <input type="text" name="domain" placeholder="e.g. CO/Classroom/Building"/>
                        <label>Add to CO-Domain:</label>
                        <input type="checkbox" name="addtodomain" />
                    </div>
                    <div className={styles.formsection}>
                        <p>Device</p>
                        <label>Device type:*</label>
                        <select name="devices" form="deviceregister" value={selectedDevice} onChange={e => setSelectedDevice(e.target.value)}>
                            <option value="laptop">Laptop</option>
                            <option value="desktopcomputer">Desktop computer</option>
                            <option value="printer">Printer</option>
                        </select>
                        <div className={styles.formsection}>
                            {(selectedDevice.match("laptop") || selectedDevice.match("desktopcomputer")) ?
                            <ComputerDevice />
                            :
                            <PrinterDevice />
                            }
                        </div>
                        <div className={styles.formbuttons}>
                            <button className={styles.backbutton}>Back</button>
                            <button className={styles.registerbutton}>Register</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default RegisterPage