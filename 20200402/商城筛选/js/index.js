let screening = (function () { 
    //准备数据
    let _selected = [];
    let _select = [{
        type: 1,
        text:'品牌',
        content: [ "苹果","小米","锤子","魅族","华为","三星","OPPO","vivo","乐视","360","中兴","索尼"]
    }, {
            type: 2,
            text:'尺寸',
        content: ["3.0英寸以下","3.0-3.9英寸","4.0-4.5英寸","4.6-4.9英寸","5.0-5.5英寸","6.0英寸以上"]
    }, {
            type: 3,
            text:'系统',
        content: ["安卓(Android)","苹果(IOS)","微软(WindowsPhone)","无","其他"]
    }, {
            type: 4,
            text:'网络',
        content: ["联通3G","双卡单4G","双卡双4G","联通4G","电信4G","移动4G"]
    }];
    
    //需要操作的元素
    let $typeBox = $('#type'),
        $chooseBox = $('#choose');

    //根据数据渲染视图
    function render() {
        let str = ``;
        _select.forEach(item => {
            let {type,text,content} = item;
            str += `<li _type="${type}">
            ${text}：
            ${content.map(A => {
                return `<a href="javascript:;">${A}</a>`;
            }).join('')}
            </li>`;
        });
        $typeBox.html(str);

        //选择区
        str = `你的选择:`;
        _selected.sort((A, B) => A.type - B.type);
        _selected.forEach(item => {
            str += `<mark>${item.name}<a href="javascript:;" _type="${item.type}">X</a></mark>`;
        });
        $chooseBox.html(str);


        //渲染完绑定点击事件
        handle();
    }
    
    //待选取绑定点击事件
    function handle() {
        $typeBox.find('a').click(function () {
            let $this = $(this),
                obj = {};
            //构建储存的内容
            obj.type = $this.parent().attr('_type');
            obj.name = $this.text().trim();

            //点击谁就把谁存到_selected中
            _selected.forEach((item, index) => {
                if (item.type === obj.type) {
                    _selected.splice(index, 1);
                }
            });
            _selected.push(obj);


            //重新渲染
            render();
        });
    }

    //已选取绑定点击事件
    function handleSelect() {
        $chooseBox.find('a').click(function () {
            let $this = $(this),
                _type = parseFloat($this.attr('_type'));
            _selected.forEach((item, index) => {
                if (item.type === _type) {
                    _selected.splice(index, 1);
                }
            });
            render();
        });
    }

    
    return {
        init() {
            render();
        }
    }
})();
screening.init();