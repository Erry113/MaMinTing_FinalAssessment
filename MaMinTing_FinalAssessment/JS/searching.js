//搜索栏切换
const searchingTopbarLis = document.querySelectorAll('.searching-topbar li')
for ( i = 0; i < searchingTopbarLis.length; i++){
    searchingTopbarLis[i].addEventListener('click',function(){
        document.querySelector('.searching-topbar .active1').classList.remove('active1')
        this.classList.add('active1')
    })
}

//模糊搜索用户
const searchBtn = document.querySelector('.search-btn')
const historySearch = document.querySelector('.history-search')
const searching = document.querySelector('.searching')
const searchaccountItems = document.querySelector('.search-account-items')
const historyContent = document.querySelector('.history-search .content')
const SearchPostContainer = document.querySelector('.search-post-container')
console.log(SearchPostContainer);
searchBtn.addEventListener('click',function(){
    historySearch.classList.remove('active')
    searching.classList.add('active')
    const searchContent = document.querySelector('.searching-content').value
    
    render()

    async function render(){
        let res = await http({
            method:'get',
            url:`http://8.134.148.60:4000/user/fuzzySearchUser?username=${searchContent}`
        })
        console.log(res);
        console.log(res.data);
        
        let htmlStr = ''
        let HtmlHistoryContent = ''
        if(res.data.length === 0){
            htmlStr += `
                <div class="search-error">找不到相应用户</div>
            `
            console.log('找不到相应用户');
        }else {
            res.data.forEach(item => {
                htmlStr += `
                    <div class="search-account-content">
                        <div class="account-information">
                            <div class="heads"></div>
                            <div class="account-information1">
                                <div class="name">${item.name}</div>
                                <div class="account-information2">
                                    <div class="fan-num">粉丝 0</div>
                                    <div class="note-num">笔记/评价 0</div>
                                </div>
                            </div>        
                        </div>
                        <button class="follow">关注</button>
                    </div>
                `
            });
        }
        
        searchaccountItems.innerHTML = htmlStr

        HtmlHistoryContent += `
            <p class="history-content">${searchContent}</p>
        `
        historyContent.innerHTML = '' 
        historyContent.innerHTML = HtmlHistoryContent 
    }
    //模糊搜索文章
    getActicle()
    async function getActicle(){
        let res = await http({
            method:'get',
            url:`http://8.134.148.60:4000/article/searchArticle?keyword=${searchContent}`
        })
        console.log(res);
        let SeaechArticleHtml = ''
        res.data.forEach(item => {
            SeaechArticleHtml += `
                <div class="post-content">
                    <div class="article-cover"><img src="http://8.134.148.60:4000/${item.article_covers[0]}" alt=""></div>
                    <div class="article-title">${item.article_title}</div>
                    <div class="author-information">
                        <div class="author-basic-information">
                            <div class="author-headphoto"><img src=${item.author_headphoto} alt=""></div>
                            <div class="author-name">${item.author_name}</div>
                        </div>
                        <div class="author-other-information">
                            <img src="../IMAGE/dislike.svg" alt="" class="articleLike">
                            <div class="article-likenum">${item.article_likenum}</div>
                        </div>
                    </div>
                </div>
            `
        });
        SearchPostContainer.innerHTML = SeaechArticleHtml
    }
})
console.log(historyContent);
console.log(historySearch);

window.onload = function(){
    Searchwaterfall()
}
var resizeTimeout;
var searchPost = document.querySelector('.searchPost')
function Searchwaterfall(){
    var clientWidth = document.documentElement.clientWidth
    var postItems = document.getElementsByClassName('post-content')
    var itemWidth = postItems[0].offsetWidth
    
    var firstHeightArry = []
    var columnGap = 5
    var rowGap = 5
    for (let item of postItems) {
        item.style.position = '';
        item.style.left = '';
        item.style.top = '';
    }
    
    setTimeout(function() {
        var SearchPostContainer = document.querySelector('.search-post-container')
        // console.log(SearchPostContainer);
        console.log(SearchPostContainer);
        var effectiveWidth = clientWidth-columnGap
        var num = Math.floor(effectiveWidth / (itemWidth + columnGap))
        SearchPostContainer.style.width = (num * (itemWidth + columnGap)) + 'px'
        for (var i = 0; i < num; i++) {
            firstHeightArry.push(postItems[i].offsetHeight);
        }
        for (var i = 0; i<postItems.length ; i++){
            if ( i<num ){
            }else {
                var minHeight = Math.min(...firstHeightArry)
                var index = InArry(minHeight,firstHeightArry)
                postItems[i].style.position = 'absolute'
                postItems[i].style.left = (index*(itemWidth+columnGap))+'px'
                postItems[i].style.top = (minHeight+rowGap*index)+'px'
                firstHeightArry[index] += postItems[i].offsetHeight + rowGap;
            }
        }
        var maxColumnHeight = Math.max(...firstHeightArry)
        searchPost.style.height = maxColumnHeight +50+ 'px'
    }, 500);
    //点赞
    const likeBtn = document.querySelectorAll('.articleLike')
    for (var i=0;i<likeBtn.length;i++){
        likeBtn[i].addEventListener('click',function(){
            console.log(this.src);
            if (this.src==='http://127.0.0.1:5500/IMAGE/dislike.svg'){
                this.src = '../IMAGE/like-fill.svg'
            }else {
                this.src='../IMAGE/dislike.svg'
            }
        })
    }
    

    
}
function InArry(min,firstHeightArry){
    for (var i = 0; i<firstHeightArry.length; i++){
        if ( firstHeightArry[i] === min){
            return i;
        }
    }
}


window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout); // 防止resize事件频繁触发导致函数重复执行
    resizeTimeout = setTimeout(Searchwaterfall, 100); // 延迟执行以优化性能
})

