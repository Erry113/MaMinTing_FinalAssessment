//密码可视切换
const psw = document.querySelector('.psw-container')
const toggleBtn = document.querySelector('.toggle')
toggleBtn.addEventListener('click',function(){
    if (psw.type === 'password') {
        psw.type = 'text'
        toggleBtn.src = '../IMAGE/eye-open.svg'
    }else {
        psw.type = 'password'
        toggleBtn.src = '../IMAGE/eye-close.svg'
    }
})
//登录效果
const loginPage = document.querySelector('.login')
document.querySelector('.login-btn').addEventListener('click', function(event) {
    event.preventDefault() 
    const account = document.querySelector('.account').value
    const password = document.querySelector('.password').value
    const unregistered = document.querySelector('.unregistered')
    const passwordWorry = document.querySelector('.password-worry')
    const accountInput = document.querySelector('.id input')
    const passwordInput = document.querySelector('.psw input')
    const loginSuccess = document.querySelector('.login-success')
    const agreementBox = document.querySelector('.agreement-box')
    const isChecked = agreementBox.checked
    console.log(agreementBox);
    console.log(account,password);

    fetch('http://8.134.148.60:4000/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            account:account,
            password:password
        })
    })
    .then(response =>{
        if (!response.ok){
            throw new Error('未输入内容')
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        console.log(data.msg);
        if ( isChecked ){
            if ( data.msg === '该账号不存在，请先进行注册'){
                passwordWorry.classList.remove('show')
                unregistered.classList.add('show')
                passwordInput.style.border = '1px solid gray'
                accountInput.style.border = '1px solid #ff1c1c'
            }else if (data.msg === '密码错误！请重新输入') {
                unregistered.classList.remove('show')
                passwordWorry.classList.add('show')
                accountInput.style.border = '1px solid gray'
                passwordInput.style.border = '1px solid #ff1c1c'
            } else {
                unregistered.classList.remove('show')
                passwordWorry.classList.remove('show')
                accountInput.style.border = '1px solid gray'
                passwordInput.style.border = '1px solid gray'
                loginSuccess.style.opacity = '1'
                setTimeout(function(){
                    loginSuccess.style.opacity = '0'
                    document.querySelector('.login').reset()
                    loginPage.classList.remove('active')
                    mainPage.classList.add('active')
                },1000)
            }
        } else {
            alert('请先勾选协议')
        }
    })
    .catch(error => {
        console.error(error)
        alert('请先输入内容')
    })
})

// 搜索页面切换
const SearchInput = document.querySelector('#search-input')
const searchPage = document.querySelector('.search-page')
const mainPage = document.querySelector('.main-page')
const returnBtn = document.querySelector('.return')
SearchInput.addEventListener('click',function(){
    mainPage.classList.remove('active')
    searchPage.classList.add('active')
})
returnBtn.addEventListener('click',function(){
    searchPage.classList.remove('active')
    mainPage.classList.add('active')
    searching.classList.remove('active')
    historySearch.classList.add('active')
    // document.querySelector('.searching-content').reset()
})

//顶部导航栏切换
const GZBtn = document.querySelector('.GZ')
const noteBtn = document.querySelector('.note')
const GZPage = document.querySelector('.GZ-page')
const notePage = document.querySelector('.note-page')
GZBtn.addEventListener('click',function(){
    noteBtn.classList.remove('active1')
    GZBtn.classList.add('active1')
    notePage.classList.remove('active')
    GZPage.classList.add('active')
})
noteBtn.addEventListener('click',function(){
    GZBtn.classList.remove('active1')
    noteBtn.classList.add('active1')
    GZPage.classList.remove('active')
    notePage.classList.add('active')
})

//底部tab栏切换
const lis = document.querySelectorAll('.bottom-tab li')
const pages = document.querySelectorAll('.page')
console.log(pages);
for (let i = 0; i < lis.length; i++){
    lis[i].addEventListener('click',function(){
        document.querySelector('.bottom-tab .turn-org').classList.remove('turn-org')
        this.classList.add('turn-org')

        document.querySelectorAll('.page.active').forEach(page => page.classList.remove('active'))
        const currentPage = pages[i]
        currentPage.classList.add('active')
        console.log(pages);
    })
}

//主页tab栏切换
const mainPageTabs = document.querySelectorAll('.main-page-tab li')
const posts = document.querySelectorAll('.post')
for (let i = 0; i < mainPageTabs.length-1; i++){
    mainPageTabs[i].addEventListener('click',function(){
        document.querySelector('.main-page-tab .bold').classList.remove('bold')
        this.classList.add('bold')

        document.querySelectorAll('.post.active').forEach(post => post.classList.remove('active'))
        const currentPost = posts[i]
        currentPost.classList.add('active')
    })
}

//发布笔记页面切换
const postNotesBtn = document.querySelector('.post-notes-btn')
const bottomTab = document.querySelector('.bottom-tab')
const postReturnBtn = document.querySelector('.post-return')
const postNotePage = document.querySelector('.post-notes-page')
const mainPageContainer = document.querySelector('.main-page-container')
const mainPageTab1 = document.querySelector('.mainPageTab1')
postNotesBtn.addEventListener('click',function(){
    bottomTab.style.display = 'none'
    console.log(bottomTab);
})
postReturnBtn.addEventListener('click',function(){
    postNotePage.classList.remove('active')
    mainPageContainer.classList.add('active')
    bottomTab.style.display = 'flex'
    
    document.querySelector('.bottom-tab .turn-org').classList.remove('turn-org')
    mainPageTab1.classList.add('turn-org')
})

