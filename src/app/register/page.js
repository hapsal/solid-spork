"use client"

import styles from "./register.module.css";
import Link from 'next/link'
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const RegisterSchema =  Yup.object({
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
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    mac: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('Required'),

  })

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formdata, setFormData] = useState('')

    const HandleSubmit = async (formData, { setErrors, resetForm }) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/register-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                const errorData = await response.json();
                
                if (errorData.errors) {
                    setErrors(errorData.errors)
                } else {
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
                }

                return;
            }

            const data = await response.json()
            //console.log(data)
            setFormData(data)
            resetForm()
        } catch (error) {
            console.error('Error during submission:', error)
        } finally {
            setIsLoading(false)
        }


    }
    
    return (
        <div>
            <h1 className={styles.registertitle}>Register a new device</h1>
            <h2 className={styles.success}>{formdata.message}</h2>
            <section>
                <Formik
                initialValues = {{
                    name: '',
                    email: '',
                    costcenter: '',
                    location: '',
                    homedomain: '',
                    addtodomain: false,
                    devicetype: 'laptop',
                    manufacturer: '',
                    model: '',
                    mac: '',
                    uuid: '',
                    date: '',
                    warranty: '',
                    biospass: '',
                    wol: false,
                    wolo: false,
                    da: false,
                    printqueue: '',
                    extrainfo: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={HandleSubmit}
                >
                {({ errors, touched, values, handleChange }) => ( 
                    <Form>
                    <div className={styles.formsection}>
                        <p>User information</p>
                        <label htmlFor="name">Name:*</label>
                        <Field type="text" name="name" placeholder="e.g. John Doe" 
              
                         className={errors.name && touched.name ? styles.inputerror : ''}
                        />

                         {touched.name && errors.name ? (

                        <div className={styles.error}>{errors.name}</div>

                        ) : null}

                        <label>Email:*</label>
                        <Field type="email" name="email" placeholder="e.g. john.doe@company.com"
                         className={errors.email && touched.email ? styles.inputerror : ''}
                        />

                        {touched.email && errors.email ? (

                        <div className={styles.error}>{errors.email}</div>

                        ) : null}

                    </div>
                    <div className={styles.formsection}>
                        <p>Organization</p>

                        <label>Cost Center:</label>
                        <Field as="select" name="costcenter" form="deviceregister">
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
                        </Field>

                        <label>Location:*</label>
                        <Field type="text" name="location" placeholder="e.g. New York" 
                        className={errors.location && touched.location ? styles.inputerror : ''}
                        />

                        {touched.location && errors.location ? (

                        <div className={styles.error}>{errors.location}</div>

                        ) : null}

                        <label>Home CO-Domain:*</label>
                        <Field as="select" name="homedomain" form="deviceregister">
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
                        </Field>

                        <label>Add to CO-Domain:</label>
                        <Field type="checkbox" name="addtodomain" />
                    </div>
                    <div className={styles.formsection}>
                        <p>Device</p>
                        <label>Device type:*</label>
                        <Field as="select" name="devicetype" form="deviceregister" value={values.devicetype} onChange={handleChange}>
                            <option value="laptop">Laptop</option>
                            <option value="desktopcomputer">Desktop computer</option>
                            <option value="printer">Printer</option>
                        </Field>
                        <div className={styles.formsection}>
                            {(values.devicetype.match("laptop") || values.devicetype.match("desktopcomputer")) ?
                            <>
                                <label>Manufacturer:*</label>
                                <Field type="text" name="manufacturer" placeholder="e.g. Lenovo"  
                                className={errors.manufacturer && touched.manufacturer ? styles.inputerror : ''}
                                />

                                {touched.manufacturer && errors.manufacturer ? (

                                <div className={styles.error}>{errors.manufacturer}</div>

                                ) : null}


                                <label>Model:*</label>
                                <Field type="text" name="model" placeholder="e.g. IdeaPad" 
                                className={errors.model && touched.model ? styles.inputerror : ''}
                                />

                                {touched.model && errors.model ? (

                                <div className={styles.error}>{errors.model}</div>

                                ) : null}


                                <label>MAC-Address:*</label>
                                <Field type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"  
                                className={errors.mac && touched.mac ? styles.inputerror : ''}
                                />

                                {touched.mac && errors.mac ? (

                                <div className={styles.error}>{errors.mac}</div>

                                ) : null}


                                <label>UUID:*</label>
                                <Field type="text" name="uuid" placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6" 
                                className={errors.uuid && touched.uuid ? styles.inputerror : ''}
                                />

                                {touched.uuid && errors.uuid ? (

                                <div className={styles.error}>{errors.uuid}</div>

                                ) : null}


                                <label>Date:</label>
                                <Field type="date" name="date" 
                                value={values.date} onChange={handleChange} />

                                <label>Warranty:</label>
                                <Field type="text" name="warranty" placeholder="e.g. 3 Years"
                                value={values.warranty} onChange={handleChange} />

                                <label>BIOS-password:</label>
                                <Field type="text" name="biospass" placeholder="e.g. amazingpassword"
                                value={values.biospass} onChange={handleChange}
                                />

                                <label>Wake-On-LAN:</label>
                                <Field type="checkbox" name="wol" 
        
                                />

                                <label>Wake-On-LAN-Omit:</label>
                                <Field type="checkbox" name="wolo" 
  
                                />

                                <label>DirectAccess:</label>
                                <Field type="checkbox" name="da" 
                                 />

                                <label>Extra information:</label>
                                <Field as="textarea" form="deviceregister" name="extrainfo" placeholder="e.g. Who uses the computer" 
                                value={values.extrainfo} onChange={handleChange}
                                />
                            </>
                            :
                            <>
                                <label>Manufacturer:*</label>
                                <Field type="text" name="manufacturer" placeholder="e.g. HP" 
                                className={errors.manufacturer && touched.manufacturer ? styles.inputerror : ''}
                                />

                                {touched.manufacturer && errors.manufacturer ? (

                                <div className={styles.error}>{errors.manufacturer}</div>

                                ) : null}

                                <label>Model:*</label>
                                <Field type="text" name="model" placeholder="e.g. LaserJet" 
                                />

                                {touched.model && errors.model ? (

                                <div className={styles.error}>{errors.model}</div>

                                ) : null}

                                <label>MAC-Address:*</label>
                                <Field type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E" 
                                 className={errors.mac && touched.mac ? styles.inputerror : ''}
                                 />
 
                                 {touched.mac && errors.mac ? (
 
                                 <div className={styles.error}>{errors.mac}</div>
 
                                 ) : null}

                                <label>Date:</label>
                                <Field type="date" name="date" 
                                 value={values.date} onChange={handleChange}
                                />

                                <label>Warranty:</label>
                                <Field type="text" name="warranty" placeholder="e.g. 3 Years"
                                 value={values.warranty} onChange={handleChange}
                                />

                                <label>Purpose of the printer:</label>
                                <label>Public printer: <Field type="radio" name="public" value="public" /></label>
                                <label>Private printer: <Field type="radio" name="private" value="private" /></label>

                                <label>Print queue name:</label>
                                <Field type="text" name="queue" placeholder="e.g. \\print.co.com\printer_name" 
                                value={values.printqueue} onChange={handleChange}
                                />
                                
                                <label>Extra information: </label>
                                <Field as="textarea" form="deviceregister" name="extrainfo" placeholder="e.g. Where is the printer located" 
                                value={values.extrainfo} onChange={handleChange}
                                />
                            </>
                            }
                        </div>
                        <div className={styles.formbuttons}>
                            <button className={styles.backbutton}><Link href="/">Back</Link></button>
                            <button className={styles.registerbutton} type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                        </div>
                    </div>
                    </Form>
                    )}
                </Formik>
            </section>
        </div>
    )
}

export default RegisterPage