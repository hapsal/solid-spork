
const PrinterDevice = () => {
    return (
        <>
            <label>Manufacturer:*</label>
            <input type="text" name="manufacturer" placeholder="e.g. HP"/>
            <label>Model:*</label>
            <input type="text" name="model" placeholder="e.g. LaserJet"/>
            <label>MAC-Address:*</label>
            <input type="text" name="mac" placeholder="e.g. A1:B4:C5:C1:DD:3E"/>
            <label>Date:</label>
            <input type="date" name="model" />
            <label>Warranty:</label>
            <input type="text" name="warranty" placeholder="e.g. 3 Years"/>
            <label>Purpose of the printer:</label>
            <label>Public printer: <input type="radio" name="public" checked="checked" /></label>
            <label>Private printer: <input type="radio" name="private" /></label>
            <label>Print queue name:</label>
            <input type="text" name="queue" placeholder="e.g. \\print.co.com\printer_name"/>
            <lavel>Extra information: </lavel>
            <textarea form="deviceregister" name="extrainfo" placeholder="e.g. Where is the printer located" />
        </>
    )
}

export default PrinterDevice;