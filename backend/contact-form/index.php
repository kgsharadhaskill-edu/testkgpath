<?php
// File: contact/index.php
// Purpose: Lists all contact form submissions, handles single and bulk deletions.

include '../config/session_check.php';
include '../config/database.php';

$action = $_GET['action'] ?? 'list';
$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;

// --- SINGLE DELETE LOGIC ---
if ($action === 'delete' && $id > 0) {
    try {
        $sql = "DELETE FROM contact_form WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $_SESSION['message'] = 'Contact submission deleted successfully.';
        $_SESSION['message_type'] = 'success';
    } catch (PDOException $e) {
        $_SESSION['message'] = 'Error deleting contact submission: ' . $e->getMessage();
        $_SESSION['message_type'] = 'danger';
    }
    header("Location: index.php"); // Redirect to the list view
    exit();
}

// --- BULK DELETE LOGIC ---
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['bulk_delete_submit'])) {
    $ids_to_delete = $_POST['ids'] ?? [];
    if (!empty($ids_to_delete)) {
        try {
            // Sanitize all IDs to be integers
            $ids_to_delete = array_map('intval', $ids_to_delete);
            $placeholders = implode(',', array_fill(0, count($ids_to_delete), '?'));
            $sql = "DELETE FROM contact_form WHERE id IN ($placeholders)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($ids_to_delete);
            $_SESSION['message'] = $stmt->rowCount() . " contact submissions deleted successfully.";
            $_SESSION['message_type'] = 'success';
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error during bulk deletion: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
        }
    } else {
        $_SESSION['message'] = 'No contact submissions selected for deletion.';
        $_SESSION['message_type'] = 'warning';
    }
    header("Location: index.php"); // Redirect to the list view
    exit();
}

// --- LISTING, SORTING & PAGINATION LOGIC ---
$pageTitle = "Manage Contact Submissions";
$allowed_sort_columns = ['id', 'name', 'phone', 'email', 'subject', 'created_at'];
$sort_col = in_array($_GET['sort'] ?? '', $allowed_sort_columns) ? $_GET['sort'] : 'created_at';
$sort_order = strtoupper($_GET['order'] ?? 'DESC') === 'ASC' ? 'ASC' : 'DESC';

$limit = 10;
$total_results = $pdo->query("SELECT count(*) FROM contact_form")->fetchColumn();
$total_pages = $total_results > 0 ? ceil($total_results / $limit) : 1;
$page = max(1, min($total_pages, (int)($_GET['page'] ?? 1)));
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM contact_form ORDER BY {$sort_col} {$sort_order} LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sort_params = "&sort={$sort_col}&order={$sort_order}";
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
    <form action="index.php" method="post" onsubmit="return confirm('Are you sure you want to delete the selected contact submissions?');">
        <div class="card-header">
            <h3 class="card-title">All Contact Submissions</h3>
            <div class="card-tools">
                <button type="submit" name="bulk_delete_submit" id="deleteSelectedBtn" class="btn btn-danger btn-sm" disabled><i class="fas fa-trash"></i> Delete Selected</button>
                <a href="create-contact.php" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Add New Contact</a>
                <a href="export-contact.php" class="btn btn-success btn-sm"><i class="fas fa-file-excel"></i> Export to Excel</a>
            </div>
        </div>
        <div class="card-body p-0">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px;"><input type="checkbox" id="selectAll"></th>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Submitted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($contacts)): ?>
                        <?php foreach ($contacts as $contact): ?>
                        <tr>
                            <td><input type="checkbox" name="ids[]" class="row-checkbox" value="<?= $contact['id'] ?>"></td>
                            <td><?= $row_number++ ?></td>
                            <td><?= htmlspecialchars($contact['name']) ?></td>
                            <td><?= htmlspecialchars($contact['phone']) ?></td>
                            <td><?= htmlspecialchars($contact['email']) ?></td>
                            <td><?= htmlspecialchars($contact['subject']) ?></td>
                            <td><?= htmlspecialchars(date("M d, Y h:i A", strtotime($contact['created_at']))) ?></td>
                            <td>
                                <a href="edit-contact.php?id=<?= $contact['id'] ?>" class="btn btn-sm btn-warning">Edit</a>
                                <a href="index.php?action=delete&id=<?= $contact['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this contact submission?')">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="8" class="text-center">No contact submissions found.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php if ($total_pages > 1): ?>
        <div class="card-footer clearfix">
             <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>"><a class="page-link" href="?page=<?= $page - 1 . $sort_params ?>">Previous</a></li>
                <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>"><a class="page-link" href="?page=<?= $page + 1 . $sort_params ?>">Next</a></li>
            </ul>
        </div>
        <?php endif; ?>
    </form>
</div>
<script>
// Javascript for bulk selection
document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const deleteButton = document.getElementById('deleteSelectedBtn');

    function toggleDeleteButton() {
        // Enable button if at least one checkbox is checked
        deleteButton.disabled = !Array.from(rowCheckboxes).some(cb => cb.checked);
    }

    selectAllCheckbox.addEventListener('change', () => {
        rowCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
        toggleDeleteButton();
    });

    rowCheckboxes.forEach(cb => cb.addEventListener('change', toggleDeleteButton));

    // Initial check when page loads
    toggleDeleteButton();
});
</script>

<?php include '../templates/footer.php'; ?>