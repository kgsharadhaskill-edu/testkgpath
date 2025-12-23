<?php
include 'config/session_check.php';
$pageTitle = "Dashboard";
include 'templates/header.php';
?>

<div class="row">
    <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
            <div class="inner"><h3>Enquiry</h3><p>Manage all Enquiry.</p></div>
            <div class="icon"><i class="fas fa-user-graduate"></i></div>
            <a href="enquiry/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
            <div class="inner"><h3>Career</h3><p>Manage all Career Enquiry</p></div>
            <div class="icon"><i class="fas fa-calendar-check"></i></div>
            <a href="career/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
            <div class="inner"><h3>Newsletter</h3><p>View all Enquiry from Newsletter</p></div>
            <div class="icon"><i class="fas fa-file-download"></i></div>
            <a href="blog/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <div class="small-box bg-danger">
            <div class="inner"><h3>Contact form</h3><p>View all Enquiry from Contact Page</p></div>
            <div class="icon"><i class="fas fa-file-download"></i></div>
            <a href="contact/index.php" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
</div>

<?php include 'templates/footer.php'; ?>