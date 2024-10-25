"use client"
import styles from "./device.module.css"
import { useState, useEffect} from "react"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent.js'


const UpdateSchema =  Yup.object({
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
    mac: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('Required'),
    printerpurpose: Yup.string().required('Required')
  })

const DeviceInfo = ({ deviceId, deviceData }) => {
    const [updateDevice, setUpdateDevice] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setUpdateDevice(deviceData)
    }, [deviceData])


    const handleDelete = async (event) => {
        event.preventDefault()
        //console.log("Delete clicked for device ID:", deviceId);
    
        try {
            const response = await fetch(`/api/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: deviceId })
            })
    
            if (!response.ok) {
                throw new Error('Failed to delete device')
            }
            scrollToTop()
            
            setTimeout(() => {
                setShowModal(true);
            }, 300)

        } catch (error) {
            console.error('Error deleting device:', error)
        }
    }

    const handleEdit = async (values) => {

        if (isEditing) {

            const hasChanges = Object.keys(values).some(key => 
                values[key] !== deviceData[key]
            )

            if (!hasChanges) {
                setIsEditing(false)
                return
            }

            try {
                const { _id, ...updateFields } = values
                const response = await fetch(`/api/update-device`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: deviceId, ...updateFields }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to edit device')
                }

                if (response.ok) {
                    setUpdateDevice(prevData => ({ ...prevData, ...values }))
                    setTimeout(() => {
                        setIsEditing(false)
                    }, 100)
                }
        
            } catch (error) {
                console.error('Error editing device:', error)
            }  
        } else {
            setIsEditing(true)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
        {isEditing ? (
            <Formik
            enableReinitialize
            initialValues={{
                name: updateDevice.name || '',
                email: updateDevice.email || '',
                costcenter: updateDevice.costcenter || '',
                location: updateDevice.location || '',
                homedomain: updateDevice.homedomain || '',
                devicetype: updateDevice.devicetype || '',
                manufacturer: updateDevice.manufacturer || '',
                model: updateDevice.model || '',
                mac: updateDevice.mac || '',
                uuid: updateDevice.uuid || '',
                serviceid: updateDevice.serviceid || '',
                entryDate: updateDevice.entryDate || '',
                biospass: updateDevice.biospass || '',
                wol: updateDevice.wol || '',
                wolo: updateDevice.wolo || '',
                da: updateDevice.da || '',
                extrainfo: updateDevice.extrainfo || '',
                printqueue: updateDevice.printqueue || '',
                printerpurpose: updateDevice.printerpurpose || ''
            }}
             validationSchema={UpdateSchema}
             onSubmit={handleEdit}
             >
                {({ errors, touched, values }) => ( 
                    <Form className={styles.devicesection}>
                <h1>Device information for: <label className={styles.deviceinfoname}>{updateDevice.deviceName}</label></h1>
                    <article>
                        <h2>User information</h2>
                        <div className={styles.wrapper}>
                            <p>Name: </p> <label>{updateDevice.name}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Email: </p> <label>{updateDevice.email}</label>
                        </div>
                    </article>
                    <article>
                        <h2>Organization</h2>
                        <div className={styles.wrapper}>
                            <p>Cost Center: </p> <label>
                                <Field as="select" name="costcenter">
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
                                </Field>
                                </label>
                        </div>
                        <div className={styles.wrapper}>
                        <p>Location: </p> <label>
                            <Field type="text" name="location" placeholder="e.g. New York"
                            className={errors.location && touched.location ? styles.inputerror : ''}
                            />
                            </label>
                        </div>
                        <div className={styles.wrapper}>
                        <p>Home CO-Domain: </p><label>
                            <Field as="select" name="homedomain">
                                <option value="CO/Compliance/Computers">CO/Compliance/Computers</option>
                                <option value="CO/Compliance/Printers">CO/Compliance/Printers</option>
                                <option value="CO/Customerservice/Computers">CO/Customer Service/Computers</option>
                                <option value="CO/Customerservice/Printers">CO/Customer Service/Printers</option>
                                <option value="CO/Engineering/Computers">CO/Engineering/Computers</option>
                                <option value="CO/Engineering/Printers">CO/Engineering/Printers</option>
                                <option value="CO/Facilities/Computers">CO/Facilities Management/Computers</option>
                                <option value="CO/Facilities/Printers">CO/Facilities Management/Printers</option>
                                <option value="CO/Financeaccounting/Computers">CO/Finance & Accounting/Computers</option>
                                <option value="CO/Financeaccounting/Printers">CO/Finance & Accounting/Printers</option>
                                <option value="CO/Humanresources/Computers">CO/Human Resources/Computers</option>
                                <option value="CO/Humanresources/Printers">CO/Human Resources/Printers</option>
                                <option value="CO/Informationtechnology/Computers">CO/Information Technology/Computers</option>
                                <option value="CO/Informationtechnolog/Printers">CO/Information Technology/Printers</option>
                                <option value="CO/Legaldepartment/Computers">CO/Legal Department/Computers</option>
                                <option value="CO/Legaldepartment/Printers">CO/Legal Department/Printers</option>
                                <option value="CO/Marketing/Computers">CO/Marketing/Computers</option>
                                <option value="CO/Marketing/Printers">CO/Marketing/Printers</option>
                                <option value="CO/Procurement/Computers">CO/Procurement/Computers</option>
                                <option value="CO/Procurement/Printers">CO/Procurement/Printers</option>
                                <option value="CO/Qualityassurance/Computers">CO/Quality Assurance/Computers</option>
                                <option value="CO/Qualityassurance/Printers">CO/Quality Assurance/Printers</option>
                                <option value="CO/Researchdevelopment/Computers">CO/Research & Development/Computers</option>
                                <option value="CO/Fesearchdevelopment/Printers">CO/Research & Development/Printers</option>
                                <option value="CO/Riskmanagement/Computers">CO/Risk Management/Computers</option>
                                <option value="CO/Riskmanagement/Printers">CO/Risk Management/Printers</option>
                            </Field></label>
                        </div>
                    </article>
                    <article>
                        <h2>Device</h2>
                        <div className={styles.wrapper}>
                            <p>Device name: </p><label>{updateDevice.deviceName}</label>
                        </div>
                        <div className={styles.wrapper}>
                        <p>Device type: </p> <label>
                            <Field as="select" name="devicetype">
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop Computer">Desktop Computer</option>
                                <option value="Printer">Printer</option>
                            </Field>
                            </label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Manufacturer: </p><label>
                                <Field type="text" name="manufacturer" placeholder="e.g. Lenovo"  
                                className={errors.manufacturer && touched.manufacturer ? styles.inputerror : ''} 
                                />
                                </label>
                       </div>
                       <div className={styles.wrapper}>
                        <p>Model: </p>
                            <label>
                            <Field type="text" name="model" placeholder="e.g. IdeaPad" 
                                className={errors.model && touched.model ? styles.inputerror : '' }
                                
                                />
                            </label>
                       </div>
                       <div className={styles.wrapper}>
                        <p>MAC-Address: </p> <label>
                            <Field type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"  
                            className={errors.mac && touched.mac ? styles.inputerror : ''}
                           
                            /></label>
                        </div>
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>UUID: </p><label>
                            <Field type="text" name="uuid" placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6" 
                                className={errors.uuid && touched.uuid ? styles.inputerror : ''}
                                /></label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>Service ID: </p><label>
                            <Field type="text" name="serviceid" placeholder="e.g. 12A3B45" 
                                className={errors.serviceid && touched.serviceid ? styles.inputerror : ''}
                                /></label>
                        </div>
                        }
                        <div className={styles.wrapper}>
                            <p>Registered on: </p><label>{new Date(updateDevice.entryDate).toLocaleDateString()}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Warranty Expiry: </p><label>{updateDevice.entryDate ? new Date(new Date(updateDevice.entryDate).setFullYear(new Date(updateDevice.entryDate).getFullYear() + 3)).toLocaleDateString() : "Not set"}</label>
                        </div>
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>BIOS-password: </p><label>
                            <Field type="text" name="biospass" placeholder="e.g. amazingpassword"
                                value={values.biospass} 
                            /></label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>Wake-On-Lan: </p><label>
                            <Field type="checkbox" name="wol" 
                             /></label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>Wake-On-Lan-Omit: </p><label>
                            <Field type="checkbox" name="wolo" 
                                /></label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                        <p>DirectAccess: </p><label>
                            <Field type="checkbox" name="da" 
                                /></label>
                        </div>
                        }
                         {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Local admin-password: </p><label>{updateDevice.localpass}</label>
                        </div>
                        }
                        {updateDevice.devicetype !== "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Printer purpose: </p>
                            <label>Public printer: <Field type="radio" name="printerpurpose" value="public" /></label>
                            <label>Private printer: <Field type="radio" name="printerpurpose" value="private" /></label>
                        </div>
                        }
                        {updateDevice.devicetype !== "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Print queue: </p><label>
                            <Field type="text" name="printqueue" placeholder="e.g. \\print.co.com\printer_name"
                                value={values.printqueue} 
                            /></label>
                        </div>
                        }
                        <div className={styles.wrapper}>
                            <p>Extra information: </p><label>
                            <Field as="textarea" name="extrainfo" placeholder="e.g. Who uses the device" 
                                value={values.extrainfo} 
                            /></label>
                        </div>
                    </article>
                
                <div className={styles.deviceinfobuttons}>
                    <button type="submit" className={styles.editbutton}>Save Changes</button>
                    <button type="button" onClick={handleCancel} className={styles.deletebutton}>Cancel</button>
                </div>
                </Form>
                 )}
             </Formik>
        ) : (
            showModal ? (
                <div>
                {showModal && createPortal(
                    <ModalContent onClose={() => setShowModal(false)} />,
                    document.body
                )}
                </div>
            ) : (
                <section className={styles.devicesection}>
                    <h1>Device Information for: <label className={styles.deviceinfoname}>{updateDevice.deviceName}</label></h1>
                    <article>
                        <h2>User Information</h2>
                        <div className={styles.wrapper}>
                            <p>Name: </p> <label>{updateDevice.name}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Email: </p><label>{updateDevice.email}</label>
                        </div>
                    </article>
                    <article>
                        <h2>Organization</h2>
                        <div className={styles.wrapper}>
                            <p>Cost Center: </p><label>{updateDevice.costcenter}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Location: </p><label>{updateDevice.location}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Home CO-Domain: </p><label>{updateDevice.homedomain}</label>
                        </div>
                    </article>
                    <article>
                        <h2>Device Information</h2>
                        <div className={styles.wrapper}>
                            <p>Device name: </p><label>{updateDevice.deviceName}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Device type: </p><label>{updateDevice.devicetype}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Manufacturer: </p><label>{updateDevice.manufacturer}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Model: </p><label>{updateDevice.model}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>MAC-Address: </p><label>{updateDevice.mac}</label>
                        </div>
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>UUID: </p><label>{updateDevice.uuid}</label>
                        </div>
                        }
                         {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Service ID: </p><label>{updateDevice.serviceid}</label>
                        </div>
                        }
                        <div className={styles.wrapper}>
                            <p>Registered on: </p><label>{new Date(updateDevice.date).toLocaleDateString()}</label>
                        </div>
                        <div className={styles.wrapper}>
                            <p>Warranty Expiry: </p><label>{updateDevice.date ? new Date(new Date(updateDevice.date).setFullYear(new Date(updateDevice.date).getFullYear() + 3)).toLocaleDateString() : "Not set"}</label>
                        </div>
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>BIOS-password: </p><label>{updateDevice.biospass ? updateDevice.biospass : "Not set"}</label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Wake-On-Lan: </p><label>{updateDevice.wol ? "Set" : "Not set"}</label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Wake-On-Lan-Omit: </p><label>{updateDevice.wolo ? "Set" : "Not set"}</label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>DirectAccess: </p><label>{updateDevice.da ? "Set": "Not set"}</label>
                        </div>
                        }
                        {updateDevice.devicetype === "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Local admin-password: </p><label>{updateDevice.localpass}</label>
                        </div>
                        }
                        {updateDevice.devicetype !== "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Printer purpose: </p><label>{updateDevice.printerpurpose}</label>
                        </div>
                        }
                        {updateDevice.devicetype !== "Printer" ? <></> :
                        <div className={styles.wrapper}>
                            <p>Printer queue: </p><label>{updateDevice.printqueue}</label>
                        </div>
                        }
                        <div className={styles.wrapper}>
                            <p>Extra information: </p><label>{updateDevice.extrainfo ? updateDevice.extrainfo : "None"}</label>
                        </div>
                    </article>
                    <div className={styles.deviceinfobuttons}>
                        <button onClick={handleDelete} className={styles.deletebutton}>Delete device</button>
                        <button onClick={handleEdit} className={styles.editbutton}>Edit device</button>
                    </div> 
                </section>
            )
        )}
    </>
    );
}

export default DeviceInfo
