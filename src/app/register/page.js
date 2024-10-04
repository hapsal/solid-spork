"use client"

import styles from "./register.module.css";
import Link from 'next/link'
import { useFormik } from 'formik';
import * as Yup from 'yup'

const RegisterPage = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            costcenter: '',
            location: '',
            homedomain: '',
            addtodomain: '',
            devicetype: 'laptop',
            manufacturer: '',
            model: '',
            mac: '',
            uuid: '',
            date: '',
            warranty: '',
            biospass: '',
            wol: '',
            wolo: '',
            da: '',
            printqueue: '',
            extrainfo: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            location: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            manufacturer: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            model: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            uuid: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            mac: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })
    
    return (
        <div>
            <h1 className={styles.registertitle}>Register a new device</h1>
            <section>
                <form onSubmit={formik.handleSubmit}> 
                    <div className={styles.formsection}>
                        <p>User information</p>
                        <label htmlFor="name">Name:*</label>
                        <input type="text" name="name" placeholder="e.g. John Doe" 
                         {...formik.getFieldProps('name')}
                         className={formik.errors.name && formik.touched.name ? styles.inputerror : ''}
                        />

                         {formik.touched.name && formik.errors.name ? (

                        <div className={styles.error}>{formik.errors.name}</div>

                        ) : null}

                        <label>Email:*</label>
                        <input type="email" name="email" placeholder="e.g. john.doe@company.com"
                         {...formik.getFieldProps('email')}
                         className={formik.errors.email && formik.touched.email ? styles.inputerror : ''}
                        />

                        {formik.touched.email && formik.errors.email ? (

                        <div className={styles.error}>{formik.errors.email}</div>

                        ) : null}

                    </div>
                    <div className={styles.formsection}>
                        <p>Organization</p>

                        <label>Cost Center:</label>
                        <select name="costcenter" form="deviceregister"  {...formik.getFieldProps('costcenter')}>
                            <option value="">Select Cost Center</option>
                            <option value="compliance">Compliance</option>
                            <option value="customerservice">Customer Service</option>
                            <option value="engineering">Engineering</option>
                            <option value="facilities">Facilities Management</option>
                            <option value="financeaccounting">Finance & Accounting</option>
                            <option value="humanresources">Human Resources</option>
                            <option value="informationtechnology">Information Technology</option>
                            <option value="legaldepartment">Legal Department</option>
                            <option value="marketing">Marketing</option>
                            <option value="procurement">Procurement</option>
                            <option value="qualityassurance">Quality Assurance</option>
                            <option value="researchdevelopment">Research & Development</option>
                            <option value="riskmanagement">Risk Management</option>
                        </select>

                        <label>Location:*</label>
                        <input type="text" name="location" placeholder="e.g. New York" 
                        {...formik.getFieldProps('location')} 
                        className={formik.errors.location && formik.touched.location ? styles.inputerror : ''}
                        />

                        {formik.touched.location && formik.errors.location ? (

                        <div className={styles.error}>{formik.errors.location}</div>

                        ) : null}

                        <label>Home CO-Domain:*</label>
                        <select name="homedomain" form="deviceregister"  {...formik.getFieldProps('homedomain')}>
                            <option value="">Select Home Domain</option>
                            <option value="complianceComputers">CO/Compliance/Computers</option>
                            <option value="compliancePrinters">CO/Compliance/Printers</option>
                            <option value="customerserviceComputers">CO/Customer Service/Computers</option>
                            <option value="customerservicePrinters">CO/Customer Service/Printers</option>
                            <option value="engineeringComputers">CO/Engineering/Computers</option>
                            <option value="engineeringPrinters">CO/Engineering/Printers</option>
                            <option value="facilitiesComputers">CO/Facilities Management/Computers</option>
                            <option value="facilitiesPrinters">CO/Facilities Management/Printers</option>
                            <option value="financeaccountingComputers">CO/Finance & Accounting/Computers</option>
                            <option value="financeaccountingPrinters">CO/Finance & Accounting/Printers</option>
                            <option value="humanresourcesComputers">CO/Human Resources/Computers</option>
                            <option value="humanresourcesPrinters">CO/Human Resources/Printers</option>
                            <option value="informationtechnologyComputers">CO/Information Technology/Computers</option>
                            <option value="informationtechnologPrinters">CO/Information Technology/Printers</option>
                            <option value="legaldepartmentComputers">CO/Legal Department/Computers</option>
                            <option value="legaldepartmentPrinters">CO/Legal Department/Printers</option>
                            <option value="marketingComputers">CO/Marketing/Computers</option>
                            <option value="marketingPrinters">CO/Marketing/Printers</option>
                            <option value="procurementComputers">CO/Procurement/Computers</option>
                            <option value="procurementPrinters">CO/Procurement/Printers</option>
                            <option value="qualityassuranceComputers">CO/Quality Assurance/Computers</option>
                            <option value="qualityassurancePrinters">CO/Quality Assurance/Printers</option>
                            <option value="researchdevelopmentComputers">CO/Research & Development/Computers</option>
                            <option value="researchdevelopmentPrinters">CO/Research & Development/Printers</option>
                            <option value="riskmanagementComputers">CO/Risk Management/Computers</option>
                            <option value="riskmanagementPrinters">CO/Risk Management/Printers</option>
                        </select>

                        <label>Add to CO-Domain:</label>
                        <input type="checkbox" name="addtodomain" value={formik.values.addtodomain} onChange={formik.handleChange}/>
                    </div>
                    <div className={styles.formsection}>
                        <p>Device</p>
                        <label>Device type:*</label>
                        <select name="devicetype" form="deviceregister" value={formik.values.devicetype} onChange={formik.handleChange}>
                            <option value="laptop">Laptop</option>
                            <option value="desktopcomputer">Desktop computer</option>
                            <option value="printer">Printer</option>
                        </select>
                        <div className={styles.formsection}>
                            {(formik.values.devicetype.match("laptop") || formik.values.devicetype.match("desktopcomputer")) ?
                            <>
                                <label>Manufacturer:*</label>
                                <input type="text" name="manufacturer" placeholder="e.g. Lenovo"  
                                {...formik.getFieldProps('manufacturer')}
                                className={formik.errors.manufacturer && formik.touched.manufacturer ? styles.inputerror : ''}
                                />

                                {formik.touched.manufacturer && formik.errors.manufacturer ? (

                                <div className={styles.error}>{formik.errors.manufacturer}</div>

                                ) : null}


                                <label>Model:*</label>
                                <input type="text" name="model" placeholder="e.g. IdeaPad" 
                                {...formik.getFieldProps('model')}
                                className={formik.errors.model && formik.touched.model ? styles.inputerror : ''}
                                />

                                {formik.touched.model && formik.errors.model ? (

                                <div className={styles.error}>{formik.errors.model}</div>

                                ) : null}


                                <label>MAC-Address:*</label>
                                <input type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"  
                                {...formik.getFieldProps('mac')}
                                className={formik.errors.mac && formik.touched.mac ? styles.inputerror : ''}
                                />

                                {formik.touched.mac && formik.errors.mac ? (

                                <div className={styles.error}>{formik.errors.mac}</div>

                                ) : null}


                                <label>UUID:*</label>
                                <input type="text" name="uuid" placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6" 
                                {...formik.getFieldProps('uuid')}
                                className={formik.errors.uuid && formik.touched.uuid ? styles.inputerror : ''}
                                />

                                {formik.touched.uuid && formik.errors.uuid ? (

                                <div className={styles.error}>{formik.errors.uuid}</div>

                                ) : null}


                                <label>Date:</label>
                                <input type="date" name="date" 
                                value={formik.values.date} onChange={formik.handleChange} />

                                <label>Warranty:</label>
                                <input type="text" name="warranty" placeholder="e.g. 3 Years"
                                value={formik.values.warranty} onChange={formik.handleChange} />

                                <label>BIOS-password:</label>
                                <input type="text" name="biospass" placeholder="e.g. amazingpassword"
                                value={formik.values.biospass} onChange={formik.handleChange}
                                />

                                <label>Wake-On-LAN:</label>
                                <input type="checkbox" name="wol" 
                                value={formik.values.wol} onChange={formik.handleChange}
                                />

                                <label>Wake-On-LAN-Omit:</label>
                                <input type="checkbox" name="wolo" 
                                value={formik.values.wolo} onChange={formik.handleChange}
                                />

                                <label>DirectAccess:</label>
                                <input type="checkbox" name="da" 
                                value={formik.values.da} onChange={formik.handleChange} />

                                <label>Extra information:</label>
                                <textarea form="deviceregister" name="extrainfo" placeholder="e.g. Who uses the computer" 
                                value={formik.values.extrainfo} onChange={formik.handleChange}
                                />
                            </>
                            :
                            <>
                                <label>Manufacturer:*</label>
                                <input type="text" name="manufacturer" placeholder="e.g. HP" 
                                {...formik.getFieldProps('manufacturer')}
                                className={formik.errors.manufacturer && formik.touched.manufacturer ? styles.inputerror : ''}
                                />

                                {formik.touched.manufacturer && formik.errors.manufacturer ? (

                                <div className={styles.error}>{formik.errors.manufacturer}</div>

                                ) : null}

                                <label>Model:*</label>
                                <input type="text" name="model" placeholder="e.g. LaserJet" 
                                {...formik.getFieldProps('model')}
                                />

                                {formik.touched.model && formik.errors.model ? (

                                <div className={styles.error}>{formik.errors.model}</div>

                                ) : null}

                                <label>MAC-Address:*</label>
                                <input type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E" 
                                 {...formik.getFieldProps('mac')}
                                 className={formik.errors.mac && formik.touched.mac ? styles.inputerror : ''}
                                 />
 
                                 {formik.touched.mac && formik.errors.mac ? (
 
                                 <div className={styles.error}>{formik.errors.mac}</div>
 
                                 ) : null}

                                <label>Date:</label>
                                <input type="date" name="date" 
                                 value={formik.values.date} onChange={formik.handleChange}
                                />

                                <label>Warranty:</label>
                                <input type="text" name="warranty" placeholder="e.g. 3 Years"
                                 value={formik.values.warranty} onChange={formik.handleChange}
                                />

                                <label>Purpose of the printer:</label>
                                <label>Public printer: <input type="radio" name="public" checked="checked" /></label>
                                <label>Private printer: <input type="radio" name="private" /></label>

                                <label>Print queue name:</label>
                                <input type="text" name="queue" placeholder="e.g. \\print.co.com\printer_name" 
                                value={formik.values.printqueue} onChange={formik.handleChange}
                                />
                                
                                <lavel>Extra information: </lavel>
                                <textarea form="deviceregister" name="extrainfo" placeholder="e.g. Where is the printer located" 
                                value={formik.values.extrainfo} onChange={formik.handleChange}
                                />
                            </>
                            }
                        </div>
                        <div className={styles.formbuttons}>
                            <button className={styles.backbutton}><Link href="/">Back</Link></button>
                            <button className={styles.registerbutton} type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default RegisterPage