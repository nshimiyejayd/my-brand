// Login form
const validateInput = () =>{
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    if(email === ''){
       let vEmailMsg = document.getElementById('validate-message');
       vEmailMsg.style.removeProperty('display','none');
       vEmailMsg.innerHTML = 'Please fill in your email';
        document.getElementById('login-email').style.setProperty('border-bottom','1px solid red');
        return false;
    } else if(password === ''){
        let vEmailMsg = document.getElementById('validate-message');
        vEmailMsg.style.removeProperty('display','none');
        vEmailMsg.innerHTML = 'Please fill in your password';
         document.getElementById('login-password').style.setProperty('border-bottom','1px solid red');
         return false;
    }
}  





const hideMessage = () =>{
    document.getElementById('validate-message').style.setProperty('display', 'none');
    document.getElementById('login-email').style.setProperty('border-bottom','2px solid #5A593B');

}

const hideMessagePassword = () => {
    document.getElementById('validate-message').style.setProperty('display', 'none');
    document.getElementById('login-password').style.setProperty('border-bottom','2px solid #5A593B');
}

const cancelLogin = () => {
   document.getElementById('login-form').style.setProperty('display', 'none');
}

// Moble login

const validateInputMin = () =>{
    let email = document.getElementById('login-email-min').value;
    let password = document.getElementById('login-password-min').value;
    if(email === ''){
        document.getElementById('min-validate-msg').style.removeProperty('display','none');
        document.getElementById('min-validate-msg').innerHTML = 'Please fill your email'
        document.getElementById('login-email-min').style.setProperty('border-bottom','1px solid red');
        return false;
    } else if(password === ''){
        document.getElementById('min-validate-msg').style.removeProperty('display','none');
        document.getElementById('min-validate-msg').innerHTML = 'Please fill your password'
        document.getElementById('login-password-min').style.setProperty('border-bottom','1px solid red');
        return false;
    }
}  

const hideMessageMin = () =>{
    document.getElementById('min-validate-msg').style.setProperty('display','none');
    document.getElementById('login-email-min').style.setProperty('border-bottom','2px solid #5A593B');
}

const hideMessagePasswordMin = () => {
    document.getElementById('min-validate-msg').style.setProperty('display', 'none');
    document.getElementById('login-password-min').style.setProperty('border-bottom','2px solid #5A593B');
}

const cancelLoginMin = () => {
   document.getElementById('min-login').style.setProperty('display', 'none');
}


// Contact form

const validateUserInfo = () => {
    let userEmail = document.getElementById('user-email').value;
    let msg = document.getElementById('msg').value;
    if(userEmail === ''){
        document.getElementById('contact-v-msg').style.removeProperty('display');
        document.getElementById('user-email').style.setProperty('border-bottom', '1px solid red')
        document.getElementById('contact-v-msg').innerHTML = 'Fill your email address';
        return false;
    } else if(msg === ''){
     document.getElementById('msg').style.setProperty('border', '1px solid red');
     document.getElementById('contact-v-msg').style.removeProperty('display');
     document.getElementById('contact-v-msg').innerHTML = 'Seems like no typed message to send';
     return false;
    }
}

const hideContactMsg = () =>{
    document.getElementById('contact-v-msg').style.setProperty('display','none');
    document.getElementById('user-email').style.setProperty('border-bottom', '2px solid #5A593B');
}

const hideContactMsgTextArea = () => {
    document.getElementById('msg').style.setProperty('border', '0.5px solid #FFFAFA');
    document.getElementById('contact-v-msg').style.setProperty('display','none');
}

const validateComment = () => {
    let commentEmail = document.getElementById('comment-email').value;
    let comment = document.getElementById('comment-textArea').value;
    if(commentEmail === ''){
        document.getElementById('comment-v-msg').style.removeProperty('display');
        document.getElementById('comment-v-msg').innerHTML = 'Please fill in your email'
        document.getElementById('comment-email').style.setProperty('border', '2px solid red');
        return false;
    } else if(comment === ''){
        document.getElementById('comment-v-msg').style.removeProperty('display');
        document.getElementById('comment-v-msg').innerHTML = 'You have not typed comment'
        document.getElementById('comment-textArea').style.setProperty('border', '2px solid red');
        return false;
    }
}

const hideEmailValidtionMsg = () => {
    document.getElementById('comment-email').style.removeProperty('border');
    document.getElementById('comment-v-msg').style.setProperty('display', 'none');
}

const hideCommentlValidtionMsg = () => {
    document.getElementById('comment-textArea').style.removeProperty('border');
    document.getElementById('comment-v-msg').style.setProperty('display', 'none');
}

const validateCommentMin = () => {
   let useremail = document.getElementById('comment-user-email').value;
   let userComment = document.getElementById('min-coment-area').value;
   if(useremail === ''){
       document.getElementById('comment-user-email').style.setProperty('border', '2px solid red');
       alert('Please fill in your email');
       return false;
   } else if(userComment === ''){
    document.getElementById('min-coment-area').style.setProperty('border', '2px solid red');
    alert('You have not typed comment');
    return false;
}
}

const unborderEmail = () => {
    document.getElementById('comment-user-email').style.removeProperty('border');
}

const unborderComment = () => {
    document.getElementById('min-coment-area').style.removeProperty('border');
}

// Admin

const validateAdminComment = () =>{
    // alert('somethig');
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


const validateArticle = () => {
    let title = document.getElementById('article-title').value;
    let article = document.getElementById('article-place').value;
    if(title === ''){
        alert('Please specify the title of the artcle');
        document.getElementById('article-title').style.setProperty('border','1px solid red');
        return false
    } 
    else if(article === ''){
        alert('Type the article content');
        document.getElementById('article-place').style.setProperty('border','1px solid red');
        return false;
    }
}

const unborderArticleTitle = () =>{
    document.getElementById('article-title').style.removeProperty('border');
}

const unborderAddArticle = () => {
    document.getElementById('article-place').style.removeProperty('border');
}

const validateMinAddArticle = () => {
    let title  = document.getElementById('type-aricle-tile').value;
    let articleContent = document.getElementById('m-article-content').value;
    if(title === ''){
        alert("Please specify a title");
        return false;
    } else if(articleContent === ''){
        alert('Please type article content');
        return false
    }
}