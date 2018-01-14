/* 
 * Instanciation XMLHTTPRequest
 */

/*1x que verif input est bien rempli 
On peut utiliser la fonction valide_jetons
envoi jetons des joueurs */
function getRequest() {
    // On initialise la variable dans laquelle va être stockée notre objet XMLHTTPRequest
    var xhr;
    if (window.XMLHttpRequest) {
        // Nous testons par la condition précédente si la methode entre parenthèse est supportée par le navigateur.
        // Les anciennes versions d'Internet Explorer ne supportant pas cette méthode, c'est la deuxième solution qui sera utilisée
        xhr = new XMLHttpRequest(); // création de l'instance et stockage dans la variable xhr			
    } else if (window.ActiveXObject) {
        // Nous testons la conditions précédente si la methode entre parenthèse est supportée par le navigateur.
        // Les anciennes versions d'Internet Explorer ne supporte que cette méthode ActiveX (cf le cours pour plus de précisions)
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); // création de l'instance et stockage dans la variable xhr				
    } else {
        // Si le navigateur de l'utilisateur ne supporte aucune des deux méthodes, la technologie AJAX ne peut être utilisée.
        // On affiche donc un message d'erreur et on arrête le traitement en effectuant un "return false"
        alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
        return false;
    }
    // Si le script arrive jusqu'ici c'est que l'instanciation de l'objet XMLHTTPRequest s'est déroulée avec succès.
    // Nous retournons donc cette instanciation stockée dans la variable xhr
    return xhr;
}

//écrit dans un span si la valeur de l'input est bonne
function verif_input() {
    // Si le champs n'est pas renseigné, on affiche un message d'erreur en rouge
    if (nbre_jetons.value == "") {
        document.getElementById('span_nbre_jetons').innerHTML = "Non renseigné !";
        document.getElementById('span_nbre_jetons').style.color = "red";
        //retour faux pour empecher l'envoi
        return false;

        //vérif nombre de chiffres 
    } else if (nbre_jetons.value.length > 2) { // Si la taille est inférieure à 3 caractères, on affiche un message d'erreur en rouge
        document.getElementById('span_nbre_jetons').innerHTML = "Trop long !";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false;

        //vérif nombre en 20 et 99 
    } else if (nbre_jetons.value < 20 || nbre_jetons.value > 100) { // Si la taille est inférieure à 3 caractères, on affiche un message d'erreur en rouge
        document.getElementById('span_nbre_jetons').innerHTML = "Le nombre  n'est pas compris entre 20 et 99";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false;

        //vérif  si un nombre
    } else if (isNaN(nbre_jetons.value) == true) {
        document.getElementById('span_nbre_jetons').innerHTML = "Mettez un nombre seulement";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false;

    } else { // La taille du champ est ok, on affiche un message en vert
        document.getElementById('span_nbre_jetons').innerHTML = "Valide";
        document.getElementById('span_nbre_jetons').style.color = "green";
        //transforme la chaine de caractère en nombre
        // var nbre_jetons = parseInt(nbre_jetons.value);
        //retour true pour valide l'envoi
        return true;
    }
}

/*bouton qui valide l'envoi du bouton et déclenche l'envoit les données*/
function valide_jetons() {
    //verif_input
    if (verif_input() == true) {

        lance_affichage_jetons();
        // affiche le nombre de jetons pour le joueur en remplacant l'input
        return true

    } else {
        document.getElementById("span_nbre_jetons").innerHTML = "Vous ne pouvez envoyer le score avant la validation du formulaire <br>Ecrivez un nombre comprit en 25 et 99";
        return false;
    }
}

function lance_affichage_jetons() {
    //recupère le champs du formulaire
    var p1 = document.getElementById("player_1");
    var p2 = document.getElementById("player_2");
    //recupère le bouton relance
    var r = document.getElementById("relancer");

    //affiche le nombre de jetons des joueurs au départ
    p1.innerHTML = "Player 1 : " + p1_value;
    p2.innerHTML = "Player 2 : " + p2_value;

    //ajoute la classe résultat pour l'affichage
    p1.classList.add("resultat");
    p2.classList.add("resultat");

    //affiche le contenu caché qui fait apparaitre le bouton et 
    document.getElementsByTagName("div")[1].style.visibility = "visible";

    // if (jetons_p1.innerHTML == "" || jetons_p2.innerHTML == "") {
    jetons_p1.innerHTML = "Jetons joueur 1 : " + p1_value;
    jetons_p2.innerHTML = "Jetons joueur 2 : " + p2_value;
    //}
    return [p1_value, p2_value]
}

//bouton de relance si les jetons sont déja affichés
function relance() {

    //alert(recup_jetons(retour.jet_j1);

    lance = lance_affichage_jetons()

    lancePhaseDeux(p1_value, p2_value);
    //change la valeur du bouton lancer en relancer
    relancer.value = "Relancer !";

    // retourne un tabeau de valeurs qui seront envoyées à ajax;

    //  return [p1_value, p2_value];

    //var jetons_p1 = document.getElementById('jetons_restants_p1');
    //var jetons_p2 = document.getElementById('jetons_restants_p2');
    //jetons_p1.innerHTML = retour.jet_p1;

    /*
    if (affiche_jetons_restants() == true) {
        
    } else {
        alert("echec lancement");
    }
    */
}

