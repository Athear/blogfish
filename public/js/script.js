function newPost(event){
    document.location.replace('/newpost');
}


const createPost = async (event)=>{
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
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

const updatePost = async (event)=>{
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const articleId = document.querySelector('.sub-banner').getAttribute('data-article-num')
    
    if (title && content) {
        const response = await fetch('/api/article/'+articleId, {
          method: 'PUT',
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

const deletePost = async (event)=>{
    event.preventDefault();
    const verify = confirm("Are you sure you want to delete this post?");
    if(verify){
        const articleId = document.querySelector('.sub-banner').getAttribute('data-article-num')
        const response = await fetch('/api/article/'+articleId, {
            method: 'DELETE',
        });
        console.log(response)
        if (response.ok) {
            // console.log("OKAY")
            document.location.replace('/dashboard');
        }
    }
}



const createComment = async (event)=>{
    event.preventDefault();
    console.log("here we are")
    
    const articleId = document.querySelector('.article-body').getAttribute('data-article-num')
    
    const content = document.querySelector('#comment-content').value.trim();

    if (content) {
        console.log("posting")
        const response = await fetch(`/api/article/${articleId}/comments`, {
          method: 'POST', 
          body: JSON.stringify({ content }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            // console.log("OKAY")
            document.location.replace(`home/${articleId}/comments`);
        }
    }else{
        alert("Your comment needs some content!")
    }

}

function goToArticle(event){
    let articleID = '/'
    if(event.target.getAttribute("class")!=="article-body"){
        articleID = event.target.parentElement.getAttribute('data-article-num');
    }else{
        articleID = event.target.getAttribute('data-article-num');
    }
    const currentPage = document.querySelector('.page-title').innerText
    if(currentPage==='Dashboard'){
        articleID = 'dashboard/'+articleID
    }else{
        articleID = 'home/'+articleID
    }
    document.location.replace(articleID)
}

if(document.querySelector('.post')){document.querySelector('.post').addEventListener('click', newPost);}
if(document.querySelectorAll('.article-body')[0]){document.querySelectorAll('.article-body').forEach(ele=>ele.addEventListener('click', goToArticle));}
if(document.querySelector('#comment-submit')){document.querySelector('#comment-submit').addEventListener('click', createComment);}
if(document.querySelector('#post-submit')){document.querySelector('#post-submit').addEventListener('click', createPost);}
if(document.querySelector('#post-update')){document.querySelector('#post-update').addEventListener('click', updatePost);}
if(document.querySelector('#post-delete')){document.querySelector('#post-delete').addEventListener('click', deletePost);}


