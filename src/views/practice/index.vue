<template>
<div class="practice">
    <div class="title">三角形</div>
    <div id="triangle"></div>
    <div class="title">多列等高用padding+margin</div>
    <div class="same-height">
        <div class="container">  
            <div class="left">left</div>  
            <div contenteditable="true" class="right">right right right right right right right right right right right right right right right right right right right right right right right right right right right</div>  
        </div> 
    </div>
    <div class="title">多列等高-用flex</div>
    <div class="same-height2">
        <div class="container">  
            <div class="left">left</div>  
            <div contenteditable="true" class="right">right right right right right right right right right right right right right right right right right right right right right right right right right right right</div>  
        </div> 
    </div>
    <div class="title">高度塌陷</div>
    <div class="height-collapse">
        <div class="div1"></div>
        <div class="div2"></div>
    </div>
</div>
  
</template>
<script setup lang='ts'>
</script>
<style lang='scss' scoped>
.practice{
    display: flex;
    flex-direction: column;
    .title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e8e8e8;
        margin: 4px 0;
        font-weight: 600;
    }
}
#triangle {  
    /*1.内容区面积为0*/  
    width: 0;  
    height: 0;  
    /*2.设置边框样式*/  
    border: 10px solid;  
    border-color: white white red white;  
} 
.same-height{
    .container{   
        margin:0 auto;   
        width:300px;   
        border:1px solid #00C;  
        overflow:hidden;
        box-sizing: content-box;
    }  
    .left{   
        float:left;   
        width:150px;   
        background:#B0B0B0;  
        padding-bottom:2000px;  
        margin-bottom:-2000px;  
    }  
    .right{   
        float:left;   
        width:150px;   
        background:#6CC;  
        padding-bottom:2000px;  
        margin-bottom:-2000px;  
    }
}
.same-height2{
    .container{   
        margin:0 auto;   
        width:300px;   
        border:1px solid #00C;  
        box-sizing: content-box;
        display: flex;
    }  
    .left{   
        float:left;   
        width:150px;   
        background:#B0B0B0;  
    }  
    .right{   
        float:left;   
        width:150px;   
        background:#6CC;  
    }
}
.height-collapse{
    border:1px solid#00C;
    .div1{
        width: 100px;
        height:100px;
        margin-bottom:10px;
        background-color: #6CC;
    }
    .div2{
        width: 100px;
        height:100px;
        margin-top:10px;
        background-color: rgb(102, 109, 204);
    }
}
</style>