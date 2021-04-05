function newPost(event){
    document.location.replace('/newpost');
}


const createPost = async (event)=>{
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        console.log("posting")
        const response = await fetch('/api/article', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            // console.log("OKAY")
            document.location.replace('/dashboard');
        }
    }else{
        alert("Your post needs both a title and some content!")
    }
    
}

function goToArticle(event){
    let articleID
    if(event.target.getAttribute("class")!=="article-body"){
        articleID = event.target.parentElement.getAttribute('data-article-num');
    }else{
        articleID = event.target.getAttribute('data-article-num');
    }
    console.log(articleID)
}

document.querySelector('.post').addEventListener('click', newPost);
document.querySelectorAll('.article-body').forEach(ele=>ele.addEventListener('click', goToArticle,true));
document.querySelector('#post-submit').addEventListener('click', createPost);
