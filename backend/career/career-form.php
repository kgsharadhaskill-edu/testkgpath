<?php
if (session_status() === PHP_SESSION_NONE) session_start();

// JSON response header
header('Content-Type: application/json; charset=utf-8');

// CORS
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
header("Access-Control-Allow-Headers: Content-Type");

// Preflight handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// Include database
require_once __DIR__ . '/../config/database.php';

// Upload directory
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) mkdir($uploadDir, 0755, true);

// Sanitize input
$name       = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email      = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = trim($_POST['phone'] ?? '');
$position   = htmlspecialchars(trim($_POST['position'] ?? ''), ENT_QUOTES, 'UTF-8');
$experience = htmlspecialchars(trim($_POST['experience'] ?? ''), ENT_QUOTES, 'UTF-8');
$linkedin   = htmlspecialchars(trim($_POST['linkedin'] ?? ''), ENT_QUOTES, 'UTF-8');
$github     = htmlspecialchars(trim($_POST['github'] ?? ''), ENT_QUOTES, 'UTF-8');
$message    = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

$errors = [];

// Validation
if (empty($name)) $errors[] = "Name is required.";
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
if (empty($phone) || !preg_match('/^\d{10}$/', $phone)) $errors[] = "Valid 10-digit phone number is required.";
if (empty($position)) $errors[] = "Position is required.";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['status'=>'error', 'message'=>implode(' ', $errors)]);
    exit();
}

// Handle resume upload
$resumePath = null;
if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $fileTmp  = $_FILES['resume']['tmp_name'];
    $fileName = $_FILES['resume']['name'];
    $fileSize = $_FILES['resume']['size'];
    $fileExt  = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if ($fileExt !== 'pdf' || $fileSize > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['status'=>'error','message'=>'Invalid file. PDF only, max 5MB.']);
        exit();
    }

    $newFileName = uniqid('resume_') . '.pdf';
    $resumePath  = 'uploads/' . $newFileName; // relative path for DB
    if (!move_uploaded_file($fileTmp, __DIR__ . '/' . $resumePath)) {
        http_response_code(500);
        echo json_encode(['status'=>'error','message'=>'Failed to upload resume.']);
        exit();
    }
}

try {
    $sql = "INSERT INTO job_applications 
        (name, email, phone, position, experience, linkedin, github, message, resume_path, created_at)
        VALUES 
        (:name, :email, :phone, :position, :experience, :linkedin, :github, :message, :resume_path, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'       => $name,
        ':email'      => $email,
        ':phone'      => $phone,
        ':position'   => $position,
        ':experience' => $experience,
        ':linkedin'   => $linkedin,
        ':github'     => $github,
        ':message'    => $message,
        ':resume_path'=> $resumePath
    ]);

    echo json_encode(['status'=>'success','message'=>'Application submitted successfully.']);
} catch (PDOException $e) {
    error_log("Job application DB error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Database error.']);
}
