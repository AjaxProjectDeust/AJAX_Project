<?php
	// On relaye la session
	session_start();
// Récuperation du parametre nombre de jetons p1 et p2
	if(isset($_GET['nb_jet_p1']) && isset($_GET['nb_jet_p2'])){
		$nb_jet_p1 = $_GET['nb_jet_p1'];
		$nb_jet_p2 = $_GET['nb_jet_p2'];
	}


    echo $nb_jet_p1;
    echo $nb_jet_p2;
?>
