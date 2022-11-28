
function loggedIn(){
    let logger = JSON.parse(window.localStorage.getItem('logger'));
    if(logger.status){
        document.getElementById('login-span').style.setProperty('display', 'none')
        document.getElementById('a-log').style.removeProperty('display');
        document.getElementById('logged').style.removeProperty('display');
        return true
    } else{
        document.getElementById('login-span').textContent = 'Login';
    }
}

function changeStorageToLocal(){
    let storage = JSON.parse(window.localStorage.getItem('storageType'));
    storage.storageType = 'local';
    window.localStorage.setItem('storageType', JSON.stringify(storage));
    window.location.reload();
}
function changeStorageToMongo(){
    let storage = JSON.parse(window.localStorage.getItem('storageType'));
    storage.storageType = 'mongo';
    window.localStorage.setItem('storageType', JSON.stringify(storage));
    window.location.reload();
}

function logout(){
    let logger = JSON.parse(window.localStorage.getItem('logger'));
    logger.status = false;
    window.localStorage.setItem('logger', JSON.stringify(logger));
    let user_token = JSON.parse(window.localStorage.getItem('user_token'));
    user_token = "";
    window.localStorage.setItem('user_token', JSON.stringify(user_token));
    window.location.href = 'index.html'
}


function showLoginFom(){
        document.getElementById('login-form').style.removeProperty('display');
        document.getElementById('menu-box-hide').style.setProperty('display', 'none');
}

function showMenus(){
    document.getElementById('menu-box-hide').style.removeProperty('display');
}

function hideMenus(){
    document.getElementById('menu-box-hide').style.setProperty('display','none');
}

function finalHideDetails(){
    document.getElementById('article-details').style.setProperty('display','none');
}

function hideArticleDetails(){
    document.getElementById('contents').style.setProperty('opacity','1');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/animate-close-pop.css';
    head.appendChild(link);
    setInterval(function(){
        finalHideDetails();
    },1000)

    setInterval(function(){
        reloadPgae();
    },1200)
}

function reloadPgae(){
    window.location.reload();
}

// Client

const showArticleDetails = async(t) =>{
    
    document.getElementById('article-details').style.removeProperty('display');
    document.getElementById('contents').style.setProperty('opacity','.1');

// show article to clent

    let articleToView =  t.path[0].getAttribute('class');
    let curr = document.getElementById('hiden-current-article');
    curr.textContent = articleToView;
    document.getElementById('client-wait-view-blog').style.removeProperty('display');
    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}`)
        response.then(res => res.json())
            .then(data => {
                document.getElementById('client-wait-view-blog').style.setProperty('display', 'none');
                const article = data.data;
                document.getElementById('article-details-title').textContent = article.title;
                document.getElementById('article-details-desc').textContent = article.content;
                document.querySelector('.client-comment-count').textContent = article.comments.length;
                let articleImg = document.getElementById('client-comment-image');
                if(article.image !== undefined){
                    if(article.image.length > 0){
                        articleImg.src = article.image;
                    } else {
                        articleImg.style.setProperty('display', 'none');
                    }
                } 
            })
            .catch((error) => console.log(error));
            

    // show comments to client

    let commentsParent = document.getElementById('article-details-container');
    
        const resComment = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}`)
            resComment.then(res => res.json())
                .then(data => {
                    let comm = data.data.comments;
                    for(let i = comm.length - 1; i >= 0; i--) {
                        let commentDatailsContainer = document.createElement('div');
                        commentDatailsContainer.style.cssText = `sans-serif; padding-left: 6px; margin-left: 12px; border: 1px solid rgb(93, 93, 94); margin-top: 10px;`
                        commentsParent.appendChild(commentDatailsContainer);
                        commentDatailsContainer.setAttribute('id','commentDatailsContainer');
                        let commentOwner = document.createElement('p');
                        commentOwner.style.cssText = `font-size: 18px; color: #5078B5`;
                        commentDatailsContainer.appendChild(commentOwner);
                        commentOwner.textContent = comm[i].user;
                        let commentEmail = document.createElement('p');
                        commentEmail.style.cssText = `font-size: 18px; color: #5078B5; display: flex; margin-top:-14px`;
                        commentDatailsContainer.appendChild(commentEmail);
                        commentEmail.textContent = comm[i].email;
                        let commentValue = document.createElement('p');
                        commentValue.style.cssText = `font-size:20px;color: white; line-height: 30px`;
                        commentDatailsContainer.appendChild(commentValue);
                        commentValue.textContent = comm[i].comment;
                        let date = document.createElement('span');
                        commentOwner.appendChild(date);
                        date.textContent = comm[i].date;
                        date.style.cssText = `margin-left: 20px`;
                }

                })
                    .catch(error => console.log(error))
                    // console.log(articleToView)
        }


