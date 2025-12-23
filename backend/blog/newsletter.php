<?php
// Allow CORS for React front-end
$allowedOrigins = [
    "https://betaversion.kgpath.com",
    "https://kgpath.com",
    "http://localhost:3000"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
}

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit; // stop further processing for preflight
}

// JSON response header for actual requests
header('Content-Type: application/json; charset=utf-8');

// Include database configuration and session check
require_once '../config/database.php';

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}

$email = trim($data['email']);

try {
    // Insert email using PDO prepared statement
    $stmt = $pdo->prepare("INSERT INTO newsletter_emails (email) VALUES (:email)");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(['status' => 'success', 'message' => 'Email subscribed successfully!']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry
        echo json_encode(['status' => 'error', 'message' => 'Email already subscribed.']);
    } else {
        // Log error in production, do not expose sensitive info
        error_log($e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Something went wrong.']);
    }
}
