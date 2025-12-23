<?php
// ---------- CORS ----------
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

// ---------- Preflight ----------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Force JSON response for every case
header('Content-Type: application/json; charset=utf-8');

// Log errors to file, not output
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

// Ensure POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status"  => "error",
        "message" => "Invalid request method"
    ]);
    exit();
}

// Read and validate JSON input
$input = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON input"
    ]);
    exit();
}

// Sanitize and assign variables
$name    = htmlspecialchars(trim($input['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone   = trim($input['phone'] ?? '');
$email   = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($input['subject'] ?? 'Contact Form Submission'), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validation
$errors = [];
if (empty($name)) $errors[] = "Name is required.";
if (empty($phone)) $errors[] = "Phone number is required.";
if (!preg_match('/^\d{10}$/', $phone)) $errors[] = "Phone must be 10 digits.";
if (empty($email)) $errors[] = "Email is required.";
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";
if (empty($message)) $errors[] = "Message cannot be empty.";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => implode(' ', $errors)
    ]);
    exit();
}

try {
    // Insert into DB using prepared statements
    $sql = "INSERT INTO contact_form (name, phone, email, subject, message, created_at)
            VALUES (:name, :phone, :email, :subject, :message, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'    => $name,
        ':phone'   => $phone,
        ':email'   => $email,
        ':subject' => $subject,
        ':message' => $message
    ]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully!"
    ]);
    exit();

} catch (PDOException $e) {
    // Log internal error without exposing to client
    error_log("Contact Form DB Error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "An internal server error occurred."
    ]);
}
