// //登录页面跳转主页面
// const loginBtn = document.querySelector('.login-btn')
// const loginPage = document.querySelector('.login')
// console.log(loginPage);
// loginBtn.addEventListener('click',function(){
//     console.log('点击了');
//     loginPage.classList.remove('active')
//     mainPage.classList.add('active')
//     console.log(loginPage);
//     console.log(mainPage);
// })

// //密码可视切换
// const psw = document.querySelector('.psw-container')
// const toggleBtn = document.querySelector('.toggle')
// console.log(psw);
// console.log(toggleBtn);
// toggleBtn.addEventListener('click',function(){
//     if (psw.type === 'password') {
//         psw.type = 'text'
//         toggleBtn.src = '../IMAGE/eye-open.svg'
//     }else {
//         psw.type = 'password'
//         toggleBtn.src = '../IMAGE/eye-close.svg'
//     }
// })

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

