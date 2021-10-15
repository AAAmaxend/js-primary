//var that; 没用bin方法修改this之前,我们用全局传入that来接收this来实现
class Tab {
    constructor(id) {
        // that = this;
        //获取元素
        this.main = document.querySelector(id)

        this.add = this.main.querySelector('.tabadd')
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child')
        //section的父元素
        this.sec = this.main.querySelector('.tabscon')
        this.init()
    }
    init() {
        this.updateNode();
        // init 初始化操作，让相关元素绑定事件
        this.add.onclick = this.addTab.bind(this.add, this)

        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this)//通过bin方法传入当前this(即是第二个参数)
            //用各个函数的形参that来接受,达到改变调用者this的目的
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this)
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }
    }

    //动态添加元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.iconfont')
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }

    //1.切换功能
    toggleTab(that) {
        // console.log(this.index);

        that.clearClass()
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'
    }

    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = ''
        }
    }

    //2.添加功能
    addTab(that) {
        that.clearClass()
        //(1)创建li元素和section元素
        var li = ' <li class="liactive"><span>新选项卡</span><span class="iconfont">&#xe60d;</span></li>'
        var section = '<section class="conactive">新内容</section>'
        //(2)把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li)
        that.sec.insertAdjacentHTML('beforeend', section)
        that.init()
    }
    //3.删除功能
    removeTab(that, e) {
        e.stopPropagation();//阻止冒泡 防止触发Li的点击事件
        var index = this.parentNode.index
        // console.log(index);
        // 根据索引号删除对应的li和 section remove()方法可以直接删除指定的元素
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        //当我们删除的不是选中状态的li的时候，原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return

        //当我们删除了选中状态的这个li的时候，让它的前一个li处于选定状态
        index--;
        //自动点击一次
        that.lis[index] && that.lis[index].click()//判断是否为负数

    }
    //4.修改功能
    editTab() {

        var str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //alert(11)
        this.innerHTML = '<input type = "text" style = "width:50px"/>'
        var input = this.children[0]
        input.value = str
        input.select()//直接让文字处于选定状态
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        }
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode == 13) {
                //手动调用表单失去焦点事件，不需要鼠标离开操作
                this.blur()
            }
        }
    }
}

var tab = new Tab('#tab');
