// --- 1. BARCODE SCANNER LOGIC ---
function onScanSuccess(decodedText, decodedResult) {

    document.getElementById('barcodeNum').value = decodedText;
    
    //visual feed back
    console.log(`Scan success: ${decodedText}`);
}

function onScanFailure(error) {
    
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", 
    { fps: 10, qrbox: {width: 250, height: 150} }, 
    false
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


// Logic
function addItem() {
    const name = document.getElementById('itemName').value;
    const qty = parseInt(document.getElementById('itemQty').value);
    const barcode = document.getElementById('barcodeNum').value;

    if (name === '' || isNaN(qty)) {
        alert("Please enter at least a name and a quantity.");
        return;
    }

    const table = document.getElementById('inventoryBody');
    const row = table.insertRow();

    // Logic of qty less than 5 indicator
    const statusClass = qty < 5 ? 'low-stock' : 'in-stock';
    const statusText = qty < 5 ? 'Low Stock' : 'Good';

    row.innerHTML = `
        <td>${name}</td>
        <td>${qty}</td>
        <td><code>${barcode || 'Manual Entry'}</code></td>
        <td><span class="${statusClass}">${statusText}</span></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    // Clear inputs after task finished
    document.getElementById('itemName').value = '';
    document.getElementById('itemQty').value = '';
    document.getElementById('barcodeNum').value = '';
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