function showCommments(){
    finalHideDetails();
    document.getElementById('article-comments').style.removeProperty('display');
    document.getElementById('contents').style.setProperty('opacity','.1');
    document.getElementById('ft').style.setProperty('opacity','.1');
    document.getElementsByTagName('footer').style.setProperty('opacity','.1');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/animate-comments.css';
    head.appendChild(link);
}


function finalHideComments(){
    document.getElementById('article-comments').style.setProperty('display', 'none');
}

function hideComments(){
    document.getElementById('contents').style.setProperty('opacity','1');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/close-comments.css';
    head.appendChild(link);

    setInterval(function(){
        finalHideComments();
    },1000);
    setInterval(function(){
        reloadPgae();
    },1200);
}


// admin view single article

const  viewArticle = async(t) =>{
    let articleToView =  t.path[0].getAttribute('class');
    // let id = t.path[0].getAttribute('id')

    let articleImg = document.getElementById('admin-posted-img');
    document.getElementById('article-details-admin').style.removeProperty('display')

    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}`)
    
    response.then(res => res.json())
        .then(data => {
            document.getElementById('load-admin-view-gif').style.setProperty('display', 'none');
            const article = data;
            document.getElementById('hiden-title').textContent = article.data.title;
            document.getElementById('mongo-hiden-id').textContent = article.data._id
            document.getElementById('viewing-contents-title').textContent = article.data.title;
            let p = document.getElementById('viewing-contents')
            p.innerHTML += article.data.content;
            if(article.data.image !== undefined){
            if(article.data.image.length > 0){
                articleImg.src = article.data.image;
                document.getElementById('hiden-img-ulr').textContent = article.data.image;
                document.getElementById('prev-img').style.removeProperty('display');
                document.getElementById('prev-img').src = article.data.image;
            }else{
                articleImg.style.setProperty('display', 'none');
                }
            } 
            document.getElementById('hiden-arcticle').textContent = article.data.content;
            
        document.querySelectorAll('[id=view-link]').forEach(element =>{
            element.style.setProperty('pointer-events', 'none');
        });
    })
    .catch(err => console.log(err));
    
    // }
}   

function closeViewAmin(){
    document.getElementById('article-details-admin').style.setProperty('display', 'none')
    document.getElementById('edit-new-article').style.setProperty('display', 'none')
    window.location.reload();
}

function showEdit(){

    let articleToView = document.getElementById('hiden-title').textContent;
    if(articleToView !== ''){
        document.getElementById('edit-btn').textContent = 'Save changes';
        let txt = document.getElementById('article-details-window-title-edit').textContent = 'Edit article';
    }
        document.getElementById('article-details-admin').style.setProperty('display','none') 
        document.getElementById('edit-new-article').style.removeProperty('display')
        document.getElementById('article-details-admin').style.setProperty('display', 'none')
        document.getElementById('message-container').style.setProperty('display','none');
        document.getElementById('article-title').value = articleToView;
        let content = document.getElementById('hiden-arcticle').textContent;
        document.getElementById('article-place').textContent = content;
        let saveThis = document.getElementById('article-place');
        // saveArticle(articleToView, saveThis, false, par)
}
function closeEdit(){
    document.getElementById('edit-new-article').style.setProperty('display', 'none')
    window.location.reload();
}

function showCommentsAdmin(){
    document.getElementById('article-comments').style.removeProperty('display')
    document.getElementById('article-details-admin').style.setProperty('display', 'none')
    document.getElementById('message-container').style.setProperty('display', 'none');
}

function showMessages(){
    // if(winds >= 900){
        document.getElementById('message-container').style.removeProperty('display');
        document.getElementById('article-details-admin').style.setProperty('display','none')
        document.getElementById('article-comments').style.setProperty('display','none');
        document.getElementById('edit-new-article').style.setProperty('display','none');
    // } else{
    //     showMmessages();
    // }
    // Retrieve maessages
    let parrentContainer = document.getElementById('message-container');
    let user_token = JSON.parse(window.localStorage.getItem('user_token'));
    
    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/messages`,{
        headers:{
            'Authorization': `bearer ${user_token}`
        }
    })

    // if (response.status === 401) {
    //        alert('Your session has expired')
    //        logout();
    //     } 

    response.then(res => res.json())
        .then(data =>{
            for(let i = data.length - 1; i >=0; i--) {
                let message = document.createElement('div');
                message.setAttribute('id', 'messages');
                message.style.cssText = `margin-bottom: 10px`;
                parrentContainer.appendChild(message);
                let senderEmail = document.createElement('p');
                senderEmail.setAttribute('id', 'sender-mail');
                message.appendChild(senderEmail)
                senderEmail.textContent = data[i].email;
                let sentDate = document.createElement('p');
                sentDate.setAttribute('id', 'received-date');
                message.appendChild(sentDate);
                sentDate.textContent = data[i].date;
                let sentMsg = document.createElement('p');
                sentMsg.setAttribute('id', 'msg-contents');
                message.appendChild(sentMsg);
                sentMsg.textContent = data[i].message;
            }
        });

}
function closeMessage(){
    document.getElementById('message-container').style.setProperty('display', 'none');
}

