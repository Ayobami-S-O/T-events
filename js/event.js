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
    let cardHolder = ""
    cardDocs.forEach(card => {
        console.log(card)
      cardHolder += `
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="card">
                        <img src="img/Toye Ayan.jpg" class="card-img-top img-fluid" alt="Toye Ayan Image">
                        <div class="card-body">
                        <p class="fw-bold">${card.id}</p>
                        <h5 class="card-title fw-bold">Save time, Make more money</h5>
                        <p class="card-text">Our event management, event marketing, and event sponsorship tools are tailored to you. Build an online presence. Drive more ticket sales. Bring your event to life.</p>
                        <div class="btn-box d-flex justify-content-between">
                        <a href="#" class="btn btn-primary">Update</a>
                        <a href="view.html" class="btn btn-success">View More</a>
                        <a href="#" class="btn btn-danger">Delete</a>
                        </div>
                        </div>
                    </div>
                    </div>
      `  
    });

    cardPage.innerHTML = cardHolder
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

    //   cardDocs = data;
      let cardHolder = ""
      cardDocs.forEach(card => {
        console.log(card);
        cardHolder+= `
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                    <div class="card">
                        <img src="img/Toye Ayan.jpg" class="card-img-top img-fluid" alt="Toye Ayan Image">
                        <div class="card-body">
                        <p class="fw-bold">${card.id}</p>
                        <h5 class="card-title fw-bold">${card.title}</h5>
                        <p class="card-text">${card.body}</p>
                        <div class="btn-box d-flex justify-content-between">
                        <a href="#" class="btn btn-primary">Update</a>
                        <a href="view.html" class="btn btn-success">View More</a>
                        <a href="#" class="btn btn-danger">Delete</a>
                        </div>
                        </div>
                    </div>
                    </div>
        
        `
      })
      cardPage.innerHTML = cardHolder
    })
}