/* 
 * Instanciation XMLHTTPRequest
 */
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
function verif_jetons() {
    //transforme la chaine de caractère en nombre
    var number_int = parseInt(nbre_jetons.value);

    // Si le champs n'est pas renseigné, on affiche un message d'erreur en rouge
    if (nbre_jetons.value == "") {
        document.getElementById('span_nbre_jetons').innerHTML = "Non renseigné !";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false; // on retourne "false" pour dire que le formulaire n'est pas   valide

        //vérif nombre de chiffres 
    } else if (nbre_jetons.value.length > 2) { // Si la taille est inférieure à 3 caractères, on affiche un message d'erreur en rouge
        document.getElementById('span_nbre_jetons').innerHTML = "Trop long !";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false; // on retourne "false" pour dire que le formulaire n'est pas valide

        //vérif nombre en 25 et 99 
    } else if (nbre_jetons.value < 25 || nbre_jetons.value > 100) { // Si la taille est inférieure à 3 caractères, on affiche un message d'erreur en rouge
        document.getElementById('span_nbre_jetons').innerHTML = "Le nombre  n'est pas compris entre 25 et 99";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false; // on retourne "false" pour dire que le formulaire n'est pas valide

        //vérif  si un nombre
    } else if (isNaN(nbre_jetons.value) == true) {
        document.getElementById('span_nbre_jetons').innerHTML = "Mettez un nombre seulement";
        document.getElementById('span_nbre_jetons').style.color = "red";
        return false; // on retourne "false" pour dire que le formulaire n'est pas valide

    } else { // La taille du champ est ok, on affiche un message en vert
        document.getElementById('span_nbre_jetons').innerHTML = "Valide";
        document.getElementById('span_nbre_jetons').style.color = "green";
        return true; // on retourne "true" pour dire que le formulaire est valide
    }
}

/*
  //crée la balise souhaitée
  var btn = document.createElement("button");
  //crée un noeud de texte avec le texte dedant
  var t = document.createTextNode("click");
  btn.appendChild(t);
  document.body.appendChild(btn);
  */

//bouton de relance si les jetons sont déja affichés
function relance(){
    if (affiche_jetons_restants() == true){
        lancePhaseDeux();
    }else{
        alert("echec lancement");
    }
}

/*Valide l'envoi du bouton*/
function valid_envoi() {
    if (verif_jetons() == true) {
    // affiche le nombre de jetons pour le joueur
    affiche_jetons_restants();
        return true
    } else {
        document.getElementById("span_nbre_jetons").innerHTML = "Vous ne pouvez envoyer le score avant la validation du formulaire <br>Ecrivez un nombre comprit en 25 et 99";
        return false;
    }
}

function affiche_jetons_restants(){
    //remplace le contenu de l'input par les deux nombres de jetons
    var p1 = document.getElementById("player_1");
    p1.innerHTML = "Player 1 : " + nbre_jetons.value;
    var p2 = document.getElementById("player_2");
    p2.innerHTML = "Player 2 : " + nbre_jetons.value;
    var r = document.getElementById("relancer");
    r.style.visibility = "visible";
    return true;
 }

/* Fonction contenant le moteur AJAX pointant sur le fichier cible PHP
Cette fonction traite également la réponse du serveur 
*/
function lancePhaseDeux() {
    // On fait appel à notre fonction getRequest afin de créer une instance de l'objet XMLHTTPRequest.
    var xhr = getRequest();
    // Nous vérifions que la fonction getRequest a parfaitement fonctionnée 
    // cette fonction nous retourne le booléen "false" si une erreur s'est produite
    if (xhr !== false) {
        // En utilisant la méthode .open, nous construisons un appel AJAX vers le fichier adapté
        // On pense à rajouter un parametre de type GET à notre URL

        //Ce sont les parametres entre les guillemets qui seront recueuillis en PhP
        var nb_jet_ajax = nbre_jetons.value;
        var nb_jetons = '?nb_jetons=' + nb_jet_ajax;
        //var nb_jet_p2 = '&nb_jet_p2=' + nb_jet_ajax;
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
                // Cela nous permet de récupérer séparemment les valeurs de texte et de total
                var retour = JSON.parse(xhr.responseText);

                //fonction d'affichage des éléments ajax reçus 
                view(retour);
                
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
     //ajoute la classe résultat pour l'affichage
    document.getElementById("player_1").classList.add("resultat");
    document.getElementById("player_2").classList.add("resultat");
    
    //affichage du contenu invisible
    var visible = document.getElementsByClassName("hidden");
    for (i = 0; i < 3; i++) {
        visible[i].style.visibility = "visible";
    }
    
     //affichage du nbre de jetons restants
    var jetons_p1 = document.getElementById('jetons_restants_p1').innerHTML = "Jetons joueur 1 : " + retour.jet_p1;
    
    var jetons_p2 =
    document.getElementById('jetons_restants_p2').innerHTML = "Jetons joueur 2 : " + retour.jet_p2;
    
     //affichage des score et du message de score
    var sc_p1 = document.getElementById('score_p1');
    var sc_p2 = document.getElementById('score_p2');

    document.getElementById('msg_score').innerHTML = retour.ret;

    //parcours des dés pour l'affichage
    for (i = 0; i < 3; i++) {
        //variables tampon
        var r_g1 = retour.gains_p1;
        var r_g2 = retour.gains_p2;

        //dés du joueur 1
        gains_p1[i] = document.getElementById('gains_p1').innerHTML = "Lancé de dés joueur 1 : " +
            "<br> Dé 1 : " + r_g1[i] +
            "<br> Dé 2 : " + r_g1[i - 1] +
            "<br> Dé 3 : " + r_g1[i - 2] +
            "<hr> Score joueur p1 : " + retour.gains_tot_p1;

        //dés du joueur 2
        gains_p2[i] = document.getElementById('gains_p2').innerHTML = "Lancé de dés joueur 2 : " +
            "<br> Dé 1 : " + r_g2[i] +
            "<br> Dé 2 : " + r_g2[i - 1] +
            "<br> Dé 3 : " + r_g2[i - 2] +
             "<hr>Score joueur p2 : " + retour.gains_tot_p2;
    }

    /*  const nouveauDiv = document.createElement("div");
        const nouveauContenu = document.createTextNode("Salutations !");
        nouveauDiv.appendChild(nouveauContenu) //ajoute le contenu au div
     */
}