function deleteArticle(){
    document.getElementById('delete-article-popup').style.removeProperty('display');
    document.getElementById('temp-box').style.setProperty('display', 'none');
}
function closeDelete(){
    document.getElementById('delete-article-popup').style.setProperty('display','none');
    document.getElementById('temp-box').style.removeProperty('display');
}

function scrollToBottom(node){
	node.scrollTop = 1000;
}

function divScroll(){
    let elementToScroll = document.getElementById('article-details-container');
    // scrollToBottom(elementToScroll);
}


// rich text editor

const setTextBold = () => {
    let range;
    if (window.getSelection) {
        let boldText = document.createElement('b');  
        let txt = window.getSelection ();
        txt.toString();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
    }
   
}

const setItalic = () => {
    let range;
    let boldText = document.createElement('i');
    if (window.getSelection) {  
        let txt = window.getSelection ();
        txt.toString ();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
    } 
}

const setUnderline = () => {
    let range;
    let boldText = document.createElement('u');
    if (window.getSelection) {  
        let txt = window.getSelection();
        txt.toString();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
    } 
}

const setYellow = () => {
    let range;
    let boldText = document.createElement('span');
    if (window.getSelection) {  
        let txt = window.getSelection();
        txt.toString();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
        boldText.style.setProperty('color','yellow');
    } 
}


const setLightRose = () => {
    let range;
    let boldText = document.createElement('span');
    if (window.getSelection) {  
        let txt = window.getSelection();
        txt.toString();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
        boldText.style.setProperty('color','rgb(250, 9, 174)');
    } 
}

const setMageta = () => {
    let range;
    let boldText = document.createElement('span');
    if (window.getSelection) {  
        let txt = window.getSelection();
        txt.toString();
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
        boldText.style.setProperty('color','#07ace3');
    } 
}

const addLink = () => {
    let range;
    let boldText = document.createElement('a');
    if (window.getSelection) {  
        let txt = window.getSelection();
        txt.toString();
        let hrf = txt;
        boldText.setAttribute('href', hrf);
        boldText.textContent = txt;
        if (txt.rangeCount) {
            range = txt.getRangeAt(0);
            range.deleteContents();
            range.insertNode(boldText);
        }
        boldText.style.setProperty('color','#07ace3');
        boldText.style.setProperty('cursor','pointer');
        boldText.style.setProperty('text-decoration', 'underline');
    } 
}

const diplayColors = () => {
    document.getElementById('colors').style.removeProperty('display');
}
const hideColors = () => {
    document.getElementById('colors').style.setProperty('display','none');
}

