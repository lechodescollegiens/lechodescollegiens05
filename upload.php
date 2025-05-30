<?php
$target_dir = "uploads/";

// Créer le dossier s'il n'existe pas
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0755, true);
}

if (isset($_FILES["pdfs"]) && count($_FILES["pdfs"]["name"]) > 0) {
    $all_ok = true;
    for ($i = 0; $i < count($_FILES["pdfs"]["name"]); $i++) {
        $file_tmp = $_FILES["pdfs"]["tmp_name"][$i];
        $file_name = basename($_FILES["pdfs"]["name"][$i]);
        $file_type = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        // Vérifie que c'est un PDF
        if ($file_type != "pdf") {
            $all_ok = false;
            break;
        }

        // Optionnel : nettoyer le nom du fichier
        $file_name = preg_replace('/[^a-zA-Z0-9._-]/', '_', $file_name);

        move_uploaded_file($file_tmp, $target_dir . $file_name);
    }
    if ($all_ok) {
        header("Location: admin.html?upload=success");
    } else {
        header("Location: admin.html?upload=type");
    }
    exit;
} else {
    header("Location: admin.html?upload=error");
    exit;
}
?>
