function newPost(event){
    event.preventDefault();
    console.log("FFFFF")
    // document.location.replace('/newpost');
}



document.querySelector('.post').addEventListener('click', newPost);