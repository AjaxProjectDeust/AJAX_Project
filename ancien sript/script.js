/*
qu'elles pages.
servir a quoi ajax, a quoi va faire.
ajax. 421 simplifié avec.

simplifier regles

choix de code 
saisie nbre de face
random en fonction du nombre de faces 
chaque joueur lance 3 dés
meilleure combinaison, donne des jetons à l'autre en fonction de la combinaison
Si combinaison equivalente, on relance le tour.
Si joueur n'a plus de jetons => perdu
*/

//attribut onclick devient la propriété onclick
h1.onclick = function(){
  this.innerHTML="<strong>Salut</strong>";
  this.style.color="orange";
};

//joueur 1
var player_1 = 0;
//joueur 2
var player_pnj = 0;

// On crée nos différents "écouteurs" d'événements
var button = document.getElementById("button");
var click = button.addEventListener('click', genere_jetons);

//id des jetons
var nbre_jetons = document.getElementById("nbre_jetons");

//id du tag
var ret_1 = document.getElementById("div1");
var ret_2 = document.getElementById("div2");
var ret_3 = document.getElementById("div3");
//var h1 = document.getElementById("h1");

//generation des jetons
function genere_jetons()
{   
         var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        alert(rnd);
}

function demande_face(){
    //Demande le nombre de face du dé
    var nbre_faces = prompt('Entrez le nombre de faces du dé souhaité : ');
    //appelle la fonction lance_de avec le nombre de faces voulu
    lance(nbre_faces);
}

//lance  de
var lance = function lance_de(nbre_faces){
   // entre 1 et le le nombre de faces du dé
   var random_faces = Math.floor(Math.random() * nbre_faces + 1);
    ret_1.textContent = "Le premier tirage est : " + random_faces;
    console.log("Le nombre aléatoire est " + ret_1.textContent);
   
    var reponse = prompt("Voulez vous relancer automatiquement? \nRéponse oui ou non");
    
    if(reponse === "oui"){
        lance_3d(random_faces)
    }else if(reponse === "non"){
        var reponse_manuelle = prompt("Manuellement ? \nRéponse oui ou non");
        if (reponse_manuelle === "oui"){
            
        }else if( reponse === "non" ){
              alert("Tampis");
        }else{
              alert("Veuillez recharger la page");
        }
    }else{
        alert("Mauvaise synthaxe");
    }
}

//lance 3 dés
function lance_3d(nbre_faces) {
    for (var i = 0; i < 2; i++) {
        var random_faces = Math.floor(Math.random() * nbre_faces + 1);
        console.log(random_faces);
        //affiche dans la console
        ret_2.textContent = "\nLe deuxième tirage est : " + random_faces;
        ret_3.textContent = "\nLe troisième tirage est : " + random_faces;
    }
}