function addCommentProccess(){
    // let container = document.getElementById('viewing-article-admin');
    let tempComent = document.getElementById('admin-view-comments');
    let comment = document.getElementById('admin-add-comment').value;
    let myStoreObject = window.localStorage.getItem('comments')
    let myStoreValues = JSON.parse(myStoreObject);
    if(comment === ''){
        alert('You have no comment typed');
        return false;
    } else{
        let title = document.getElementById('viewing-contents-title').textContent;
        let idx = myStoreValues.length + 1;
        console.log(idx, title);
        let objComments = {};
        let today = new Date();
        let year = today.getFullYear();
        let mo = today.getMonth()+1;
        let da = today.getDate();
        let date = da+"-"+mo+"-"+year;
        objComments[idx.toString()] =[title, comment];
        objComments['user'] = 'Damascene';
        objComments['email'] = 'damascene@gmail.com';
        objComments['date'] = date;
        myStoreValues.unshift(objComments);
        window.localStorage.setItem('comments', JSON.stringify(myStoreValues));
        document.getElementById('admin-add-comment').value = ''
        tempComent.style.removeProperty('display','none');
        document.querySelector('.tempName').textContent = 'Damascene '+' '+ date;
        document.querySelector('.tempEmail').textContent = 'damascene@gmail.com'
        document.querySelector('.tempValue').textContent = comment 

        // Update comments count
        let myStoreObjectUpdate = window.localStorage.getItem('articles')
        let myStoreValuesUpdate = JSON.parse(myStoreObjectUpdate);
        loop1:for(let i = 0; i < myStoreValuesUpdate.length; i++) {
            for(let key in myStoreValuesUpdate[i]) {
                if(key === title){
                    myStoreValuesUpdate[i].comments += 1;
                    window.localStorage.setItem('articles', JSON.stringify(myStoreValuesUpdate));
                    break loop1;
                }
            }
        }
        
    }
}

// Retrieve blogs 

const clientRetrieveArticle = async(search=false, txt) =>{
    loggedIn();
    let searchArt = document.getElementById('client-search');
    searchArt.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  
        searchBlog();
       }
   });

    let containerParent = document.getElementById('blogs-container');
    document.getElementById('client-wait-all-blogs').style.removeProperty('display');
    const response = fetch('https://mybrandapis-production.up.railway.app/api/v1/blogs');
        
        response.then(res => res.json())
            .then(data => {
            document.getElementById('client-wait-all-blogs').style.setProperty('display', 'none');
            const articles = data;
            for(let i = articles.length - 1; i >= 0 && !search; i--){
                let blog = document.createElement('div');
                blog.setAttribute('id', 'blog');
                containerParent.appendChild(blog);
                let articleT = document.createElement('p');
                articleT.setAttribute('id', 'blog-title');
                blog.appendChild(articleT);
                articleT.textContent = articles[i].title;
                let articleDesc = document.createElement('p');
                articleDesc.setAttribute('id', 'blog-desc');
                blog.appendChild(articleDesc);
    
                let subArticle = articles[i].content.slice(0, 50) +' ...';
                articleDesc.textContent = subArticle
                let articleImg = document.createElement('img');
                articleImg.setAttribute('id', 'article-created-img');
    
                if(articles[i].image !== undefined){
                    if(articles[i].image.length > 0){
                        blog.appendChild(articleImg);
                        articleImg.src = articles[i].image;
                    }
                } 
                let likeComment = document.createElement('div');
                likeComment.setAttribute('id', 'like-comment');
                blog.appendChild(likeComment);
                let likeImg = document.createElement('img');
                likeImg.src = 'images/like-new2-img.png';
                likeComment.appendChild(likeImg);
                let commentImg = document.createElement('img');
                commentImg.src = 'images/comment-new.PNG';
                likeComment.appendChild(commentImg);
                likeComment.setAttribute('class', articles[i]._id);
                likeImg.addEventListener('click', increasLikes.bind())
                commentImg.setAttribute('class', articles[i]._id);
                commentImg.addEventListener('click', showArticleDetails.bind());
                articleT.setAttribute('class', articles[i]._id);
                articleT.addEventListener('click', showArticleDetails.bind());
                let countCommentLike = document.createElement('div');
                countCommentLike.setAttribute('id', 'count-like-comment');
                blog.appendChild(countCommentLike)
                let countLike = document.createElement('span');
                countLike.setAttribute('id', articles[i]._id);
                countLike.style.setProperty('margin-left', '16px');
                countCommentLike.appendChild(countLike);
                countLike.textContent = articles[i].likes
                let countComment = document.createElement('span');
                countComment.setAttribute('id', 'comment-count');
                countCommentLike.appendChild(countComment);
                countComment.textContent = articles[i].comments;
            }
        // search
    
        if(search){
            document.getElementById('blogs-container').innerHTML =''
        }
        })
        .catch((e) => console.log(e));
        console.log('view articles from mongoDB')
    }

