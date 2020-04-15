let waterModule = (function () {
    //获取想要操作的元素对象
    let columns = Array.from(document.querySelectorAll('.column')),
        data = [];
    
    //从服务器获取数据
    let query = function query() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }

    //绑定数据
    let bind = function bind() {
        data = data.map(item => {
            let w = item.width,
                h = item.height;
            h = h / (w / 230);
            item.width = 230;
            item.height = h;
            return item;
        });

        for (let i = 0; i < data.length; i += 3){
            let group = data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height; 
            });
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight; 
            });

            group.forEach((item, index) => {
                let {
                    pic,
                    title,
                    link,
                    height
                } = item;
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<a href="${link}">
                            <div class="lazyImageBox" style="height:${height}px">
                                <img src="" alt="" data-image="${pic}">
                            </div>
                            <p>${title}</p>
                        </a>`;
                columns[index].appendChild(card);
            });
        }
    }

    //延迟加载
    let lazy = function lazy() {
        let lazyImages = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImages, lazyImage => {
            let load = lazyImage.getAttribute('isLoad');
            if (load === "true") return;
            let b = utils.offset(lazyImage).top + lazyImage.offsetHeight / 2;
            let a = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (b <= a) {
                lazyImg(lazyImage);
            }
        });
    }
    let lazyImg = function lazyImg(lazyImage) {
        let img = lazyImage.querySelector('img'),
            _data = img.getAttribute('data-image'),
            temp = new Image;
        temp.src = _data;
        temp.onload = () => {
            img.src = _data;
            utils.css(img, 'opacity', 1);
        }
        img.removeAttribute('data-image');
        temp = null;
        lazyImage.setAttribute('isLoad', 'true');
    }

    //加载更多
    let render;
    let load = function load() {
        let HTML = document.documentElement;
        if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
            if (render) return;
            render = true;
            query();
            bind();
            lazy();
            render = false;
        }
    }


    return {
        init() {
            query();
            bind();
            lazy();
            window.onscroll = function () {
                lazy();
                load();
            }
        }
    }
})();
waterModule.init();