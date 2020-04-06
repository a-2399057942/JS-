let sorting = (function () {
    //获取想要操作的元素对象
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        bigBox = document.querySelector('.productBox'),
        data = null;
    
    //从服务器获取数据
    let server = function server() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }

    //把获取到的数据渲染到页面当中
    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<div class="card">
                    <img src="${img}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">价格：￥${price.toFixed(2)}</p>
                        <p class="card-text">销量：${hot}</p>
                        <p class="card-text">时间：${time}</p>
                        <a href="#" class="btn btn-primary">立即购买</a>
                    </div>
                </div>`; 
        });
        bigBox.innerHTML = str;
    }

    //给每个li绑定点击事件
    let handle = function handle() {
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, ''); 
                    b = String(b[pai]).replace(/-/g, ''); 
                    return (a - b) * this.flag;
                });
                render();
            }
        });
    }
    return {
        init() {
            server();
            render();
            handle();
        }
    }
})();
sorting.init();