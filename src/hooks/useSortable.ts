type event={
    target:any,
    clientX:number,
    clientY:number
}
type node={
    style:any,
    sort:number
}
export default class Sortable{
    el:any
    nodeList:any[]=[]
    nodeNumber: number = 5;
    nodeWidth: number = 100;
    nodeHeight: number = 70;
    index: number = 0;
    constructor(el:{[prop:string]:any}){
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
        }
        this.el = el 
        this.init()
    }
    init(){
        console.log('init')
        // 获取容器下所有卡片的节点
        this.nodeList = [...this.el.children];
        // 给所有节点初始化序号，绑定事件
        this.nodeList.forEach((node,index)=> {
            node.sort = index;
            node.addEventListener('mousedown', this.bindDragEvent.bind(this));
        });
        // 进行第一次排序
        this.sortNode(this.nodeList);
    }
    bindDragEvent(e:event) {
        console.log(e)
        // 当前拖拽的节点
        let { target } = e;
        // 增加class，取消动效，防止拖拽掩饰；增加zIndex层级
        target.className = 'drag-item';
        let styleLeft = parseInt(target.style.left),
            styleTop = parseInt(target.style.top);
        let startLeft = e.clientX,
            startTop = e.clientY;
    
    
        // 拖动节点
        const mousemoveFn = (moveEvent:event) => {
            let endLeft = styleLeft + (moveEvent.clientX - startLeft),
                endTop = styleTop + (moveEvent.clientY - startTop);
            target.style.left = endLeft + 'px';
            target.style.top = endTop + 'px';
            this.moveNodeSort(target, endLeft, endTop);
        }
        document.addEventListener('mousemove', mousemoveFn);
    
        // 释放拖动的节点
        const mouseupFn = () => {
            // 因为移动的时候要保证移动位置，不能对当前节点排序，所有鼠标释放，进行下排序
            this.sortNode([target]);
            setTimeout(() => {target.removeAttribute('class')});
            // 这步可以不做，为了和谷歌一样，把dom也进行排序
            this.sortDom();
            document.removeEventListener('mousemove', mousemoveFn);
            document.removeEventListener('mouseup', mouseupFn);
        }
        document.addEventListener('mouseup', mouseupFn);
    }
    /**
     * 给每个节点进行一次排序
     * @param {Array} 元素节点数组
     */
    sortNode(nodeList:any[]) {
        nodeList.forEach((node:node) => {
            node.style.left = node.sort % this.nodeNumber * this.nodeWidth + 'px';
            node.style.top = Math.floor(node.sort / this.nodeNumber) * this.nodeHeight + 'px';
        })
    }
    /**
     * 计算出需要排序变化的节点，改变节点sort属性
     */
    moveNodeSort(dragNode:node, x:number, y:number) {
        // 元素移动：水平方向超过 nodeWidth 一半，算sort+1；垂直方向超过 nodeHeight 一半，算进入到下一排（sort + nodeNumber）
        var newSort = Math.round(y / this.nodeHeight) * this.nodeNumber + Math.round(x / this.nodeWidth);
        newSort = newSort > this.nodeList.length - 1 ? this.nodeList.length - 1 : newSort;
        newSort = newSort < 0 ? 0 : newSort;
        // 在移动过程中，当前节点sort没有改变，不需要重复计算排序。
        if (newSort !== this.index) {
        this.index = newSort;
        var oldSort = dragNode.sort;
        this.nodeList.forEach(node => {
            // 往前移动，老位置 - 新位置（包含）之间的所有节点，排序都加1
            if (newSort < oldSort) {
                if (node.sort >= newSort && node.sort < oldSort) node.sort++;
            } else {// 往后移动，老位置 - 新位置（包含）之间的所有节点，排序都减1
                if (node.sort <= newSort && node.sort > oldSort) node.sort--;
            }
        })
        // 给当前节点排序重新赋值，不要漏了这个
        dragNode.sort = newSort
        // 把除了当前节点的，所有节点都重新排序下位置
        this.sortNode(this.nodeList.filter(node => node!==dragNode));
        }
    }

    /**
     * 对DOM排序
     */
    sortDom() {
        let newSortWrap = document.createDocumentFragment();
        this.nodeList = [...this.el.children].sort((a,b) => a.sort - b.sort);
        this.nodeList.forEach(node => {
        newSortWrap.appendChild(node);
        });
        this.el.appendChild(newSortWrap);
    }
}

