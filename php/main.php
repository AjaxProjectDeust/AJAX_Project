<?php
	// On relaye la session
	session_start();
$array_gains_p1 = array();
$array_gains_p2 = array();

// Récuperation du parametre nombre de jetons p1 et p2
	if(isset($_GET['nb_jetons'])){
		$nb_jet_p1 = $_GET['nb_jetons'];
		$nb_jet_p2 = $_GET['nb_jetons'];
	}

    for ($i = 1; $i <= 3; $i++) {
        // Calcul du nouveau gain entre 0 et 100 Euros
        $gains_p1	=	rand(1,6);
        array_push($array_gains_p1, $gains_p1);

     
        $gains_p2	=	rand(1,6);
        array_push($array_gains_p2  , $gains_p2);
    }

//tableau de retour des résultats
    $_resultat = array(
		'jet_p1'=>	$nb_jet_p1,
		'jet_p2'=>	$nb_jet_p2,
        'gains_p1'=> $array_gains_p1,
        'gains_p2'=> $array_gains_p2
        );
    //envoi des données stockée dans un objet JSON
	echo json_encode($_resultat);


/*
	
	// Calcul du nouveau gain entre 0 et 100 Euros
	$gain	=	rand(0,100);

	if(isset($_SESSION[$nom]['gain'])){
		// Si la variable de session existe, il faut additionner le nouveau gain à l'ancien
		// Mémorise le gain en session
		$_SESSION[$nom]['gain']+=$gain;
		
		// Mémorise le nombre de tentatives
		$_SESSION[$nom]['tentatives']++;
	}else{
		// Si la variable de session n'existe pas, il faut l'initialiser
		// Mémorise le gain en session
		$_SESSION[$nom]['gain'] = $gain;	
		// Mémorise le nombre de tentatives
		$_SESSION[$nom]['tentatives'] = 1;
	}
	
	// On va retourner nos données au format JSON
	// Par simplicité, on va préalablement tout stocker dans un tablea
	// que l'on convertira ensuite en objet JSON grâce à json_encode
	$_resultat = array(
		'total'	=>	$_SESSION[$nom]['gain'],
		'texte'	=>	"Bravo ".$nom." ! Vous avez gagné ".$gain." Euros !"
	);

	// Envoi de la réponse à la page HTML
	echo json_encode($_resultat) ;*/
?>
