<?php
// File: newsletter/index.php
// Purpose: Lists all newsletter subscribers, handles single/bulk deletions

include '../config/session_check.php';
include '../config/database.php';

$action = $_GET['action'] ?? 'list';
$id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : 0;

// --- SINGLE DELETE LOGIC ---
if ($action === 'delete' && $id > 0) {
    try {
        $stmt = $pdo->prepare("DELETE FROM newsletter_emails WHERE id = ?");
        $stmt->execute([$id]);

        $_SESSION['message'] = 'Subscriber deleted successfully.';
        $_SESSION['message_type'] = 'success';
    } catch (PDOException $e) {
        $_SESSION['message'] = 'Error deleting subscriber: ' . $e->getMessage();
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

            $sql_delete = "DELETE FROM newsletter_emails WHERE id IN ($placeholders)";
            $stmt_delete = $pdo->prepare($sql_delete);
            $stmt_delete->execute($ids_to_delete);
            $deleted_count = $stmt_delete->rowCount();

            $_SESSION['message'] = $deleted_count . " subscribers deleted successfully.";
            $_SESSION['message_type'] = 'success';
        } catch (PDOException $e) {
            $_SESSION['message'] = 'Error during bulk deletion: ' . $e->getMessage();
            $_SESSION['message_type'] = 'danger';
        }
    } else {
        $_SESSION['message'] = 'No subscribers selected for deletion.';
        $_SESSION['message_type'] = 'warning';
    }
    header("Location: index.php");
    exit();
}

// --- LISTING & PAGINATION LOGIC ---
$pageTitle = "Manage Newsletter Subscribers";
$limit = 20;
$total_results = $pdo->query("SELECT COUNT(*) FROM newsletter_emails")->fetchColumn();
$total_pages = $total_results > 0 ? ceil($total_results / $limit) : 1;
$page = max(1, min($total_pages, (int)($_GET['page'] ?? 1)));
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM newsletter_emails ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
    <form action="index.php" method="post" onsubmit="return confirm('Are you sure you want to delete the selected subscribers?');">
        <div class="card-header">
            <h3 class="card-title">All Subscribers</h3>
            <div class="card-tools">
                <button type="submit" name="bulk_delete_submit" id="deleteSelectedBtn" class="btn btn-danger btn-sm" disabled>
                    <i class="fas fa-trash"></i> Delete Selected
                </button>
            </div>
        </div>

        <div class="card-body p-0">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width: 10px;"><input type="checkbox" id="selectAll"></th>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Subscribed At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($subscribers)): ?>
                        <?php foreach ($subscribers as $subscriber): ?>
                        <tr>
                            <td><input type="checkbox" name="ids[]" class="row-checkbox" value="<?= $subscriber['id'] ?>"></td>
                            <td><?= $row_number++ ?></td>
                            <td><?= htmlspecialchars($subscriber['email']) ?></td>
                            <td><?= htmlspecialchars(date("M d, Y H:i", strtotime($subscriber['created_at']))) ?></td>
                            <td>
                                <a href="index.php?action=delete&id=<?= $subscriber['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this subscriber?');">Delete</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="5" class="text-center">No subscribers found.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <?php if ($total_pages > 1): ?>
        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item <?= ($page <= 1) ? 'disabled' : '' ?>">
                    <a class="page-link" href="?page=<?= $page - 1 ?>">Previous</a>
                </li>
                <li class="page-item <?= ($page >= $total_pages) ? 'disabled' : '' ?>">
                    <a class="page-link" href="?page=<?= $page + 1 ?>">Next</a>
                </li>
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
