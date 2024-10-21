"use client"
import styles from "./device.module.css"

const DeviceButtons = ({ deviceId }) => {

    const handleClick = async (event) => {
        event.preventDefault()
        console.log("Delete clicked for device ID:", deviceId);
    
        try {
            const response = await fetch(`/api/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: deviceId })
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete device')
            }
    
            const data = await response.json()
            console.log(data.message)
        } catch (error) {
            console.error('Error deleting device:', error)
        }
    };

    return (
        <>
            <button type="submit" onClick={handleClick}  className={styles.deletebutton}>Delete device</button>
            <button type="submit"  className={styles.editbutton}>Edit device</button>
        </>
    );
}

export default DeviceButtons
