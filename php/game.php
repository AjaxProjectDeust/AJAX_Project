<?php
    include_once "/jet_des.php";
    include_once "/calculs.php";
    session_start();

    $des_j1 = lanceDes();
    $des_j2 = lanceDes();
    $rang_j1 = calculRang($des_j1);
    $rang_j2 = calculRang($des_j2);
    $gain_manche=0;
    $gagnant = "";
    $gagnant_manche = "";

    if($rang_j1 > $rang_j2)
    {
        $gain = calculGain($des_j1);
        $gain_manche = comptePoints(0, 1,$gain);
        $gagnant_manche="Le joueur 1 a gagné. Le joueur 2 reçoit ".$gain_manche." jetons";
    }
    
    else if($rang_j1 < $rang_j2)
    {
        $gain = calculGain($des_j2);
        $gain_manche = comptePoints(1, 0,$gain);
        $gagnant_manche="Le joueur 2 a gagné. Le joueur 1 reçoit ".$gain_manche." jetons";
    }

    else
    {
        $gagnant_manche="Egalite, rien ne ce passe";
    }

    if($_SESSION["nbjetons"][0] <= 0)
    {
        $gagnant = $_SESSION["j1_name"];
    }

    if($_SESSION["nbjetons"][1] <= 0)
    {
        $gagnant = $_SESSION["j2_name"];
    }

    $response = array("gagnant" => $gagnant, 
                      "gagnant_manche" => $gagnant_manche,
                     "gain_manche" => $gain_manche,
                     "des_j1" => $des_j1,
                     "des_j2" => $des_j2, 
                     "j1_jetons" => $_SESSION["nbjetons"][0],
                     "j2_jetons" => $_SESSION["nbjetons"][1]);

    echo json_encode($response);

    // fonction calculant le gain réel pour éviter des scores négatifs
    function comptePoints($index_gagnant, $index_perdant, $gain)
    {
        $diff = $gain - $_SESSION["nbjetons"][$index_gagnant];
        $gain_reel = $diff <= 0 ? $gain : $_SESSION["nbjetons"][$index_gagnant];
        
        $_SESSION["nbjetons"][$index_gagnant] -= $gain_reel;
        $_SESSION["nbjetons"][$index_perdant] += $gain_reel;
        
        return $gain_reel;
    }
?>