// search blog from visiter

const searchBlog = () => {
    let txt = document.getElementById('client-search').value
    let containerParent = document.getElementById('blogs-container');
    document.getElementById('client-wait-all-blogs').style.removeProperty('display');
    containerParent.innerHTML = '';
    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/search?article=${txt}`);
        
        response.then(res => res.json())
            .then(data => {
            document.getElementById('client-wait-all-blogs').style.setProperty('display', 'none');
            const articles = data;
            if(data.title){
            // for(let i = articles.length - 1; i >= 0 && !search; i--){
                let blog = document.createElement('div');
                blog.setAttribute('id', 'blog');
                containerParent.appendChild(blog);
                let articleT = document.createElement('p');
                articleT.setAttribute('id', 'blog-title');
                blog.appendChild(articleT);
                articleT.textContent = articles.title;
                let articleDesc = document.createElement('p');
                articleDesc.setAttribute('id', 'blog-desc');
                blog.appendChild(articleDesc);
    
                let subArticle = articles.content.slice(0, 50) +' ...';
                articleDesc.textContent = subArticle
                let articleImg = document.createElement('img');
                articleImg.setAttribute('id', 'article-created-img');
    
                if(articles.image !== undefined){
                    if(articles.image.length > 0){
                        blog.appendChild(articleImg);
                        articleImg.src = articles.image;
                    }
                } 
                let likeComment = document.createElement('div');
                likeComment.setAttribute('id', 'like-comment');
                blog.appendChild(likeComment);
                let likeImg = document.createElement('img');
                likeImg.src = 'images/like-new2-img.png';
                likeComment.appendChild(likeImg);
                let commentImg = document.createElement('img');
                commentImg.src = 'images/comment-new.PNG';
                likeComment.appendChild(commentImg);
                likeComment.setAttribute('class', articles._id);
                likeImg.addEventListener('click', increasLikes.bind())
                commentImg.setAttribute('class', articles._id);
                commentImg.addEventListener('click', showArticleDetails.bind());
                articleT.setAttribute('class', articles._id);
                articleT.addEventListener('click', showArticleDetails.bind());
                let countCommentLike = document.createElement('div');
                countCommentLike.setAttribute('id', 'count-like-comment');
                blog.appendChild(countCommentLike)
                let countLike = document.createElement('span');
                countLike.setAttribute('id', articles._id);
                countLike.style.setProperty('margin-left', '16px');
                countCommentLike.appendChild(countLike);
                countLike.textContent = articles.likes
                let countComment = document.createElement('span');
                countComment.setAttribute('id', 'comment-count');
                countCommentLike.appendChild(countComment);
                countComment.textContent = articles.comments;
            }else{
                alert('No record found');
                window.location.reload();
            }
            }); 
        
        }
            // .catch((e) => console.log(e));
        // // search
        //     document.getElementById('blogs-container').innerHTML =''
        // 
        // console.log('view articles from mongoDB')

const retrieveAll = () => {
    let isEmpty = document.getElementById('client-search').value;
    if(isEmpty === ''){
        window.location.reload();
    }
}

// Likes

const  increasLikes = async(t) =>{
    let articleToView =  t.path[1].getAttribute('class');
    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}/likes`,
        {
            method: 'POST'
        }
    )
    .then(res =>{
        let id = document.getElementById(articleToView)
        let getCountedLikes = id.textContent;
        let updatedCount = Number(getCountedLikes) + 1;
        id.textContent = updatedCount;
    })
    .catch(err => console.log(err));
}

