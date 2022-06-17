let cardPage = document.querySelector("#card-box");
let eventForm = document.querySelector("#event-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body")


let cardDocs = [];

function getCards(){
  fetch('https://jsonplaceholder.typicode.com/posts')
   .then((response) => response.json())
   .then((data) => { console.log(cardDocs)

    cardDocs = data;
    renderDom(cardDocs)
    // let cardHolder = ""
    // cardDocs.forEach(card => {
    //     console.log(card)
    //   cardHolder += `
    //                 <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
    //                 <div class="card">
    //                     <img src="img/Toye Ayan.jpg" class="card-img-top img-fluid" alt="Toye Ayan Image">
    //                     <div class="card-body">
    //                     <p class="fw-bold">${card.id}</p>
    //                     <h5 class="card-title fw-bold">${card.title}</h5>
    //                     <p class="card-text">${card.body}</p>
    //                     <div class="btn-box d-flex justify-content-between">
    //                     <a href="#" class="btn btn-primary">Update</a>
    //                     <a href="view.html" class="btn btn-success">View More</a>
    //                     <a href="#" class="btn btn-danger">Delete</a>
    //                     </div>
    //                     </div>
    //                 </div>
    //                 </div>
    //   `  
    // });

    // cardPage.innerHTML = cardHolder
})
  
}

getCards()


eventForm.addEventListener("submit", createPost)


function createPost(e){
    e.preventDefault();
    // console.log(title.value, body.value);
    fetch ('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title.value,
          body: body.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) =>{console.log(data);
      cardDocs.push(data);
      console.log(cardDocs);

      let cardHolder = ""
      cardDocs.forEach(card => {
        console.log(card);
        cardHolder+= `
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="card">
                        <img src="img/Toye Ayan.jpg" class="card-img-top img-fluid" alt="Toye Ayan Image">
                        <div class="card-content">
                        <p class="fw-bold text-center">${card.id}</p>
                        <h5 class="card-title fw-bold text-center">${card.title}</h5>
                        <p class="card-body text-center">${card.body}</p>
                        <div class="btn-box d-flex justify-content-between">
                        <a href="#" class="btn btn-primary" onclick="updatePost(${card.id})">Update</a>
                        <a href="#" class="btn btn-success" onclick="openView(${card.id})">View More</a>
                        <a href="#" class="btn btn-danger" onclick="deletePost(${card.id})">Delete</a>
                        </div>
                        </div>
                    </div>
                    </div>
        
        `
      })
      cardPage.innerHTML = cardHolder
    })
}


function updatePost(id){
    console.log(id)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
    .then((response) => response.json())
    .then((data) => {console.log(data);

        let cardTitles = document.querySelectorAll(".card-title");
        let cardBodies = document.querySelectorAll(".card-body");
        console.log(cardTitles)
        cardTitles.forEach((cardTitle, index) => {
            if(index + 1 === id){

                if(data.title !== ""){
                    cardTitle.innerHTML = data.title
                }
               
            }
        })


        cardBodies.forEach((cardBody, index) => {
            if(index + 1 === id){

                if(data.body !== ""){
                    cardBody.innerHTML = data.body
                }
               
            }
        })
    
    });
}


function openView(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => { console.log(data)
    localStorage.setItem('viewedPost', JSON.stringify(data))
    window.location.href = `view.html?id=${id}`;
    // console.log(data)


});
}

function deletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
})
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            cardDocs = cardDocs.filter(cards => cards.id !== id)
            console.log(cardDocs)
           renderDom(cardDocs)
        })
}


function renderDom(arr){
    let cardHolder = ""
    arr.forEach(card => {
        console.log(card);
        cardHolder+= `
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="card">
                        <img src="img/Toye Ayan.jpg" class="card-img-top img-fluid" alt="Toye Ayan Image">
                        <div class="card-content">
                        <p class="fw-bold text-center">${card.id}</p>
                        <h5 class="card-title fw-bold text-center">${card.title}</h5>
                        <p class="card-body text-center">${card.body}</p>
                        <div class="btn-box d-flex justify-content-between">
                        <a href="#" class="btn btn-primary" onclick="updatePost(${card.id})">Update</a>
                        <a href="#" class="btn btn-success" onclick="openView(${card.id})">View More</a>
                        <a href="#" class="btn btn-danger" onclick="deletePost(${card.id})">Delete</a>
                        </div>
                        </div>
                    </div>
                    </div>
        
        `
      })
      cardPage.innerHTML = cardHolder
}