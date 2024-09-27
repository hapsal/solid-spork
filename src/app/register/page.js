import styles from "./register.module.css";

const RegisterPage = () => {
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
                        <select name="devices" form="deviceregister">
                            <option value="laptop">Laptop</option>
                            <option value="desktopcomputer">Desktop computer</option>
                            <option value="printer">Printer</option>
                        </select>
                        {/* TODO: Inputs updates based on selection */}
                        <div className={styles.formsection}>
                            <label>Manufacturer:*</label>
                            <input type="text" name="manufacturer" placeholder="e.g. Lenovo"/>
                            <label>Model:*</label>
                            <input type="text" name="model" placeholder="e.g. IdeaPad"/>
                            <label>MAC-Address:*</label>
                            <input type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"/>
                            <label>UUID:*</label>
                            <input type="text" name="uuid" placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6"/>
                            <label>Date:</label>
                            <input type="date" name="model" placeholder="e.g. IdeaPad"/>
                            <label>Warranty:</label>
                            <input type="text" name="warranty" placeholder="e.g. 3 Years"/>
                            <label>BIOS-password:</label>
                            <input type="text" name="biospassword" placeholder="e.g. amazingpassword"/>
                            <label>Wake-On-LAN:</label>
                            <input type="checkbox" name="wol" />
                            <label>Wake-On-LAN-Omit:</label>
                            <input type="checkbox" name="wolo" />
                            <label>DirectAccess:</label>
                            <input type="checkbox" name="da" />
                            <label>Extra information:</label>
                            <textarea form="deviceregister" name="extrainfo" placeholder="e.g. Who uses the computer" />
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