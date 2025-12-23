<?php
include '../config/session_check.php';
include '../config/database.php';

function cleanData(&$str) {
    $str = preg_replace("/\t/", " ", $str);
    $str = preg_replace("/\r?\n/", " ", $str);
}

$filename = "contact_submissions_" . date('Y-m-d') . ".xls";
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Pragma: no-cache");
header("Expires: 0");

try {
    $sql = "SELECT id, name, phone, email, subject, message, created_at FROM contact_form ORDER BY created_at DESC";
    $stmt = $pdo->query($sql);
    
    if ($stmt->rowCount() > 0) {
        $column_headers = ['ID', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Submitted At'];
        echo implode("\t", $column_headers) . "\n";

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row_data = [
                $row['id'],
                $row['name'],
                $row['phone'],
                $row['email'],
                $row['subject'],
                $row['message'],
                date("Y-m-d H:i:s", strtotime($row['created_at']))
            ];

            array_walk($row_data, 'cleanData');
            echo implode("\t", $row_data) . "\n";
        }
    } else {
        echo "No contact submissions found.\n";
    }

} catch (PDOException $e) {
    error_log("Export Error: " . $e->getMessage());
    echo "A database error occurred during export. Please check server logs.";
}

exit();
?>
