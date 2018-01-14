<?php
include_once "./jet_des.php";
    
	// On relaye la session
        session_start();
    //    $_SESSION['joueur1'] = $_POST['jetons_restants_p1'];
    //    $_SESSION['joueur2'] = $_POST['jetons_restants_p2'];

            
    //    $jeton_p1 = $_SESSION['joueur1'];
    //    $jeton_p2 = $_SESSION['joueur2'];

    $nbr_jetons = $_POST['nbre_jetons'];

    $_SESSION["nbjetons"] = array($nbr_jetons,$nbr_jetons);
    $_SESSION["j1_name"] = "Joueur 1";
    $_SESSION["j2_name"] = "IA";

    $response= array("j1_jetons" => $_SESSION["nbjetons"][0],
                     "j1_name" => "Joueur 1",
                     "j2_jetons" => $_SESSION["nbjetons"][1],
                     "j2_name" => "IA");

    echo json_encode($response);
?>