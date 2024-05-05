const PostContainer = document.querySelector('.recommend-post .post-container')
console.log(PostContainer);
getRecommendPost()
async function getRecommendPost(){
    let res = await http({
        method:'get',
        url:'http://8.134.148.60:4000/article/articleList?size=80'
    })
    console.log(res);
    let articleHtml = ''
    res.data.forEach(item => {
        articleHtml += `
            <div class="post-content">
                <div class="article-cover"><img src="http://8.134.148.60:4000/${item.article_covers[0]}" alt=""></div>
                <div class="article-title">${item.article_title}</div>
                <div class="author-information">
                    <div class="author-basic-information">
                        <div class="author-headphoto"><img src=${item.author_headphoto} alt=""></div>
                        <div class="author-name">${item.author_name}</div>
                    </div>
                    <div class="author-other-information">
                        <img src="../IMAGE/dislike.svg" alt="">
                        <div class="article-likenum">${item.article_likenum}</div>
                    </div>
                </div>
            </div>
        `
    });
    PostContainer.innerHTML = articleHtml
}

//瀑布流布局
window.onload = function(){
    waterfall()
}
var resizeTimeout;
var recommendPost = document.querySelector('.recommend-post')
function waterfall(){
    var PostContainer = document.querySelector('.recommend-post .post-container')
    console.log(PostContainer);
    var clientWidth = document.documentElement.clientWidth
    var postItems = document.getElementsByClassName('post-content')
    var firstHeightArry = []
    var columnGap = 5
    var rowGap = 5
    for (let item of postItems) {
        item.style.position = '';
        item.style.left = '';
        item.style.top = '';
    }
    setTimeout(function() {
        var itemWidth = postItems[0].offsetWidth
        var effectiveWidth = clientWidth-columnGap
        var num = Math.floor(effectiveWidth / (itemWidth + columnGap))
        PostContainer.style.width = (num * (itemWidth + columnGap)) + 'px'
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
        recommendPost.style.height = maxColumnHeight +50+ 'px'
    }, 500);
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
    resizeTimeout = setTimeout(waterfall, 100); // 延迟执行以优化性能
})




