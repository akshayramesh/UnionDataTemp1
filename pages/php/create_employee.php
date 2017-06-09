<?php
require "connect.php" ;


$val_name = $_POST["idName"];
$val_empID = $_POST["idEmployeeID"];
$val_sex = $_POST["idSex"];
$val_branch = $_POST["idBranch"];
$val_DOJ = $_POST["idDOJ"];
$val_DOR = $_POST["idDOR"];
$val_ContactNum = $_POST["idContactNum"];
$val_Address = $_POST["idAddress"];
$val_BR1 = $_POST["idBranchReq1"];
$val_BR2 = $_POST["idBranchReq2"];
$val_BR3 = $_POST["idBranchReq3"];
$val_relieFundMember = $_POST["idReliefFundMember"];
$val_unionName = $_POST["idUnionName"];


$sql_string = "INSERT INTO `employee` (`employeeID`, `name`, `sex`, `branch`, `branchid`, `doj`, `dor`, `contact`, `address`, `branchReq1`, `branchReq2`, `branchReq3`, `reliefFundMember`, `unionName`) VALUES ('$val_empID', '$val_name', '$val_sex', '$val_branch', '', '$val_DOJ', '$val_DOR', '$val_ContactNum', '$val_Address', '$val_BR1', '$val_BR2', '$val_BR3', '$val_relieFundMember', '$val_unionName')";
$success = "Created";

if ($conn->query($sql_string) === TRUE) {
    // echo "<div>" . $success . "</div>";
    echo "<script>
             alert('message sent succesfully'); 
             window.history.go(-1);
     </script>";
} else {
    echo "Error: " . $sql_string . "<br>" . $conn->error;
}

$conn->close();
?>

