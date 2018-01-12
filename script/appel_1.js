/* 
 * Instanciation XMLHTTPRequest
 **/
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

/*Valide l'envoi du bouton*/
function valid_envoi() {
    if (verif_jetons() == true) {
        document.getElementById("player_1").innerHTML = "player 1 : " + nbre_jetons.value;
        document.getElementById("player_2").innerHTML = "player 2 : " + nbre_jetons.value;

        lancePhaseDeux()
    } else {
        document.getElementById("span_nbre_jetons").innerHTML = "Vous ne pouvez envoyer le score avant la validation du formulaire <br>Ecrivez un nombre";
        return false;
    }
}
/* Fonction contenant le moteur AJAX pointant sur le fichier cible PHP
Cette fonction traite également la réponse du serveur */
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
        var nb_jet_p1 = '?nb_jet_p1=' + nb_jet_ajax;
        var nb_jet_p2 = '&nb_jet_p2=' + nb_jet_ajax;
        xhr.open("GET", "php/main.php" + nb_jet_p1 + nb_jet_p2, true);

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
                document.getElementById('resultat').innerHTML = retour;
            } else {
                // Puisque la communication ne s'est pas correctement déroulée (problème serveur ou page inaccessible/introuvable/etc...), nous affichons un message d'erreur dans la zone de résultat
                document.getElementById('resultat').innerHTML = "Erreur dans l'appel du fichier calcul_gain.php";
            }
        };

        // Une fois l'appel construit, nous envoyons la requête au serveur avec la méthode .send. 
        xhr.send();

    }
}