// Delete comment

function deleteComment(t){
    let article;
    let deleteThis = t.path[0].getAttribute('id');
    let myStoreObject = window.localStorage.getItem('comments');
    let myStoreValues = JSON.parse(myStoreObject);
    loop1:for(let i = 0 ; i < myStoreValues.length; i++){
        for(let k in myStoreValues[i]){
            let objK = Object.keys(myStoreValues[i])[0]
            if(k === deleteThis){
                let getV = myStoreValues[i][objK]
                article = getV[0];
                myStoreValues[i] = null;
                break loop1;
            }
        }
    }
    let newValues = myStoreValues.filter(el => el !== null);
    window.localStorage.setItem('comments', JSON.stringify(newValues));
    let cls = document.getElementsByClassName(deleteThis)[0];
    if(cls){
        cls.style.display ="none";
    }

    // Update comment count

    let myStoreObjectUp = window.localStorage.getItem('articles');
    let myStoreValuesUp = JSON.parse(myStoreObjectUp);
    let articleTitle = article;
    loop1:for(let i = 0; i < myStoreValuesUp.length; i++) {
        for(let k in myStoreValuesUp[i]) {
            if(k === articleTitle){
                myStoreValuesUp[i].comments -= 1;
                window.localStorage.setItem('articles', JSON.stringify(myStoreValuesUp));
                break loop1;
            }
        }
    }
}

// Admin search article

const searchArticle = () => {
    let txt = document.getElementById('search-text').value
    document.getElementById('load-articles-gif').style.removeProperty('display');    
        const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/search?article=${txt}`)
        response.then(res => res.json())
        .then(data =>{
            document.getElementById('load-articles-gif').style.setProperty('display','none');
            // console.log(data)
            let containerParent = document.getElementById('articles-list-admin');
            // for(let i = data.length - 1; i >= 0; i--){
                containerParent.innerHTML = ''    
            if(data.title){
                let container = document.createElement('div');
                container.setAttribute('id','list-admin');
                containerParent.appendChild(container);
                let row = document.createElement('div');
                row.setAttribute('id','row');
                let spanTitle = document.createElement('span');
                let spanDate = document.createElement('span');
                let spanLikes = document.createElement('span');
                let spanComments = document.createElement('span');
                container.appendChild(row);
                row.appendChild(spanTitle);
                row.appendChild(spanDate);
                row.appendChild(spanLikes);
                row.appendChild(spanComments);
                spanLikes.style.setProperty('margin-left', '5px');
                let spanviewLink = document.createElement('span');
                spanviewLink.setAttribute('id','view-link');
                let spanDelete = document.createElement('span');
                spanDelete.setAttribute('id','delete-article');
                spanDelete.setAttribute('class',`${data._id}`);
                spanDelete.addEventListener('click', deleteArticle.bind());
                container.appendChild(spanviewLink);
                spanviewLink.textContent = 'View';
                container.appendChild(spanDelete);
                spanDate.setAttribute('id', 'delete-article');
                let delImg = document.createElement('img');
                spanDelete.appendChild(delImg)
                delImg.src = 'images/delete-article.PNG';
                spanviewLink.setAttribute('class', `${data._id}`)
                spanTitle.textContent = data.title
                spanDate.textContent = data.date
                spanLikes.textContent = data.likes
                spanComments.textContent = data.comments
                spanviewLink.addEventListener("click", viewArticle.bind());
            } else{
                document.getElementById('load-articles-gif').style.setProperty('display','none');
                alert('No record found');
                window.location.reload();
            }
            })
            .catch(error => console.log(error))
        }


// List again all articles after search
const bringAgainArticles = () => {
    let searchArt = document.getElementById('search-text').value;
    if(searchArt === ''){
        document.getElementById('articles-list-admin').innerHTML = '';
        AdminRetrieveArticlesInfo();
    }
}

// function adminSearch(){
//     let txt = document.getElementById('search-text').value;
//     AdminRetrieveArticlesInfo(true, txt);
// }

// client search article

function clientSearch(){
    let txt = document.getElementById('client-search').value;
    clientRetrieveArticle(true, txt);
}