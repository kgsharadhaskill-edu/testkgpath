<?php
// File: career/edit-career.php
// Purpose: Handles updating a job application, including replacing the resume file.

include '../config/session_check.php';
include '../config/database.php';

$pageTitle = "Edit Job Application";
const UPLOAD_DIR = __DIR__ . '/uploads/';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILES = ['pdf', 'doc', 'docx'];

$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header("Location: index.php");
    exit();
}

$errors = [];

// Handle form submission for UPDATE
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize data
    $app['name'] = trim($_POST['name'] ?? '');
    $app['email'] = trim($_POST['email'] ?? '');
    $app['phone'] = trim($_POST['phone'] ?? '');
    $app['position'] = trim($_POST['position'] ?? '');
    $app['experience'] = trim($_POST['experience'] ?? '');
    $app['linkedin'] = trim($_POST['linkedin'] ?? '');
    $app['github'] = trim($_POST['github'] ?? '');
    $app['message'] = trim($_POST['message'] ?? '');
    $posted_id = (int)$_POST['id'];
    $current_resume_path = $_POST['current_resume_path'] ?? null;
    $new_resume_path = $current_resume_path; // Assume the path doesn't change

    // --- Validation ---
    if (empty($app['name'])) $errors['name'] = 'Name is required.';
    // ... add other validations as needed ...

    // --- New Resume Upload Handling ---
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['resume'];
        $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if ($file['size'] > MAX_FILE_SIZE) {
            $errors['resume'] = 'File is too large (Max 5MB).';
        } elseif (!in_array($file_ext, ALLOWED_FILES)) {
            $errors['resume'] = 'Invalid file type.';
        } else {
            $unique_filename = uniqid('resume_', true) . '.' . $file_ext;
            if (move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $unique_filename)) {
                // New file uploaded successfully, set the new path
                $new_resume_path = $unique_filename;
                // Delete the old file if it exists
                if ($current_resume_path && file_exists(UPLOAD_DIR . $current_resume_path)) {
                    unlink(UPLOAD_DIR . $current_resume_path);
                }
            } else {
                $errors['resume'] = 'Failed to upload new resume.';
            }
        }
    }

    if (empty($errors)) {
        try {
            $sql = "UPDATE job_applications SET name=?, email=?, phone=?, position=?, experience=?, 
                    linkedin=?, github=?, message=?, resume_path=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $app['name'], $app['email'], $app['phone'], $app['position'], $app['experience'],
                $app['linkedin'], $app['github'], $app['message'], $new_resume_path, $posted_id
            ]);
            $_SESSION['message'] = 'Application updated successfully.';
            $_SESSION['message_type'] = 'success';
            header("Location: index.php");
            exit();
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error updating application: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
        }
    }
    // Repopulate on error
    $application = array_merge($_POST, $app);

} else {
    // Fetch existing data for the form
    $stmt = $pdo->prepare("SELECT * FROM job_applications WHERE id = ?");
    $stmt->execute([$id]);
    $application = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$application) {
        $_SESSION['message'] = 'Application not found.';
        $_SESSION['message_type'] = 'warning';
        header("Location: index.php");
        exit();
    }
}

include '../templates/header.php';
?>

<div class="card card-warning">
    <div class="card-header"><h3 class="card-title"><?= $pageTitle ?></h3></div>
    <form action="edit-career.php?id=<?= $id ?>" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id" value="<?= htmlspecialchars($application['id']) ?>">
        <input type="hidden" name="current_resume_path" value="<?= htmlspecialchars($application['resume_path']) ?>">
        
        <div class="card-body">
            <!-- Form fields are identical to create-career.php, but pre-filled -->
            <!-- Using short syntax for brevity -->
            <div class="row">
                <div class="col-md-6 form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($application['name'] ?? '') ?>" required>
                </div>
                <div class="col-md-6 form-group">
                    <label>Position</label>
                    <input type="text" name="position" class="form-control" value="<?= htmlspecialchars($application['position'] ?? '') ?>" required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" value="<?= htmlspecialchars($application['email'] ?? '') ?>" required>
                </div>
                <div class="col-md-6 form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" class="form-control" value="<?= htmlspecialchars($application['phone'] ?? '') ?>" required>
                </div>
            </div>
             <div class="row">
                <div class="col-md-6 form-group">
                    <label>Experience</label>
                    <input type="text" name="experience" class="form-control" value="<?= htmlspecialchars($application['experience'] ?? '') ?>">
                </div>
                 <div class="col-md-6 form-group">
                    <label>Current Resume</label>
                    <div>
                        <?php if (!empty($application['resume_path'])): ?>
                            <a href="uploads/<?= htmlspecialchars($application['resume_path']) ?>" target="_blank">
                                <i class="fas fa-file-alt"></i> View Current Resume
                            </a>
                        <?php else: ?>
                            <span class="text-muted">No resume on file.</span>
                        <?php endif; ?>
                    </div>
                    <label for="resume" class="mt-2">Upload New Resume (Optional)</label>
                    <div class="custom-file">
                       <input type="file" class="custom-file-input <?= isset($errors['resume']) ? 'is-invalid' : '' ?>" id="resume" name="resume">
                       <label class="custom-file-label" for="resume">Choose new file...</label>
                       <?php if (isset($errors['resume'])): ?><div class="invalid-feedback d-block"><?= $errors['resume'] ?></div><?php endif; ?>
                    </div>
                </div>
            </div>
             <!-- ... other fields ... -->
              <div class="form-group">
                <label>Cover Letter / Message</label>
                <textarea class="form-control" name="message" rows="4"><?= htmlspecialchars($application['message'] ?? '') ?></textarea>
            </div>
        </div>
        <div class="card-footer">
            <button type="submit" class="btn btn-warning">Update Application</button>
            <a href="index.php" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>
<script>
// Script for showing filename in the file input
document.addEventListener('DOMContentLoaded', function () {
  var resumeInput = document.getElementById('resume');
  if (resumeInput) {
    resumeInput.addEventListener('change', function(e) {
      var fileName = e.target.files[0] ? e.target.files[0].name : 'Choose new file...';
      e.target.nextElementSibling.innerText = fileName;
    });
  }
});
</script>

<?php include '../templates/footer.php'; ?>