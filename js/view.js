function renderView(){
    let newObject = localStorage.getItem('viewedPost')
    let card = JSON.parse(newObject)
    console.log(card.title)
    document.getElementById("card-id").innerHTML = card.id
    document.getElementById("card-title").innerHTML = card.title
    document.getElementById("card-body").innerHTML = card.body
}

renderView()