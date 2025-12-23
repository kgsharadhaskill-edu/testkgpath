<?php
// File: enquiry/edit-enquiry.php
// Purpose: Handles the creation of new enquiries and editing of existing ones.

include '../config/session_check.php';
include '../config/database.php';

// Determine if we are editing or creating
$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;
$action = ($id > 0) ? 'edit' : 'create';

if ($action === 'create') {
    $pageTitle = "Add New Enquiry";
} else {
    $pageTitle = "Edit Enquiry";
}

// Initialize variables
$errors = [];
$page_message = '';
$page_message_type = '';
$fullName = '';
$phone = '';
$qualification = '';
$dob = '';
$course = '';

// --- FORM SUBMISSION LOGIC (CREATE OR UPDATE) ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName      = trim($_POST['full_name'] ?? '');
    $phone         = trim($_POST['phone'] ?? '');
    $qualification = trim($_POST['qualification'] ?? '');
    $dob           = trim($_POST['dob'] ?? '');
    $course        = trim($_POST['course'] ?? '');

    // Validation
    if (empty($fullName)) $errors['full_name'] = "Full Name is required.";
    if (empty($phone)) $errors['phone'] = "Phone number is required.";
    elseif (!preg_match('/^[0-9]{10}$/', $phone)) $errors['phone'] = "Please enter a valid 10-digit phone number.";
    if (empty($qualification)) $errors['qualification'] = "Please select a qualification.";
    if (empty($dob)) $errors['dob'] = "Date of Birth is required.";
    if (empty($course)) $errors['course'] = "Interested Course is required.";

    if (empty($errors)) {
        try {
            if ($action === 'edit') {
                // Update existing record
                $sql = "UPDATE enquiry SET full_name = ?, phone = ?, qualification = ?, dob = ?, course = ? WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$fullName, $phone, $qualification, $dob, $course, $id]);
                $_SESSION['message'] = "Enquiry updated successfully!";
            } else {
                // Insert new record
                $sql = "INSERT INTO enquiry (full_name, phone, qualification, dob, course) VALUES (?, ?, ?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$fullName, $phone, $qualification, $dob, $course]);
                $_SESSION['message'] = "Enquiry added successfully!";
            }
            $_SESSION['message_type'] = 'success';
            header("Location: index.php"); // Redirect to the list view after success
            exit();
        } catch (PDOException $e) {
            $page_message = "Database error: " . $e->getMessage();
            $page_message_type = 'danger';
        }
    } else {
        $page_message = "Please fix the errors below.";
        $page_message_type = 'danger';
    }
}

// --- DATA FETCHING FOR EDIT FORM ---
if ($action === 'edit' && $_SERVER["REQUEST_METHOD"] != "POST") {
    $stmt = $pdo->prepare("SELECT * FROM enquiry WHERE id = ?");
    $stmt->execute([$id]);
    $enquiry = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$enquiry) {
        $_SESSION['message'] = "Enquiry not found.";
        $_SESSION['message_type'] = 'warning';
        header("Location: index.php");
        exit();
    }
    // Pre-fill form fields with data from the database
    $fullName = $enquiry['full_name'];
    $phone = $enquiry['phone'];
    $qualification = $enquiry['qualification'];
    $dob = $enquiry['dob'];
    $course = $enquiry['course'];
}

include '../templates/header.php';
?>

<!-- Display Page-Specific Messages (like validation errors) -->
<?php if (!empty($page_message)): ?>
<div class="alert alert-<?= htmlspecialchars($page_message_type) ?> alert-dismissible fade show" role="alert">
    <?= htmlspecialchars($page_message) ?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
</div>
<?php endif; ?>

<div class="card card-<?= ($action === 'edit') ? 'warning' : 'primary' ?>">
    <div class="card-header">
        <h3 class="card-title"><?= $pageTitle ?><?= ($action === 'edit' ? ' #' . htmlspecialchars($id) : '') ?></h3>
    </div>
    <form action="edit-enquiry.php<?= ($action === 'edit' ? '?id=' . $id : '') ?>" method="post">
        <div class="card-body">
            <div class="form-group">
                <label for="full_name">Full Name</label>
                <input type="text" class="form-control <?= isset($errors['full_name']) ? 'is-invalid' : '' ?>" id="full_name" name="full_name" value="<?= htmlspecialchars($fullName) ?>" required>
                <?php if (isset($errors['full_name'])): ?><span class="invalid-feedback d-block"><?= $errors['full_name'] ?></span><?php endif; ?>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" id="phone" name="phone" pattern="[0-9]{10}" value="<?= htmlspecialchars($phone) ?>" required>
                 <?php if (isset($errors['phone'])): ?><span class="invalid-feedback d-block"><?= $errors['phone'] ?></span><?php endif; ?>
            </div>
            <div class="form-group">
                <label for="qualification">Education Qualification</label>
                <select class="form-control <?= isset($errors['qualification']) ? 'is-invalid' : '' ?>" id="qualification" name="qualification" required>
                    <option value="" disabled <?= empty($qualification) ? 'selected' : '' ?>>Select Qualification</option>
                    <option value="student" <?= $qualification == 'student' ? 'selected' : '' ?>>Student (Pursuing)</option>
                    <option value="graduate" <?= $qualification == 'graduate' ? 'selected' : '' ?>>Graduate (Bachelor's)</option>
                    <option value="post_graduate" <?= $qualification == 'post_graduate' ? 'selected' : '' ?>>Post Graduate (Master's)</option>
                    <option value="working" <?= $qualification == 'working' ? 'selected' : '' ?>>Working Professional</option>
                    <option value="other" <?= $qualification == 'other' ? 'selected' : '' ?>>Other</option>
                </select>
                <?php if (isset($errors['qualification'])): ?><span class="invalid-feedback d-block"><?= $errors['qualification'] ?></span><?php endif; ?>
            </div>
            <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" class="form-control <?= isset($errors['dob']) ? 'is-invalid' : '' ?>" id="dob" name="dob" value="<?= htmlspecialchars($dob) ?>" max="<?= date('Y-m-d'); ?>" required>
                 <?php if (isset($errors['dob'])): ?><span class="invalid-feedback d-block"><?= $errors['dob'] ?></span><?php endif; ?>
            </div>
            <div class="form-group">
                <label for="course">Interested Course</label>
                <input type="text" class="form-control <?= isset($errors['course']) ? 'is-invalid' : '' ?>" id="course" name="course" value="<?= htmlspecialchars($course) ?>" required>
                <?php if (isset($errors['course'])): ?><span class="invalid-feedback d-block"><?= $errors['course'] ?></span><?php endif; ?>
            </div>
        </div>
        <div class="card-footer">
            <?php if ($action === 'edit'): ?>
                <button type="submit" class="btn btn-warning">Update Enquiry</button>
            <?php else: ?>
                <button type="submit" class="btn btn-primary">Add Enquiry</button>
            <?php endif; ?>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<?php include '../templates/footer.php'; ?>