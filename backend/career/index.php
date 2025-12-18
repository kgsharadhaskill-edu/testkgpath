<?php
// File: career/index.php
// Purpose: Lists all job applications, handles single/bulk deletions, including resume files.

include '../config/session_check.php';
include '../config/database.php';

$action = $_GET['action'] ?? 'list';
$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;
const UPLOAD_DIR = __DIR__ . '/uploads/';

// --- SINGLE DELETE LOGIC ---
if ($action === 'delete' && $id > 0) {
    try {
        // First, get the resume path to delete the file
        $stmt = $pdo->prepare("SELECT resume_path FROM job_applications WHERE id = ?");
        $stmt->execute([$id]);
        $resume_path = $stmt->fetchColumn();

        // Delete the database record
        $sql = "DELETE FROM job_applications WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);

        // If a resume file exists, delete it from the server
        if ($resume_path && file_exists(UPLOAD_DIR . $resume_path)) {
            unlink(UPLOAD_DIR . $resume_path);
        }

        $_SESSION['message'] = 'Job application deleted successfully.';
        $_SESSION['message_type'] = 'success';
    } catch (PDOException $e) {
        $_SESSION['message'] = 'Error deleting application: ' . $e->getMessage();
        $_SESSION['message_type'] = 'danger';
    }
    header("Location: index.php");
    exit();
}

// --- BULK DELETE LOGIC ---
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['bulk_delete_submit'])) {
    $ids_to_delete = $_POST['ids'] ?? [];
    if (!empty($ids_to_delete)) {
        try {
            $ids_to_delete = array_map('intval', $ids_to_delete);
            $placeholders = implode(',', array_fill(0, count($ids_to_delete), '?'));

            // Get all resume paths for the selected IDs before deleting
            $sql_select = "SELECT resume_path FROM job_applications WHERE id IN ($placeholders)";
            $stmt_select = $pdo->prepare($sql_select);
            $stmt_select->execute($ids_to_delete);
            $resume_paths = $stmt_select->fetchAll(PDO::FETCH_COLUMN);

            // Delete records from the database
            $sql_delete = "DELETE FROM job_applications WHERE id IN ($placeholders)";
            $stmt_delete = $pdo->prepare($sql_delete);
            $stmt_delete->execute($ids_to_delete);
            $deleted_count = $stmt_delete->rowCount();

            // Delete associated resume files
            foreach ($resume_paths as $resume_path) {
                if ($resume_path && file_exists(UPLOAD_DIR . $resume_path)) {
                    unlink(UPLOAD_DIR . $resume_path);
                }
            }

            $_SESSION['message'] = $deleted_count . " applications deleted successfully.";
            $_SESSION['message_type'] = 'success';
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error during bulk deletion: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
        }
    } else {
        $_SESSION['message'] = 'No applications selected for deletion.';
        $_SESSION['message_type'] = 'warning';
    }
    header("Location: index.php");
    exit();
}


// --- LISTING & PAGINATION LOGIC ---
$pageTitle = "Manage Job Applications";
$limit = 10;
$total_results = $pdo->query("SELECT count(*) FROM job_applications")->fetchColumn();
$total_pages = $total_results > 0 ? ceil($total_results / $limit) : 1;
$page = max(1, min($total_pages, (int)($_GET['page'] ?? 1)));
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM job_applications ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$applications = $stmt->fetchAll(PDO::FETCH_ASSOC);

$row_number = ($page - 1) * $limit + 1;

include '../templates/header.php';
?>

<!-- Display Session Messages -->
<?php if (isset($_SESSION['message'])): ?>
<div class="alert alert-<?= htmlspecialchars($_SESSION['message_type'] ?? 'info') ?> alert-dismissible fade show" role="alert">
    <?= htmlspecialchars($_SESSION['message']) ?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
</div>
<?php unset($_SESSION['message'], $_SESSION['message_type']); endif; ?>


<div class="card">
    <form action="index.php" method="post" onsubmit="return confirm('Are you sure you want to delete the selected applications? This will also delete their resumes.');">
        <div class="card-header">
            <h3 class="card-title">All Job Applications</h3>
            <div class="card-tools">
                <button type="submit" name="bulk_delete_submit" id="deleteSelectedBtn" class="btn btn-danger btn-sm" disabled><i class="fas fa-trash"></i> Delete Selected</button>
                <a href="create-career.php" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Add New Application</a>
                <a href="export-career.php" class="btn btn-success btn-sm"><i class="fas fa-file-excel"></i> Export to Excel</a>
            </div>
        </div>
        <div class="card-body p-0">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px;"><input type="checkbox" id="selectAll"></th>
                        <th>S.No</th>
                        <th>Applicant Name</th>
                        <th>Position</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Submitted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($applications)): ?>
                        <?php foreach ($applications as $app): ?>
                        <tr>
                            <td><input type="checkbox" name="ids[]" class="row-checkbox" value="<?= $app['id'] ?>"></td>
                            <td><?= $row_number++ ?></td>
                            <td><?= htmlspecialchars($app['name']) ?></td>
                            <td><?= htmlspecialchars($app['position']) ?></td>
                            <td>
                                <?= htmlspecialchars($app['email']) ?><br>
                                <?= htmlspecialchars($app['phone']) ?>
                            </td>
                            <td>
                                <?php if (!empty($app['resume_path'])): ?>
                                    <a href="uploads/<?= htmlspecialchars(basename($app['resume_path'])) ?>" target="_blank" class="btn btn-xs btn-info">View Resume</a>
                                <?php else: ?>
                                    <span class="text-muted">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td><?= htmlspecialchars(date("M d, Y", strtotime($app['created_at']))) ?></td>
                            <td>
                                <a href="edit-career.php?id=<?= $app['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                                <a href="index.php?action=delete&id=<?= $app['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure? This will also delete the resume file.')">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="8" class="text-center">No job applications found.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php if ($total_pages > 1): ?>
        <div class="card-footer clearfix">
             <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>"><a class="page-link" href="?page=<?= $page - 1 ?>">Previous</a></li>
                <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>"><a class="page-link" href="?page=<?= $page + 1 ?>">Next</a></li>
            </ul>
        </div>
        <?php endif; ?>
    </form>
</div>
<script>
// Javascript for bulk selection (no changes needed here)
document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const deleteButton = document.getElementById('deleteSelectedBtn');

    function toggleDeleteButton() {
        deleteButton.disabled = !Array.from(rowCheckboxes).some(cb => cb.checked);
    }

    selectAllCheckbox.addEventListener('change', () => {
        rowCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        toggleDeleteButton();
    });

    rowCheckboxes.forEach(cb => cb.addEventListener('change', toggleDeleteButton));
    toggleDeleteButton();
});
</script>

<?php include '../templates/footer.php'; ?>