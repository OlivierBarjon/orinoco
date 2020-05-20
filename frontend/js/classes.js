// ###### COMPOSANTS DE TRAITEMENT DES OBJETS JSON LA HOME PAGE #######

// COMPOSANT DE GÉNÉRATION DE VUE TYPE D'UN PRODUIT

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

// COMPOSANT DE GÉNÉRATION DE LA VUE DE LA LISTE DES PRODUITS A INTEGRER AU AU DOM

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




// ###### COMPOSANTS DE TRAITEMENT DES OBJETS JSON LA PAGE PRODUIT #######

// COMPOSANT DE GÉNÉRATION DE LA VUE DU PRODUIT

class ProductViewPP { // PP pour "Page Produit"
    constructor(product) { 
        this.product = product; // le parametre "product" contient un seul objet JSON.
    }
    render() { 
        const productContainer = document.createElement("div"); // création d'un élément du DOM de type <div> : "productContainer"
        productContainer.innerHTML = `<div class="card-header"><h3 class="my-0 font-weight-normal">${this.product.name}</h3></div><div class="card-body"><div class="mb-3"><img class="img-fluid" src="${this.product.imageUrl}" alt="${this.product.imageUrl}" /></div><p class="text-justify">${this.product.description}</p><p>Prix : ${this.product.price} €</p><div id="buttonModele"><button type="button" class="btn btn-lg btn-outline-primary">Ajouter au panier</button></div></div>`; // ... cette <div> contiendra les éléments HTML remplis par les valeurs de l'objet JSON
        productContainer.setAttribute("class", "card mb-4 shadow-sm");// un peu de style
        return productContainer; // on retourne l'élément du DOM "productContainer" 
    } 
}


//COMPOSANT DE RECUPERATION DE L'IDENTIFIANT DU PRODUIT A PARTIR DE LA CHAINE DES PARAMETRES DE L'URL
class Identifiant {
    constructor(paramUrl){
        this.paramUrl = paramUrl;
    }
    determinId () {
        const id = this.paramUrl.split("="); // On split ce paramètre d'url en utilisant le "=" comme séparateur
        return id[1]; // on retourne l'id qui se situe après le "="
    }
}


// COMPOSANT DE GÉNÉRATION DU CONTENEUR A INTEGRER AU AU DOM

class ProductDetailView { 
    constructor(products){ 
        this.products = products; // On récupère la liste des [objets JSON]
        this.paramUrl = window.location.search; // on récupère les paramètres d'url
        this.id = new Identifiant(this.paramUrl).determinId(); // on applique notre méthode pour récupérer l'id du produit
    }
    render() { 
        const productDetailContainer = document.createElement("div"); // on crée un élément <div> du DOM qui s'appelle "productDetailContainer"
        productDetailContainer.setAttribute("class", "card-deck mb-3 text-center"); // un peu de style
        for (let product of this.products){ // pour chaque product du tableau "products"...
        const IdentifiantProduit=product._id; // ... on récupère l'identifiant du produit...
            if(this.id == IdentifiantProduit) { // ...on vérifie que cet identifiant correspondant à celui transmis dans notre url
          productDetailContainer.appendChild(new ProductViewPP(product).render()); // on intégre le rendu crée par le composant ProductViewPP
             };
        };
        return productDetailContainer; // on retourne le conteneur <div> avec le produit.
    }
}