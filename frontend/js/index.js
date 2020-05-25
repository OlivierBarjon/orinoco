/* ########## RÉCUPERATION D'UN EMPLACEMENT DU DOM POUR Y INJECTER TOUT NOTRE CONTENU DYNAMIQUEMENT ########## */
const appContainer = document.getElementById("app");
//console.log(appContainer); // TEST

/* ########## COMPOSANT DE RECUPERATION DES [OBJETS JSON] ET D'INTEGRATION DE LEUR INTEGRATION (APRÈS TRAITEMENT) AU DOM ########## */
class ListProducts { 
    constructor() {
        new Request().get("http://localhost:3000/api/cameras").then((result)=>{ // création d'un nouvel objet à partir de la classe Request auquel on transmet une url à sa méthode get() et un paramètre contenant le résultat de la résolution de la promesse utilisée dans cet même méthode get()
            const response = JSON.parse(result);// on transforme le résultat en [objets JSON]
            this.products= response;  // on transmet les [objets JSON] à une propriété "products"
            this.productListView = new ProductListView(this.products); // on  crée un objet "productListView" à partir de la classe "ProductListView" en lui fournissant comme paramètre les [objets JSON]
            appContainer.appendChild(this.productListView.render()); // et on ajoute à l'élément "app" du DOM, un élément enfant qui sera le retour du rendu de cet objet "productListView".
        }).catch(()=>{
            console.log("erreur de chargement");
        })
    }
}

/* ########## COMPOSANTS DE TRAITEMENT DES OBJETS JSON POUR LA HOME PAGE ######### */

// 2 : COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT

class ProductViewHP { // HP pour "Home Page"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }
    render() { 
        const productContainer = document.createElement("div"); // création d'un élément du DOM de type <div> : "productContainer"
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${this.product.price} €</p><a href="produit.html?id=${this.product._id}" type="button" class="btn btn-lg btn-outline-primary">Fiche produit</a></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style
        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}

// 1 : COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DES PRODUITS A INTEGRER AU AU DOM

class ProductListView { 
    constructor(products){ 
        this.products = products; // On récupère la liste des [objets JSON]
    }
    render() { 
        const productListContainer = document.createElement("div"); // ...qui crée une <div> (en créant un élément du DOM qui s'appelle "productListContainer")...
        productListContainer.setAttribute("class", "card-deck mb-3 text-center"); //  on ajoute un peu de style
        for (let product of this.products){ // Pour chaque produit de cette liste de produit
          productListContainer.appendChild(new ProductViewHP(product).render()); // on ajoute à notre bloc <div> le rendu créer par le composant de génération de vue produit (soit la classe ProductViewHP)
        };
        return productListContainer; // on retourne le conteneur <div> avec tous les produits.
    }
}


/* ########## CHARGEMENT DE LA LISTE DES PRODUITS AU CHARGEMENT COMPLET DE LA PAGE ########## */
window.onload = function() {  
    const listProducts = new ListProducts(); // Création d'un nouvel objet "listProduct" à partir de la class "ListProduct"
}


