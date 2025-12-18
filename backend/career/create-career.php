<?php
// File: career/create-career.php
// Purpose: Handles creation of a new job application, including resume upload.

include '../config/session_check.php';
include '../config/database.php';

$pageTitle = "Add New Job Application";
const UPLOAD_DIR = __DIR__ . '/uploads/';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILES = ['pdf', 'doc', 'docx'];

// Initialize variables
$app = []; // To hold form data on error
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data
    $app['name'] = trim($_POST['name'] ?? '');
    $app['email'] = trim($_POST['email'] ?? '');
    $app['phone'] = trim($_POST['phone'] ?? '');
    $app['position'] = trim($_POST['position'] ?? '');
    $app['experience'] = trim($_POST['experience'] ?? '');
    $app['linkedin'] = trim($_POST['linkedin'] ?? '');
    $app['github'] = trim($_POST['github'] ?? '');
    $app['message'] = trim($_POST['message'] ?? '');
    $app['resume_path'] = null;

    // --- Validation ---
    if (empty($app['name'])) $errors['name'] = 'Name is required.';
    if (empty($app['email']) || !filter_var($app['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'A valid email is required.';
    if (empty($app['phone'])) $errors['phone'] = 'Phone number is required.';
    if (empty($app['position'])) $errors['position'] = 'Position applied for is required.';

    // --- File Upload Handling ---
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['resume'];
        $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if ($file['size'] > MAX_FILE_SIZE) {
            $errors['resume'] = 'File is too large. Maximum size is 5MB.';
        } elseif (!in_array($file_ext, ALLOWED_FILES)) {
            $errors['resume'] = 'Invalid file type. Only PDF, DOC, and DOCX are allowed.';
        } else {
            // Create a unique filename to prevent overwrites
            $unique_filename = uniqid('resume_', true) . '.' . $file_ext;
            if (move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $unique_filename)) {
                $app['resume_path'] = $unique_filename;
            } else {
                $errors['resume'] = 'Failed to upload the resume. Please try again.';
            }
        }
    } else {
        $errors['resume'] = 'A resume file is required.';
    }


    // If no errors, insert into database
    if (empty($errors)) {
        try {
            $sql = "INSERT INTO job_applications (name, email, phone, position, experience, linkedin, github, message, resume_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $app['name'], $app['email'], $app['phone'], $app['position'],
                $app['experience'], $app['linkedin'], $app['github'], $app['message'], $app['resume_path']
            ]);

            $_SESSION['message'] = 'Job application submitted successfully.';
            $_SESSION['message_type'] = 'success';
            header("Location: index.php");
            exit();
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error adding application: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
            header("Location: index.php"); // Redirect on error to show message
            exit();
        }
    }
}

include '../templates/header.php';
?>

<div class="card card-primary">
    <div class="card-header"><h3 class="card-title"><?= $pageTitle ?></h3></div>
    <!-- Add enctype for file uploads -->
    <form action="create-career.php" method="post" enctype="multipart/form-data">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Full Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control <?= isset($errors['name']) ? 'is-invalid' : '' ?>" id="name" name="name" value="<?= htmlspecialchars($app['name'] ?? '') ?>" required>
                        <?php if (isset($errors['name'])): ?><div class="invalid-feedback"><?= $errors['name'] ?></div><?php endif; ?>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="position">Position Applied For <span class="text-danger">*</span></label>
                        <input type="text" class="form-control <?= isset($errors['position']) ? 'is-invalid' : '' ?>" id="position" name="position" value="<?= htmlspecialchars($app['position'] ?? '') ?>" required>
                         <?php if (isset($errors['position'])): ?><div class="invalid-feedback"><?= $errors['position'] ?></div><?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email">Email Address <span class="text-danger">*</span></label>
                        <input type="email" class="form-control <?= isset($errors['email']) ? 'is-invalid' : '' ?>" id="email" name="email" value="<?= htmlspecialchars($app['email'] ?? '') ?>" required>
                        <?php if (isset($errors['email'])): ?><div class="invalid-feedback"><?= $errors['email'] ?></div><?php endif; ?>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="phone">Phone Number <span class="text-danger">*</span></label>
                        <input type="text" class="form-control <?= isset($errors['phone']) ? 'is-invalid' : '' ?>" id="phone" name="phone" value="<?= htmlspecialchars($app['phone'] ?? '') ?>" required>
                        <?php if (isset($errors['phone'])): ?><div class="invalid-feedback"><?= $errors['phone'] ?></div><?php endif; ?>
                    </div>
                </div>
            </div>
             <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="experience">Years of Experience</label>
                        <input type="text" class="form-control" id="experience" name="experience" value="<?= htmlspecialchars($app['experience'] ?? '') ?>">
                    </div>
                </div>
                 <div class="col-md-6">
                    <div class="form-group">
                        <label for="resume">Upload Resume <span class="text-danger">*</span></label>
                        <div class="custom-file">
                           <input type="file" class="custom-file-input <?= isset($errors['resume']) ? 'is-invalid' : '' ?>" id="resume" name="resume" required>
                           <label class="custom-file-label" for="resume">Choose file...</label>
                           <?php if (isset($errors['resume'])): ?><div class="invalid-feedback d-block"><?= $errors['resume'] ?></div><?php endif; ?>
                        </div>
                         <small class="form-text text-muted">Allowed types: PDF, DOC, DOCX. Max size: 5MB.</small>
                    </div>
                </div>
            </div>
             <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="linkedin">LinkedIn Profile URL</label>
                        <input type="url" class="form-control" id="linkedin" name="linkedin" value="<?= htmlspecialchars($app['linkedin'] ?? '') ?>">
                    </div>
                </div>
                <div class="col-md-6">
                     <div class="form-group">
                        <label for="github">GitHub Profile URL</label>
                        <input type="url" class="form-control" id="github" name="github" value="<?= htmlspecialchars($app['github'] ?? '') ?>">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="message">Cover Letter / Message</label>
                <textarea class="form-control" id="message" name="message" rows="4"><?= htmlspecialchars($app['message'] ?? '') ?></textarea>
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit Application</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>
<!-- bs-custom-file-input script for showing filename in the file input -->
<script>
document.addEventListener('DOMContentLoaded', function () {
  var resumeInput = document.getElementById('resume');
  if (resumeInput) {
    resumeInput.addEventListener('change', function(e) {
      var fileName = e.target.files[0] ? e.target.files[0].name : 'Choose file...';
      var nextSibling = e.target.nextElementSibling;
      if (nextSibling) {
        nextSibling.innerText = fileName;
      }
    });
  }
});
</script>


<?php include '../templates/footer.php'; ?>