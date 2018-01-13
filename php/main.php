<?php
	// On relaye la session
	session_start();

    //stockage des 3 dés aléatoire
    $array_gains_p1 = array();
    $array_gains_p2 = array();
    
    //stockage des jets pour chaque dé
    $gains_p1;
    $gains_p2;

    //nombre de jetons
    $nb_jet_p1;
    $nb_jet_p2;

    // Récuperation du parametre nombre de jetons p1 et p2
	if(isset($_GET['nb_jetons_p1']) && isset($_GET['nb_jetons_p2'])){
		$nb_jet_p1 = $_GET['nb_jetons_p1'];
		$nb_jet_p2 = $_GET['nb_jetons_p2'];
	}

    //stockage dans un tableau des différents lancés de dés
    for ($i = 1; $i <= 3; $i++) {

        // Calcul du  gain entre 1 et 6 faces
        $gains_p1	=	rand(1,6);
        array_push($array_gains_p1, $gains_p1);

        $gains_p2	=	rand(1,6);
        array_push($array_gains_p2  , $gains_p2);
    }

    //addition des dés pour chaque lancé
    $gains_tot_p1 = $array_gains_p1[0] + $array_gains_p1[1] + $array_gains_p1[2];
    $gains_tot_p2 = $array_gains_p2[0] + $array_gains_p2[1] + $array_gains_p2[2];

/*
    $gagne = false;
  if($gagne == true){
        $gagne =="gagné"
    }else{
        $gagne =="perdu"
  }
*/
    //Différence entre les joueurs
    if($gains_tot_p1 > $gains_tot_p2){
       $dif = $gains_tot_p1 - $gains_tot_p2;
        $perte = $nb_jet_p1 - 100;
        //soustrait le nombre de jetons
        //$nb_jet_p2 = $nb_jet_p2 - 5 ;

        $ret_p1 = 'Bravo joueur 1, vous avez fait '.$dif.' de plus que le joueur 2 !'.'<br>'.' Vous avez gagné la manche';
        $ret_p2 = 'Joueur 2, vous perdez : '.$perte.' jetons';
        
    }else if($gains_tot_p2 > $gains_tot_p1){
       $dif = $gains_tot_p2 - $gains_tot_p1;
       $perte = $nb_jet_p1 - 100;
       $ret_p1 = 'Bravo joueur 2, vous avez fait '.$dif.' de plus que le joueur 1 !';  
        $ret_p2 = 'Joueur 2, vous perdez : '.$perte.' jetons';
        
        
    }else{
       $ret_p1 = 'Il y a égalité, les scores n\'ont pas bougé, veuillez relancer ! ';
        $perte = 0;
        $ret_p2 = 'Joueur 2, vous ne perdez rien.';
    }
    
    //tableau de retour des résultats
    $_resultat = array(
        // nombres de jetons reçus
		'jet_p1'=>	$nb_jet_p1 - 5,
		'jet_p2'=>	$nb_jet_p2,
        // différents gains des dés
        'gains_p1'=> $array_gains_p1,
        'gains_p2'=> $array_gains_p2,
        //
        'gains_tot_p1'=>$gains_tot_p1,
        'gains_tot_p2'=>$gains_tot_p2,
        //
        'ret_p1'=>$ret_p1,
        'ret_p2'=>$ret_p2
        );

    //envoi des données stockée dans un objet JSON
	echo json_encode($_resultat);
?>
