<?php
    //array   
    $valeurs = array("321" =>2,
                     "432"=>2,
                     "543"=>2,
                     "654"=>2,
                     "222"=>2,
                     "211"=>2,
                     "333"=>3,
                     "311"=>3,
                     "444"=>4,
                     "411"=>4,
                     "555"=>5,
                     "511"=>5,
                     "666"=>6,
                     "611"=>6,
                     "111"=>7,
                     "421"=>10);


    function calculRang($des)
    {
        global $valeurs;
        
        $des_concat = normalizeDices($des);
        $rang = array_search($des_concat,array_keys($valeurs));

        return $rang ? $rang : -1;
    }

    function calculGain($des)
    {
        global $valeurs;
        $des_concat = normalizeDices($des);
        
        if (array_key_exists($des_concat,$valeurs))
            return $valeurs[$des_concat];

        return 1;
    } 

    function normalizeDices($des)
    {
        $tableau = $des;

        rsort($tableau);

        return $tableau[0].$tableau[1].$tableau[2];
    }

?>