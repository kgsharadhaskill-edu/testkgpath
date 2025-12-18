<?php
// File: contact/edit-contact.php
// Purpose: Handles fetching and updating a single contact submission.

include '../config/session_check.php';
include '../config/database.php';

$pageTitle = "Edit Contact";

// Get ID from URL and validate it
$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    $_SESSION['message'] = 'Invalid contact ID.';
    $_SESSION['message_type'] = 'danger';
    header("Location: edit-contact.php");
    exit();
}

// Initialize variables
$contact = null;
$errors = [];

// Handle form submission for UPDATE
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    $posted_id = (int)$_POST['id'];

    // --- Validation ---
    if (empty($name)) $errors['name'] = 'Name is required.';
    if (empty($phone)) $errors['phone'] = 'Phone number is required.';
    if (empty($email)) $errors['email'] = 'Email is required.';
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email format.';
    if (empty($subject)) $errors['subject'] = 'Subject is required.';
    if (empty($message)) $errors['message'] = 'Message is required.';

    // If no errors, update the database
    if (empty($errors)) {
        try {
            $sql = "UPDATE contact_form SET name = ?, phone = ?, email = ?, subject = ?, message = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $phone, $email, $subject, $message, $posted_id]);

            $_SESSION['message'] = 'Contact submission updated successfully.';
            $_SESSION['message_type'] = 'success';
            header("Location: index.php");
            exit();
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error updating contact submission: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
            header("Location: edit-contact.php");
            exit();
        }
    } else {
        // If validation fails, repopulate the contact array to refill the form
        $contact = $_POST;
    }
} else {
    // Fetch existing contact data for the form (GET request)
    try {
        $sql = "SELECT * FROM contact_form WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $contact = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$contact) {
            $_SESSION['message'] = 'Contact submission not found.';
            $_SESSION['message_type'] = 'warning';
            header("Location:edit-contact.php");
            exit();
        }
    } catch (PDOException $e) {
        $_SESSION['message'] = 'Database error: ' . $e->getMessage();
        $_SESSION['message_type'] = 'danger';
        header("Location: edit-contact.php");
        exit();
    }
}


include '../templates/header.php';
?>

<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title"><?= $pageTitle ?></h3>
    </div>
    <form action="edit-contact.php?id=<?= $id ?>" method="post">
        <input type="hidden" name="id" value="<?= htmlspecialchars($contact['id']) ?>">
        <div class="card-body">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" class="form-control <?= isset($errors['name']) ? 'is-invalid' : '' ?>" id="name" name="name" value="<?= htmlspecialchars($contact['name'] ?? '') ?>" placeholder="Enter full name">
                <?php if (isset($errors['name'])): ?><div class="invalid-feedback"><?= $errors['name'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" id="phone" name="phone" value="<?= htmlspecialchars($contact['phone'] ?? '') ?>" placeholder="Enter phone number">
                <?php if (isset($errors['phone'])): ?><div class="invalid-feedback"><?= $errors['phone'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-control <?= isset($errors['email']) ? 'is-invalid' : '' ?>" id="email" name="email" value="<?= htmlspecialchars($contact['email'] ?? '') ?>" placeholder="Enter email">
                <?php if (isset($errors['email'])): ?><div class="invalid-feedback"><?= $errors['email'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control <?= isset($errors['subject']) ? 'is-invalid' : '' ?>" id="subject" name="subject" value="<?= htmlspecialchars($contact['subject'] ?? '') ?>" placeholder="Enter subject">
                <?php if (isset($errors['subject'])): ?><div class="invalid-feedback"><?= $errors['subject'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control <?= isset($errors['message']) ? 'is-invalid' : '' ?>" id="message" name="message" rows="5" placeholder="Enter message"><?= htmlspecialchars($contact['message'] ?? '') ?></textarea>
                <?php if (isset($errors['message'])): ?><div class="invalid-feedback"><?= $errors['message'] ?></div><?php endif; ?>
            </div>
             <div class="form-group">
                <label>Submitted At</label>
                <input type="text" class="form-control" value="<?= htmlspecialchars(date("M d, Y h:i A", strtotime($contact['created_at']))) ?>" disabled>
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Update Contact</button>
            <a href="edit-contact.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<?php include '../templates/footer.php'; ?>