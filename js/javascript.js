let winds = document.body.clientWidth;
function showLoginFom(){
    let w = document.body.clientWidth;
    if(w >= 900){
        document.getElementById('login-form').style.removeProperty('display');
    } else{
        document.getElementById('min-login').style.removeProperty('display');
        document.getElementById('menu-box-hide').style.setProperty('display','none');
    }
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


function showArticleDetails(){
    let w2= document.body.clientWidth;
    if(w2 >= 900){
    document.getElementById('article-details').style.removeProperty('display');
    document.getElementById('contents').style.setProperty('opacity','.1');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/animate-popup.css';
    head.appendChild(link);
    } else{
        document.getElementById('full-text').style.removeProperty('display')
        document.getElementById('comments-min').style.removeProperty('display');
    }
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

function viewArticle(){
    document.getElementById('article-details-admin').style.removeProperty('display')
    document.getElementById('message-container').style.setProperty('display', 'none');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/aniamte-view-admin.css';
    head.appendChild(link);
}

function closeViewAmin(){
    document.getElementById('article-details-admin').style.setProperty('display', 'none')
    document.getElementById('edit-new-article').style.setProperty('display', 'none')
}

function showEdit(){
    if(winds >= 900){  
    document.getElementById('edit-new-article').style.removeProperty('display')
    document.getElementById('article-details-admin').style.setProperty('display', 'none')
    document.getElementById('message-container').style.setProperty('display','none');
  } else{
    document.getElementById('m-add-article').style.removeProperty('display');
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/showMadd.css';
    head.appendChild(link);
    document.getElementById('m-add-article').style.setProperty('margin-top','-150px');
    document.getElementById('for-hide').style.setProperty('opacity','.1');
}
}
function closeEdit(){
    document.getElementById('edit-new-article').style.setProperty('display', 'none')
}

function showCommentsAdmin(){
    document.getElementById('article-comments').style.removeProperty('display')
    document.getElementById('article-details-admin').style.setProperty('display', 'none')
    document.getElementById('message-container').style.setProperty('display', 'none');
}

function showMessages(){
    if(winds >= 900){
        document.getElementById('message-container').style.removeProperty('display');
        document.getElementById('article-details-admin').style.setProperty('display','none')
        document.getElementById('article-comments').style.setProperty('display','none');
        document.getElementById('edit-new-article').style.setProperty('display','none');
    } else{
        showMmessages();
    }
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
function expandArticle(){
    document.getElementById('add-comments-min').style.removeProperty('display');
    document.getElementById('full-text').style.removeProperty('display')
    document.getElementById('comments-min').style.removeProperty('display');
}

function finalHideMaddarticle(){
    document.getElementById('m-add-article').style.setProperty('display', 'none');
    window.location.reload();
    document.getElementById('for-hide').style.setProperty('opacity','1')
}

function hideMAddArticle(){
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/animateHideMadd.css';
    head.appendChild(link);
    setInterval(function(){
        finalHideMaddarticle();
    },1000);
}

function editMArticle(){
    console.log("called")
    document.getElementById('add-v-form').style.removeProperty('display');
    document.getElementById('m-edit-btn').style.setProperty('display','none');
}

function showMComments(){
    document.getElementById('m-hide-comments').style.removeProperty('display');
    document.getElementById('m-comment-btn').style.setProperty('display','none');
}

function hideMAdminFullArticle(){
    document.getElementById('m-view-article').style.setProperty('display','none');

}
function showMAdFullArticle(){
    document.getElementById('m-view-article').style.removeProperty('display');
 
}
function hideMdelete(){
    document.getElementById('m-delete-article').style.setProperty('display', 'none');
}
function showMdelete(){
    document.getElementById('m-delete-article').style.removeProperty('display');
}

function hideMmessages(){
    document.getElementById('m-msg').style.setProperty('display', 'none');
}
function showMmessages(){
    document.getElementById('m-msg').style.removeProperty('display');
}

function scrollToBottom(node){
	node.scrollTop = 600;
}

function divScroll(){
    let elementToScroll = document.getElementById('article-details-container');
    scrollToBottom(elementToScroll);
}


