//密码可视切换
const psw = document.querySelector('.psw-container')
const toggleBtn = document.querySelector('.toggle')
console.log(psw);
console.log(toggleBtn);
toggleBtn.addEventListener('click',function(){
    if (psw.type === 'password') {
        psw.type = 'text'
        toggleBtn.src = '../IMAGE/eye-open.svg'
    }else {
        psw.type = 'password'
        toggleBtn.src = '../IMAGE/eye-close.svg'
    }
})

//登录页面跳转主页面
const loginBtn = document.querySelector('.login-btn')
const loginPage = document.querySelector('.login')
console.log(loginPage);
loginBtn.addEventListener('click',function(){
    console.log('点击了');
    loginPage.classList.remove('active')
    mainPage.classList.add('active')
    console.log(loginPage);
    console.log(mainPage);
})