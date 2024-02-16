/*

Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html,
 stampiamo i post del nostro feed.

Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone 
e incrementiamo il counter dei likes relativo. 
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.



*/

const posts = [
    {
        id: 1,
        'content': "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Testo del post di Sofia.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Testo di Chiara",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


// dichiaro un array vuoto dove mi memorizzo tutti gli id dei post a cui ho messo like
const likedPosts = [];

// salvo il container dei post in una variabile
const containerElement = document.querySelector("#container");


// cicliamo per ogni elemento dell'array posts

posts.forEach(function (currentPost) {

    // console.log(currentPost);
    // creo un elemento html vuoto
    const newPost = document.createElement("div");

    // gestisco la data
    const oldDate = new Date(currentPost.created);
    const newDate = oldDate.toLocaleDateString("it-IT");


    // ci scrivo dentro i contenuti che mi servono
    newPost.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${getAuthorImage(currentPost)}             
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${currentPost.author.name}</div>
                    <div class="post-meta__time">${newDate}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${currentPost.content}</div>
        <div class="post__image">
            <img src="${currentPost.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${currentPost.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${currentPost.id}" class="js-likes-counter">${currentPost.likes}</b> persone
                </div>
            </div> 
        </div>   
    `;

    // gli do la classe post
    newPost.className = "post";

    // lo appendo al container
    containerElement.append(newPost);

    // facendo così sono riuscito a non modificare più il testo del mio container
    // questo ci dava problemi quando provavamo a ritrovare i nostri elementi button dei like
    // siccome li salvavamo in una variabile e poi modificavamo sempre il testo del container
    // il browser aveva difficoltà a ritrovarli una volta loggati in console

    // mi memorizzo il pulsante del like del post attuale
    // lo prelevo dal documento sfruttando il fatto che ogni pulsante del like abbia un valore
    // diverso per il parametro data-postid (come si vede dall'istruzione precedente lì dentro ci ho scritto l'id del post, che è diverso per ognuno)
    const currentLikeButton = document.querySelector(`a[data-postid="${currentPost.id}"]`);
    
    // console.log(currentLikeButton);

    currentLikeButton.addEventListener("click", (e) => {

        // blocca il comportamento di default del click
        // essendo un tag <a> provava a eseguire il link
        e.preventDefault();

        
        // controllare se non abbiamo già messo like al post
        if( ! likedPosts.includes(currentPost.id)) {

            // inserisco l'id del post nel mio array dove mi memorizzo i post piaciuti
            likedPosts.push(currentPost.id);
            
            // currentLikeButton: pulsante appena cliccato
            // aggiungo la classe al pulsante
            currentLikeButton.classList.add("like-button--liked");

            // aumentare il contatore relativo
            currentPost.likes++;
            // console.log(currentPost.likes);

            // mostro il nuovo numero di like in pagina nell'elemento corretto
            const currentLikeCounter = document.querySelector(`#like-counter-${currentPost.id}`);
            currentLikeCounter.innerText = currentPost.likes;

        } else {
            // Al click su un pulsante "Mi Piace" di un post, 
            // se abbiamo già cliccato dobbiamo decrementare il contatore 
            // e cambiare il colore del bottone.

            // rimuovo l'id del post dall'array dei post piaciuti

            // capire quale sia l'indice che mi indica l'id del post che ho appena cliccato
            const indexOfLikedPost = likedPosts.indexOf(currentPost.id);
            
            // rimuovo l'elemento seleizonato dall'array dei like
            likedPosts.splice(indexOfLikedPost, 1);


            // rimuovo la classe che lo stilizza come cliccato
            currentLikeButton.classList.remove("like-button--liked");

            // diminuire il contatore relativo
            currentPost.likes--;

            // mostro il nuovo numero di like in pagina nell'elemento corretto
            const currentLikeCounter = document.querySelector(`#like-counter-${currentPost.id}`);
            currentLikeCounter.innerText = currentPost.likes;
            
        }

        console.log('like:', likedPosts);
    })
    
})



function getAuthorImage(currentPost) {

    if(currentPost.author.image != null) {
        
        return `<img class="profile-pic" src="${currentPost.author.image}" alt="Phil Mangione">`;

    } else {

        // salvo il nome dell'autore
        const authorName = currentPost.author.name;
        const authorNameWords = authorName.split(" ");
        let initials = "";
        authorNameWords.forEach(currentWord => {

            initials += currentWord[0];

        })

        console.log(initials);

        return `
            <div class="profile-pic-default">
                <span>
                    ${initials}
                </span>
            </div>
        `;

    }
    
}