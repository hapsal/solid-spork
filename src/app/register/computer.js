const ComputerDevice = () => {
    return (
        <>
            <label>Manufacturer:*</label>
            <input type="text" name="manufacturer" placeholder="e.g. Lenovo"/>
            <label>Model:*</label>
            <input type="text" name="model" placeholder="e.g. IdeaPad"/>
            <label>MAC-Address:*</label>
            <input type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"/>
            <label>UUID:*</label>
            <input type="text" name="uuid" placeholder="e.g. f81d4fae-7dec-11d0-a765-00a0c91e6bf6"/>
            <label>Date:</label>
            <input type="date" name="model" />
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
        </>
    )
}

export default ComputerDevice;