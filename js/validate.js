
// Login form

function checkEmailValidation(){
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    if(!validateEmail(email)){
        let vEmailMsg = document.getElementById('validate-message');
        vEmailMsg.style.removeProperty('display','none');
        vEmailMsg.innerHTML = 'email is invalid';
         document.getElementById('login-email').style.setProperty('border-bottom','1px solid red');
        return false
        } else{
        document.getElementById('validate-message').innerHTML = ''
        document.getElementById('login-email').style.setProperty('border-bottom','2px solid #5A593B');
        return true
    }
}

function validatePassword(){
    let pass = document.getElementById('login-password').value
    if(pass.search(/[0-9]/) < 0){
        document.getElementById('validate-message').innerHTML = 'password is missing a number';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    } else if(pass.search(/[a-z]/i) < 0){
        document.getElementById('validate-message').innerHTML = 'password is missing lowercase letter';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    }else if(pass.search(/[A-Z]/) < 0){
        document.getElementById('validate-message').innerHTML = 'password is missing uppercase letter';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    } else if(pass.search(/[!@#$%^&*_=+-]/) < 0){
        document.getElementById('validate-message').innerHTML = 'password is missing a special character';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    } else if(pass.length < 8){
        document.getElementById('validate-message').innerHTML = 'password must be at least 8 characters';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    } else if(pass.length > 16){
        document.getElementById('validate-message').innerHTML = 'You must not exceed to 16 characters';
        document.getElementById('login-password').style.setProperty('border-bottom','1px solid red')
        return false;
    }
    else{
        document.getElementById('validate-message').innerHTML = ''
        document.getElementById('login-password').style.setProperty('border-bottom','2px solid #5A593B')
        return true;
    }
}


const validateInput = () =>{
    let email = document.getElementById('login-email').value;
    let vEmailMsg = document.getElementById('validate-message');
    let password = document.getElementById('login-password').value; 
    if(email === ''){
       let vEmailMsg = document.getElementById('validate-message');
       vEmailMsg.style.removeProperty('display','none');
       vEmailMsg.innerHTML = 'Please fill in your email';
        document.getElementById('login-email').style.setProperty('border-bottom','1px solid red');
        return false;
    } else if(!checkEmailValidation()){
        return false;
    }else if(password === ''){
        vEmailMsg.style.removeProperty('display','none');
        vEmailMsg.innerHTML = 'Please fill in your password';
         document.getElementById('login-password').style.setProperty('border-bottom','1px solid red');
         return false;
    } else if(!validatePassword()){
        return false;
    } else{
        const url = "https://mybrandapis-production.up.railway.app/api/v1/login";
        const user_info = {
            email: email,
            password: password
        }

        let formBody = [];

        for (let property in user_info) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(user_info[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

        let response = fetch(url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        });
        response.then(res =>
            res.json()).then(data => {
                if(data.token) {
                let user_token = JSON.parse(window.localStorage.getItem('user_token'));
                user_token = data.token;
                window.localStorage.setItem('user_token', JSON.stringify(user_token));
                
                let logger = {status: true}
                window.localStorage.setItem('logger', JSON.stringify(logger));
                // let log = JSON.parse(window.localStorage.getItem('logger'));
                // logger.status = true;
                // window.localStorage.setItem('logger', JSON.stringify(logger));
                window.location.href = 'admin.html'
            } else{
                vEmailMsg.innerHTML = 'Wrong email or password';
                return false;
            }
            })

        return false
    }
}  

const cancelLogin = () => {
   document.getElementById('login-form').style.setProperty('display', 'none');
}


// Contact form

function checkContactEmail(){
    let userEmail = document.getElementById('user-email').value;
    let msg = document.getElementById('msg').value;
    if(!validateEmail(userEmail)){
        document.getElementById('contact-v-msg').innerHTML = "email is invalid";
        document.getElementById('user-email').style.setProperty('border-bottom', '1px solid red')
        return false;
    } else{
        document.getElementById('contact-v-msg').innerHTML = ''
        document.getElementById('user-email').style.setProperty('border-bottom', '2px solid #5A593B');
        return true;
    }
}

const validateUserInfo = () => {
    let userEmail = document.getElementById('user-email').value;
    let msg = document.getElementById('msg').value;
    let userName = document.getElementById('user-name').value;
    if(userEmail === ''){
        document.getElementById('user-email').style.setProperty('border-bottom', '1px solid red')
        document.getElementById('contact-v-msg').innerHTML = 'Fill your email address';
        return false;
    } else if(!checkContactEmail()){
        document.getElementById('user-email').style.setProperty('border-bottom', '2px solid red');
        document.getElementById('contact-v-msg').innerHTML = 'email is invalid';
        return false;
    } else if (userName === '' || !userName.trim().length){
        document.getElementById('user-email').style.setProperty('border-bottom', '2px solid #353536');
        document.getElementById('contact-v-msg').innerHTML = 'Your name is required';
        document.getElementById('user-name').style.setProperty('border-bottom', '1px solid red')
        return false
    }
    else if(msg === '' || !msg.trim().length){
        document.getElementById('msg').style.setProperty('border', '1px solid red');
        document.getElementById('contact-v-msg').innerHTML = 'Seems like no typed message to send';
        return false;
    } else{
         // Send message

       

    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/messages`,
        {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: userName, email: userEmail, message: msg})
    })
    // console.log('is here')
    response.then(res => res.json())
        .then(data =>{
            document.getElementById('user-email').innerHTML = '';
            document.getElementById('msg').innerHTML ='';
            document.getElementById('user-name').innerHTML = '';
            alert('Thank you! your message has been received');
            window.location.reload();
        })
      
    }
}

function nameFocus(){
    document.getElementById('contact-v-msg').innerHTML = '';
    document.getElementById('user-name').style.setProperty('border-bottom','2px solid #5A593B');
}

const hideContactMsg = () =>{
    document.getElementById('contact-v-msg').style.setProperty('display','none');
    document.getElementById('user-email').style.setProperty('border-bottom', '2px solid #5A593B');
}

const hideContactMsgTextArea = () => {
    document.getElementById('msg').style.setProperty('border', '0.5px solid #FFFAFA');
    document.getElementById('contact-v-msg').style.setProperty('display','none');
}

//comment

function checkCommentEmail(){
    let commentEmail = document.getElementById('comment-email').value;
    if(!validateEmail(commentEmail)){
        document.getElementById('comment-v-msg').innerHTML = 'email is invalid';
        document.getElementById('comment-email').style.setProperty('border', '2px solid red');
        return false;
    } else{
        document.getElementById('comment-v-msg').innerHTML = '';
        document.getElementById('comment-email').style.setProperty('border', 'none');
        return true
    }
}


let tmpStore = []
const validateComment = async() => {
    let commentEmail = document.getElementById('comment-email').value;
    let comment = document.getElementById('comment-textArea').value;
    let userName = document.getElementById('user-comment-name').value;
    if(userName === '' || !userName.trim().length){
        document.getElementById('comment-v-msg').innerHTML = 'Your name is required'
        document.getElementById('user-comment-name').style.setProperty('border', '2px solid red')
        return false;
    }
    else if(commentEmail === ''){
        document.getElementById('user-comment-name').style.setProperty('border','none');
        document.getElementById('comment-v-msg').innerHTML = 'Please fill in your email'
        document.getElementById('comment-email').style.setProperty('border', '2px solid red');
        return false;
    } else if(!validateEmail(commentEmail)){
        document.getElementById('comment-v-msg').style.removeProperty('display');
        document.getElementById('comment-v-msg').innerHTML = 'email is invalid'
        document.getElementById('comment-email').style.setProperty('border', '2px solid red');
        return false;
    }else if(comment === '' || !comment.trim().length){
        document.getElementById('comment-v-msg').style.removeProperty('display');
        document.getElementById('comment-v-msg').innerHTML = 'You have not typed comment'
        document.getElementById('comment-textArea').style.setProperty('border', '2px solid red');
        return false;
    } else{
        
        // add comment client

        let articleTitle = document.getElementById('hiden-current-article').textContent;
        
            let today = new Date();
            let year = today.getFullYear();
            let mo = today.getMonth()+1;
            let da = today.getDate();
            let date = da+"-"+mo+"-"+year;
        
            let commObj = {
                user: userName,
                email: commentEmail,
                comment: comment
            }
            let comm = [comment, userName, commentEmail, date]

            tmpStore.unshift(comm)
            const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleTitle}/comments`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(commObj)
            });
            response.then(res => res.json()) 
                .then(data =>{
                // display new added comment at the top      
                let tempCommentParent = document.getElementById('temp-client-parent-comment');
                tempCommentParent.innerHTML = '';
                for(let i = 0; i < tmpStore.length; i++) {
                    let singleComment = document.createElement('div')
                    singleComment.setAttribute('id', 'temp-coment-client');
                    singleComment.style.cssText = `padding-left: 6px;font-family: 'Sofia', margin-left: 20px; border: 1px solid rgb(93, 93, 94); width: 96.3%; margin-top: 10px`;
                    tempCommentParent.appendChild(singleComment);
                    let commenterName = document.createElement('p');
                    commenterName.setAttribute('class','tempName-client');
                    commenterName.style.cssText = `font-size: 18px; color: #5078B5`;
                    singleComment.appendChild(commenterName);
                    commenterName.textContent = tmpStore[i][1];
                    let commentDate = document.createElement('span');
                    commenterName.appendChild(commentDate);
                    commentDate.style.cssText = `margin-left: 28px`;
                    commentDate.textContent = tmpStore[i][3]
                    let commenterEmail = document.createElement('p');
                    commenterEmail.setAttribute('class', 'tempEmail-client');
                    commenterEmail.style.cssText = `font-size: 18px; color: #5078B5; display: flex; margin-top:-14px`;
                    singleComment.appendChild(commenterEmail);
                    commenterEmail.textContent = tmpStore[i][2];
                    let commentContent = document.createElement('p');
                    singleComment.appendChild(commentContent);
                    commentContent.setAttribute('class', 'tempValue-client')
                    commentContent.style.cssText = `font-size:20px;color: white; line-height: 30px`
                    commentContent.textContent = tmpStore[i][0];
                }

            })
            .catch((error) => console.log(error));
            // Update comments count
                let count = document.querySelector('.client-comment-count').textContent
                count = Number(count) + 1;
                document.querySelector('.client-comment-count').textContent = count;   
            document.getElementById('comment-email').value = '';
            document.getElementById('comment-textArea').value = '';
            document.getElementById('user-comment-name').value = '';
 
    } 
}

function hideUserNameComment(){
    document.getElementById('comment-v-msg').innerHTML = ''
    document.getElementById('user-comment-name').style.removeProperty('border', 'none')
}

const hideCommentlValidtionMsg = () => {
    document.getElementById('comment-textArea').style.removeProperty('border');
    document.getElementById('comment-v-msg').style.setProperty('display', 'none');
}


function checkCommentEmailMin(){
    let commentEmail = document.getElementById('comment-user-email').value;
    if(!validateEmail(commentEmail)){
        document.getElementById('min-validate-comment-msg').innerHTML = 'email is invalid';
        document.getElementById('comment-user-email').style.setProperty('border', '2px solid red');
        return false;
    } else{
        document.getElementById('min-validate-comment-msg').innerHTML = '';
        document.getElementById('comment-user-email').style.setProperty('border', 'none');
        return true
    }
}

const validateCommentMin = () => {
   let useremail = document.getElementById('comment-user-email').value;
   let userComment = document.getElementById('min-coment-area').value;
   let userName = document.getElementById('min-comment-user-name').value;
   if(userName === '' || !userName.trim().length){
    document.getElementById('min-comment-user-name').style.setProperty('border', '2px solid red');
    document.getElementById('min-validate-comment-msg').innerHTML = 'Your name is required';
    return false;
   } else if(useremail === ''){
       document.getElementById('comment-user-email').style.setProperty('border', '2px solid red');
       document.getElementById('min-validate-comment-msg').innerHTML = 'Please fill in your email';
       return false;
   } else if(!checkCommentEmailMin()){
        return false;
   }else if(userComment === '' || !userComment.length){
    document.getElementById('min-coment-area').style.setProperty('border', '2px solid red');
    document.getElementById('min-validate-comment-msg').innerHTML = 'You have not typed comment';

    return false;
}
}


const unborderEmail = () => {
    document.getElementById('comment-user-email').style.removeProperty('border');
}

const unborderComment = () => {
    document.getElementById('min-coment-area').style.removeProperty('border');
    document.getElementById('min-validate-comment-msg').innerHTML = '';
}

// Admin

const validateAdminComment = () =>{
    let adminComment = document.getElementById('admin-comment').value;
    if(adminComment === ''){
        alert('Nothing you typed');
        document.getElementById('admin-comment').style.setProperty('border', '1px solid red');
        return false;
    }
}

const unborderAdminComment = () => {
    document.getElementById('admin-comment').style.removeProperty('border');
}

let msg = '';
const validateArticle = async() => {
    let title = document.getElementById('article-title').value;
    let articleContent = document.getElementById('article-place').textContent;
    
    if(title === '' || !title.trim().length){
        document.getElementById('add-article-valid-msg').innerHTML ='Article title is empty'; 
        document.getElementById('article-title').style.setProperty('border','1px solid red');
        return false
    } 
    else if(articleContent === '' || !articleContent.trim().length){
        document.getElementById('add-article-valid-msg').innerHTML = 'Type the article content';
        document.getElementById('article-place').style.setProperty('border','1px solid red');
        return false;
    } else{
        let title = document.getElementById('article-title').value;
        let content = document.getElementById('article-place').textContent;
        let token = JSON.parse(window.localStorage.getItem('user_token'));
        let img = document.getElementById('uploaded-image');
        let action = document.getElementById('edit-btn').textContent;
        document.getElementById('edit-btn').style.setProperty('pointer-events', 'none');
        document.getElementById('edit-btn').style.setProperty('opacity', `${.1}`);
        const addForm = document.getElementById('arti-form');
        let formData = new FormData(addForm);
        formData.append('image', img.files[0]);
        formData.append('content', content);
        
        if(action === "Save"){
            const response = fetch('https://mybrandapis-production.up.railway.app/api/v1/blogs',{
                method: 'POST',
                headers: { 
                    'Authorization': `bearer ${token}`
                },
                body: formData
            });
            response.then(res => res.json())
            .then(data => {
                alert(data.message)
                window.location.reload();
            });
    } else{
        // Update the article
        // console.log('is Here!')
        let id = document.getElementById('mongo-hiden-id').textContent;
        console.log(id)
        const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${id}`,{
                    method: 'PATCH',
                    headers: { 
                        'Authorization': `bearer ${token}`
                    },
                    body: formData
                });
                response.then(res => res.json())
                .then(data => {
                    alert(data.message)
                    window.location.reload();
                });

    }
}

}

const unborderArticleTitle = () =>{
    document.getElementById('article-title').style.removeProperty('border');
    document.getElementById('add-article-valid-msg').innerHTML = ''
}

const addArticleContentFocus = () => {
    document.getElementById('article-place').style.removeProperty('border');
    document.getElementById('add-article-valid-msg').innerHTML = ''
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

// Adding article

  let getKey = '';
  let idx;

// Load image

function LoadImage(event){
    let uploaded = document.getElementById('uploaded-image').files;
    let imgURLHiden = document.getElementById('hiden-img-ulr');
    document.getElementById('prev-img').style.removeProperty('display');
    if (!uploaded || uploaded.length == 0)
    return;
    const fileLoad = uploaded[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileLoad);
    reader.onload = () => {
        let url = reader.result;
        imgURLHiden.textContent = url;
        document.getElementById('prev-img').src = url;
    };
}


// confirm save

const confirmUpdate = () => {
    let title = document.getElementById('article-title').value;
    let articleContent = document.getElementById('article-place').textContent;
    let update = saveArticle(title, articleContent, true)
        alert(update);
        location.reload();
    }


// Discard update
const discardUpdate = () => {
    document.getElementById('confirm-popup').style.setProperty('display','none');
}

//Admin retrieve articles

function AdminRetrieveArticlesInfo(search=false, txt){
    let searchArt = document.getElementById('search-text');
    searchArt.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  
        searchArticle();
    }
});
    document.getElementById('load-articles-gif').style.removeProperty('display');    
    const response = fetch('https://mybrandapis-production.up.railway.app/api/v1/blogs')
        response.then(res => res.json())
          .then(data =>{
            document.getElementById('load-articles-gif').style.setProperty('display','none');
            // console.log(data)
            let containerParent = document.getElementById('articles-list-admin');
            for(let i = data.length - 1; i >= 0; i--){
                let container = document.createElement('div');
                container.setAttribute('id','list-admin');
                containerParent.appendChild(container);
                let row = document.createElement('div');
                row.setAttribute('id','row');
                let spanTitle = document.createElement('span');
                let spanDate = document.createElement('span');
                let spanLikes = document.createElement('span');
                let spanComments = document.createElement('span');
                spanTitle.setAttribute('id', 'arti-tle')
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
                spanDelete.setAttribute('class',`${data[i]._id}`);
                spanDelete.addEventListener('click', deleteArticle.bind());
                container.appendChild(spanviewLink);
                spanviewLink.textContent = 'View';
                container.appendChild(spanDelete);
                spanDate.setAttribute('id', 'delete-article');
                let delImg = document.createElement('img');
                spanDelete.appendChild(delImg)
                delImg.src = 'images/delete-article.PNG';
                spanviewLink.setAttribute('class', `${data[i]._id}`)
                spanTitle.textContent = data[i].title
                spanDate.textContent = data[i].date
                spanLikes.textContent = data[i].likes
                spanComments.textContent = data[i].comments
                spanviewLink.addEventListener("click", viewArticle.bind());
            }

            })
            .catch(error => console.log(error))
    
            
}

let articleToView 
function deleteArticle(t){
    articleToView = t.path[1].getAttribute('class');
    document.getElementById('delete-article-popup').style.removeProperty('display');
        const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}`)
        response.then(res => res.json())
                .then(data =>{
                    document.getElementById('what-delete').textContent = data.data.title;
                })
                .catch(err => console.log(err));
    }
// }

function confirmDelete(){
    document.getElementById('confirm-delete').textContent = 'ok';
    document.getElementById('delete-article-popup').style.setProperty('display','none');
    finalDelete();
}

const finalDelete = async() =>{
    
    let user_token = JSON.parse(window.localStorage.getItem('user_token'));
    const response = fetch(`https://mybrandapis-production.up.railway.app/api/v1/blogs/${articleToView}`, {
        method: 'DELETE', 
        headers: {
                    'Authorization': `bearer ${user_token}`
                }
        })
        response.then(res => res.json())
            .then(data =>{
                alert(data.message)
                window.location.reload();
            })
    }

