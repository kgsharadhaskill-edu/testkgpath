<?php
// Core setup
include '../config/session_check.php';
$pageTitle = "Add New Enquiry";
include '../config/database.php';

// Initialize variables to hold form data and errors
$fullName = $phone = $qualification = $dob = $course = '';
$errors = [];
$page_message = '';
$page_message_type = '';

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and trim form data, storing it for repopulation
    $fullName      = trim($_POST['full_name'] ?? '');
    $phone         = trim($_POST['phone'] ?? '');
    $qualification = trim($_POST['qualification'] ?? '');
    $dob           = trim($_POST['dob'] ?? '');
    $course        = trim($_POST['course'] ?? '');

    // --- Server-side Validation ---
    if (empty($fullName)) {
        $errors['full_name'] = "Full Name is required.";
    }
    if (empty($phone)) {
        $errors['phone'] = "Phone number is required.";
    } elseif (!preg_match('/^[0-9]{10}$/', $phone)) {
        $errors['phone'] = "Please enter a valid 10-digit phone number.";
    }
    if (empty($qualification)) {
        $errors['qualification'] = "Please select a qualification.";
    }
    if (empty($dob)) {
        $errors['dob'] = "Date of Birth is required.";
    }
    if (empty($course)) {
        $errors['course'] = "Interested Course is required.";
    }

    // If there are no validation errors, proceed to insert into the database
    if (empty($errors)) {
        try {
            $sql = "INSERT INTO enquiry (full_name, phone, qualification, dob, course) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            // Use the variables that hold the trimmed data
            $stmt->execute([$fullName, $phone, $qualification, $dob, $course]);

            // Set a success message in the session and redirect to the list page
            $_SESSION['message'] = "Enquiry added successfully!";
            $_SESSION['message_type'] = 'success';
            header("Location: create-enquiry.php");
            exit();

        } catch (PDOException $e) {
            // If the database insert fails, show an error on this page
            $page_message = "Database error: Could not add enquiry. Please try again.";
            // For debugging: error_log($e->getMessage());
            $page_message_type = 'danger';
        }
    } else {
        // If there are validation errors, set a general error message for this page
        $page_message = "Please fix the errors below and try again.";
        $page_message_type = 'danger';
    }
}

include '../templates/header.php';
?>

<!-- NEW: Display Page-Specific Messages (for validation or DB errors) -->
<?php if (!empty($page_message)): ?>
    <div class="alert alert-<?= htmlspecialchars($page_message_type) ?> alert-dismissible fade show" role="alert">
        <?= htmlspecialchars($page_message) ?>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
<?php endif; ?>

<div class="card card-primary">
    <div class="card-header">
        <h3 class="card-title"><?= $pageTitle ?></h3>
    </div>
    <!-- /.card-header -->
    
    <!-- form start -->
    <!-- MODIFIED: action is empty to submit to the current page -->
    <form action="" method="post">
        <div class="card-body">
            <div class="form-group">
                <label for="full_name">Full Name</label>
                <!-- MODIFIED: Added value attribute to repopulate and is-invalid class for errors -->
                <input type="text" class="form-control <?= isset($errors['full_name']) ? 'is-invalid' : '' ?>" id="full_name" name="full_name" placeholder="Enter full name" value="<?= htmlspecialchars($fullName) ?>" required>
                <!-- MODIFIED: Show specific error message -->
                <?php if (isset($errors['full_name'])): ?>
                    <span class="invalid-feedback d-block"><?= $errors['full_name'] ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" id="phone" name="phone" placeholder="Enter 10-digit phone number" pattern="[0-9]{10}" value="<?= htmlspecialchars($phone) ?>" required>
                <?php if (isset($errors['phone'])): ?>
                    <span class="invalid-feedback d-block"><?= $errors['phone'] ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <label for="qualification">Education Qualification</label>
                <select class="form-control <?= isset($errors['qualification']) ? 'is-invalid' : '' ?>" id="qualification" name="qualification" required>
                    <option value="" disabled <?= empty($qualification) ? 'selected' : '' ?>>Select Qualification</option>
                    <!-- MODIFIED: Logic to keep the selected option -->
                    <option value="student" <?= ($qualification == 'student') ? 'selected' : '' ?>>Student (Pursuing)</option>
                    <option value="graduate" <?= ($qualification == 'graduate') ? 'selected' : '' ?>>Graduate (Bachelor's)</option>
                    <option value="post_graduate" <?= ($qualification == 'post_graduate') ? 'selected' : '' ?>>Post Graduate (Master's)</option>
                    <option value="working" <?= ($qualification == 'working') ? 'selected' : '' ?>>Working Professional</option>
                    <option value="other" <?= ($qualification == 'other') ? 'selected' : '' ?>>Other</option>
                </select>
                <?php if (isset($errors['qualification'])): ?>
                    <span class="invalid-feedback d-block"><?= $errors['qualification'] ?></span>
                <?php endif; ?>
            </div>

            <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" class="form-control <?= isset($errors['dob']) ? 'is-invalid' : '' ?>" id="dob" name="dob" max="<?= date('Y-m-d'); ?>" value="<?= htmlspecialchars($dob) ?>" required>
                <?php if (isset($errors['dob'])): ?>
                    <span class="invalid-feedback d-block"><?= $errors['dob'] ?></span>
                <?php endif; ?>
            </div>

             <div class="form-group">
                <label for="course">Interested Course</label>
                <input type="text" class="form-control <?= isset($errors['course']) ? 'is-invalid' : '' ?>" id="course" name="course" placeholder="Enter interested course" value="<?= htmlspecialchars($course) ?>" required>
                <?php if (isset($errors['course'])): ?>
                    <span class="invalid-feedback d-block"><?= $errors['course'] ?></span>
                <?php endif; ?>
            </div>
        </div>
        <!-- /.card-body -->

        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="create-enquiry.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<?php include '../templates/footer.php'; ?>