function retour_calc_php(retour) {
    //affichage du contenu invisible
    var visible = document.getElementsByClassName("hidden");

    //jetons restants
    var jet_p1 = retour.jet_p1;
    var jet_p2 = retour.jet_p2;

    //scores 
    var sc_p1 = document.getElementById('score_p1');
    var sc_p2 = document.getElementById('score_p2');

    //message de retour
    var msg_scr1 = document.getElementById('msg_score_1');
    var msg_scr2 = document.getElementById('msg_score_2');

    //affichage retour
    msg_scr1.innerHTML = retour.ret_p1;
    msg_scr2.innerHTML = retour.ret_p2;

    //affichage jetons
    jetons_p1.innerHTML = 'Jetons joueur 1 : ' + jet_p1 + '<br>';
    jetons_p2.innerHTML = 'Jetons joueur 2 : ' + jet_p2 + '<br>';

    //actualise les valeurs des jetons restants
    p1_value = jet_p1;
    p2_value = jet_p2;

    //parcours des dés pour l'affichage
    //for (i = 0; i < 3; i++) {
    //variables tampon pour les gains de retours des dés
    var r_g1 = retour.gains_p1;
    var r_g2 = retour.gains_p2;

    //dés du joueur 1
    gains_p1[0] = document.getElementById('gains_p1').innerHTML = 'Lancé de dés joueur 1 : ' +
        '<br> Dé 1 : ' + r_g1[0] +
        '<br> Dé 2 : ' + r_g1[1] +
        '<br> Dé 3 : ' + r_g1[2] +
        '<hr> Score joueur p1 : ' + retour.gains_tot_p1;

    //dés du joueur 2
    gains_p2[0] = document.getElementById('gains_p2').innerHTML = 'Lancé de dés joueur 2 : ' +
        '<br> Dé 1 : ' + r_g2[0] +
        '<br> Dé 2 : ' + r_g2[1] +
        '<br> Dé 3 : ' + r_g2[2] +
        '<hr> Score joueur p2 : ' + retour.gains_tot_p2;
    alert(gains_p1[0])
    /*
            //crée la balise
            var div_p1 = document.createElement('div_'+i+'');
            //crée le texte
            var div_text_1 = document.createTextNode("This is new.");
            //accroche le texte à la balise
            div_p1.appendChild(div_text_1);
            //recup la balise afin d'atacher
            var element = document.getElementById("gains_p1");
            //accroche la div à l'id souhaité
            element.appendChild(div_p1);
    */
    //crée la balise
    var div_p1 = document.createElement('div');
    //crée classe
    div_p1.className = "div_p1";
    //crée le texte
    var div_text_1 = document.createTextNode("salut");
    //accroche le texte à la balise div_p1
    div_p1.appendChild(div_text_1);
    //recup la balise afin d'attacher
    var element = document.getElementById("gains_p1");
    //accroche la div à l'id souhaité
    var div = element.appendChild(div_p1);
    
    


    //}

    for (i = 0; i < visible.length; i++) {
        visible[i].style.visibility = "visible";
    }

}

/* Fonction contenant le moteur AJAX pointant sur le fichier cible PHP
Cette fonction traite également la réponse du serveur 
*/
function lancePhaseDeux(p1, p2) {
    // On fait appel à notre fonction getRequest afin de créer une instance de l'objet XMLHTTPRequest.
    var xhr = getRequest();
    // Nous vérifions que la fonction getRequest a parfaitement fonctionnée 
    // cette fonction nous retourne le booléen "false" si une erreur s'est produite
    if (xhr !== false) {
        // En utilisant la méthode .open, nous construisons un appel AJAX vers le fichier adapté
        // On pense à rajouter un parametre de type GET à notre URL

        //Ce sont les parametres entre les guillemets qui seront recueuillis en PhP
        var nb_jet_ajax_p1 = p1;
        var nb_jet_ajax_p2 = p2;
        var nb_jetons = '?nb_jetons_p1=' + nb_jet_ajax_p1 + '&nb_jetons_p2=' + nb_jet_ajax_p2;
        //envoit les données
        xhr.open("GET", "php/main.php" + nb_jetons, true);

        // On prépare une fonction qui sera appelée en callback, à chaque changement d'état renvoyé par le serveur
        xhr.onreadystatechange = function () {
            // Comme cette fonction sera appelée à chaque chnagement d'état, on commence par tester l'état du dialogue
            // 1er test ==> on attend que le serveur soit prêt en testant la valeur qu'il retourne suite à la méthode .readyState
            // 2nd test ==> on vérifie qu'il n'y a pas eu d'erreur de communication avec la page appelée en testant la valeur retournée suite à la méthode .status
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Le serveur a transmis une réponse, on commence donc par modifier l'état de notre loader

                // Nous récupérons le contenu du fichier appelé en faisant appel à la méthode .responseText
                // Comme le fichier PHP va nous retourner un objet JSON, on le traite avec "JSON.parse"

                //retour est un tableau qui contient les données envoyées de PhP
                var retour = JSON.parse(xhr.responseText);

                //fonction d'affichage des éléments ajax reçus 
                retour_calc_php(retour);


            } else {
                // message d'erreur car erreur communication
                document.getElementById('jetons_restants_p1').innerHTML = "Erreur dans l'appel du fichier calcul_gain.php";
            }
        };
        // Une fois l'appel construit, nous envoyons la requête au serveur avec la méthode .send. 
        xhr.send();
    }
}

function view(retour) {


    /*  const nouveauDiv = document.createElement("div");
        const nouveauContenu = document.createTextNode("Salutations !");
        nouveauDiv.appendChild(nouveauContenu) //ajoute le contenu au div
     */
}
