<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set response header for JSON
header('Content-Type: application/json; charset=utf-8');

// CORS Configuration
$allowedOrigins = [
    "https://betaversion.kgpath.com",
    "https://kgpath.com",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include Database Connection
require __DIR__ . '/../config/database.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Invalid JSON sent."]);
    exit();
}

// Sanitize and assign input
$fullName      = htmlspecialchars(trim($data['fullName'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone         = trim($data['phone'] ?? '');
$qualification = htmlspecialchars(trim($data['qualification'] ?? ''), ENT_QUOTES, 'UTF-8');
$dob           = trim($data['dob'] ?? '');
$course        = htmlspecialchars(trim($data['course'] ?? ''), ENT_QUOTES, 'UTF-8');

// Optional DOB: convert empty string to null
$dob = $dob === '' ? null : $dob;

// Validation
$errors = [];
if (empty($fullName)) $errors[] = "Full name is required.";
if (empty($phone)) $errors[] = "Phone number is required.";
if (!preg_match('/^\d{10}$/', $phone)) $errors[] = "Phone number must be 10 digits.";
if (empty($qualification)) $errors[] = "Qualification is required.";
if (empty($course)) $errors[] = "Course is required.";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => implode(' ', $errors)]);
    exit();
}

// Insert into Database
try {
    $sql = "INSERT INTO enquiry (full_name, phone, qualification, dob, course) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$fullName, $phone, $qualification, $dob, $course]);

    echo json_encode([
        "status" => "OK",
        "message" => "Enquiry submitted successfully!"
    ]);

} catch (PDOException $e) {
    // Log error internally (for debugging, not exposed to user)
    error_log("Enquiry insert error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "status" => "ERROR",
        "message" => "An error occurred while saving the enquiry."
    ]);
}
