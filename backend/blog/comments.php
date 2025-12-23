<?php
require_once '../config/database.php';
require_once '../config/session_check.php';

// Allow CORS for your frontend
$allowedOrigins = [
    "http://localhost:3000",
    "https://kgpath.com",
    "https://betaversion.kgpath.com"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Get method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['post_id'], $data['name'], $data['email'], $data['comment'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO blog_comments (post_id, name, email, comment) VALUES (:post_id, :name, :email, :comment)");
    $stmt->execute([
        ':post_id' => $data['post_id'],
        ':name' => $data['name'],
        ':email' => $data['email'],
        ':comment' => $data['comment']
    ]);

    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
    exit;
}

if ($method === 'GET') {
    $postId = isset($_GET['post_id']) ? intval($_GET['post_id']) : 0;

    $stmt = $pdo->prepare("SELECT id, name, comment, created_at FROM blog_comments WHERE post_id = :post_id ORDER BY created_at DESC");
    $stmt->execute([':post_id' => $postId]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($comments);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
