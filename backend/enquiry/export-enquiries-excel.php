<?php
// Core setup
include '../config/session_check.php';
include '../config/database.php';

try {
    // 1. Fetch all enquiry data from the database
    // We fetch all records, not just a paginated list
    $stmt = $pdo->query("SELECT id, full_name, phone, qualification, dob, course, created_at FROM enquiry ORDER BY id ASC");
    $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. Set headers to trigger a file download
    $filename = "enquiries_export_" . date('Y-m-d') . ".csv";
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . $filename);

    // 3. Create a file pointer connected to the output stream
    $output = fopen('php://output', 'w');

    // 4. Add the header row to the CSV file
    fputcsv($output, [
        'ID',
        'Full Name',
        'Phone',
        'Qualification',
        'Date of Birth',
        'Course',
        'Submitted At'
    ]);

    // 5. Loop through the data and add each row to the CSV
    if ($enquiries) {
        foreach ($enquiries as $enquiry) {
            fputcsv($output, $enquiry);
        }
    }

    // The file pointer is automatically closed when the script ends.
    exit();

} catch (PDOException $e) {
    // If there's a database error, we can't generate the file.
    // Set a session message and redirect back.
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION['error_message'] = "Could not export data due to a database error: " . $e->getMessage();
    header("Location: manage_enquiries.php");
    exit();
}