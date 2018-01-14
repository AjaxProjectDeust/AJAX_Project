
//écrit dans un span si la valeur de l'input est bonne
function verif_jetons() {
    // Si le champs n'est pas renseigné, on affiche un message d'erreur en rouge
    var element = $('#span_nbre_jetons');
    var message = null;

    if (nbre_jetons.value == "")
        message = "Non renseigné !";
    //vérif  si un nombre
    else if (isNaN(nbre_jetons.value) == true) 
        message = "Mettez un nombre seulement";
    else if (nbre_jetons.value < 20 || nbre_jetons.value > 100)
        message = "Le nombre  n'est pas compris entre 20 et 99";

    if (message == null) {
        element.html("Valide");
       // element.style.color = "green";
        return true;
    }
    else {
        element.html(message);
       // element.style.color = "red";
        return false;
    }
        
}

/*boutton qui valide l'envoi du bouton et déclenche l'envoit les données*/
function envoi_jeton() {
    //reverification
    if (verif_jetons() == true) {
        $.post("php/init.php", $("#startGameForm").serialize(),function(data){
            var p1 = {};
            var p2 = {};
            
            var response = JSON.parse(data);
            p1.name = response.j1_name;
            p1.nbjetons = response.j1_jetons;
            
            p2.name = response.j2_name;
            p2.nbjetons = response.j2_jetons;
            
            //afficher dans dom
            init_affichage(p1, p2);
            
        })

    } 
    else {
        document.getElementById("span_nbre_jetons").innerHTML = "Vous ne pouvez envoyer le score avant la validation du formulaire <br>Ecrivez un nombre comprit en 20 et 99";
    }
}

function init_affichage(p1, p2) {
    $("#startGameForm").addClass("hidden");
    
    $("#jetons_restants_p1").html(p1.nbjetons);
    $("#jetons_restants_p2").html(p2.nbjetons);
    
    $("#affich_jetons").removeClass("hidden");
    $("#affich_lancer").removeClass("hidden");
}

function startGame() {
    $.post("php/game.php", null,function(data){
        var response = JSON.parse(data);
        $("#start").val("relancer");

        $("#jetons_restants_p1").html(response.j1_jetons);
        $("#jetons_restants_p2").html(response.j2_jetons);
        
        $("#msg_score").html(response.gagnant_manche);
        
        $("#affich_desj1").html(affiche_des(response.des_j1));
        $("#affich_desj2").html(affiche_des(response.des_j2));

        if(response.gagnant)
        {
            $("#msg_gagnant").html("Le gagnant de la partie est " + response.gagnant);
        }
        
    })
}

function affiche_des(des)
{
    var html = '<span class="des">';
    
    /* codes caracteres :
     * 1 -> &#9856;
     * 2 -> &#9857;
     * 3 -> &#9858;
     * 4 -> &#9859;
     * 5 -> &#9860;
     * 6 -> &#9861;
     */
    des.forEach(function(de) {
        html += '&#' + (9855 + de) + ';';
    })
    
    html += '</span>';
    
    return html;
}
/* Fonction contenant le moteur AJAX pointant sur le fichier cible PHP
Cette fonction traite également la réponse du serveur 
*/