<?php
// File: contact/create-contact.php
// Purpose: Handles the creation of a new contact submission.

include '../config/session_check.php';
include '../config/database.php';

$pageTitle = "Add New Contact";

// Initialize variables for form fields and errors
$name = $phone = $email = $subject = $message = '';
$errors = [];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // --- Validation ---
    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }
    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required.';
    }
    if (empty($email)) {
        $errors['email'] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    }
    if (empty($subject)) {
        $errors['subject'] = 'Subject is required.';
    }
    if (empty($message)) {
        $errors['message'] = 'Message is required.';
    }

    // If no errors, insert into database
    if (empty($errors)) {
        try {
            $sql = "INSERT INTO contact_form (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $phone, $email, $subject, $message]);

            $_SESSION['message'] = 'Contact submission added successfully.';
            $_SESSION['message_type'] = 'success';
            header("Location: create-contact.php");
            exit();
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error adding contact submission: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
            header("Location: create-contact.php");
            exit();
        }
    }
}

include '../templates/header.php';
?>

<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title"><?= $pageTitle ?></h3>
    </div>
    <form action="create-contact.php" method="post">
        <div class="card-body">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" class="form-control <?= isset($errors['name']) ? 'is-invalid' : '' ?>" id="name" name="name" value="<?= htmlspecialchars($name) ?>" placeholder="Enter full name">
                <?php if (isset($errors['name'])): ?><div class="invalid-feedback"><?= $errors['name'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" id="phone" name="phone" value="<?= htmlspecialchars($phone) ?>" placeholder="Enter phone number">
                <?php if (isset($errors['phone'])): ?><div class="invalid-feedback"><?= $errors['phone'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-control <?= isset($errors['email']) ? 'is-invalid' : '' ?>" id="email" name="email" value="<?= htmlspecialchars($email) ?>" placeholder="Enter email">
                <?php if (isset($errors['email'])): ?><div class="invalid-feedback"><?= $errors['email'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control <?= isset($errors['subject']) ? 'is-invalid' : '' ?>" id="subject" name="subject" value="<?= htmlspecialchars($subject) ?>" placeholder="Enter subject">
                <?php if (isset($errors['subject'])): ?><div class="invalid-feedback"><?= $errors['subject'] ?></div><?php endif; ?>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control <?= isset($errors['message']) ? 'is-invalid' : '' ?>" id="message" name="message" rows="5" placeholder="Enter message"><?= htmlspecialchars($message) ?></textarea>
                <?php if (isset($errors['message'])): ?><div class="invalid-feedback"><?= $errors['message'] ?></div><?php endif; ?>
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Save Contact</button>
            <a href="create-contact.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<?php include '../templates/footer.php'; ?>