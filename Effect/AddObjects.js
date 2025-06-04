function BindClickEvent(Diamonds,Rotundity){
    let ObjectEnum;
    // 为所有的GEngine的模型枚举添加绑定事件
    Diamonds.addEventListener("click", function(){
        ObjectEnum = "Diamonds";
        AddObject(ObjectEnum);
    });
    Rotundity.addEventListener("click", function(){
        ObjectEnum = "Rotundity";
        AddObject(ObjectEnum);
    });
}

function AddObject(ObjectEnum) {
    const Object = document.createElement('div');//创建一个DIV的基础样式
    Object.className = 'ObjectInstance';
    let random;//使用随机数生成ObjectID
    if(!JSON.parse(localStorage.getItem("ObjectID"))){
        let ObjectID = [{"Id":0,}];//SetObjectID
        localStorage.setItem("ObjectID",JSON.stringify(ObjectID));//这里设置第一个Object的ID
        console.log("AddOneObject!");
        random = 0;
        if(JSON.parse(localStorage.getItem("Debug")))
        console.log("ObjectID:" + random);//使用Debug控制打印
        Object.Object_ID = random;
    }else{//当场景中已有Object时
        let ObjectID = JSON.parse(localStorage.getItem("ObjectID"));
        let ObjectIDLoop = true;
        while (ObjectIDLoop){
            ObjectIDLoop = false;
            random = Math.floor(Math.random() * 10000) + 1;
            
            for(let i=0; i<ObjectID.length; i++){
                let item = ObjectID[i].Id;
                if(item == random){
                    ObjectIDLoop = true;
                }
            }
        }
        ObjectID.push({Id:random});//添加ObjectID
        localStorage.setItem("ObjectID",JSON.stringify(ObjectID));
        if(JSON.parse(localStorage.getItem("Debug")))
        console.log("ObjectID:" + random);//使用Debug控制打印
        Object.Object_ID = random;
    }
    // 使用函数生成 CSS
    const StyleTag = document.createElement('style');
    StyleTag.textContent = GenerateCSS(ObjectEnum, random);
    document.head.appendChild(StyleTag);
    
    switch (ObjectEnum) {
        case "Diamonds":Diamonds(Object,random);
            break;
        case "Rotundity":Rotundity(Object,random);
            break;
    }

    //为了使用物理模拟去掉top属性在内联样式里Add->top
    let ClassName = `${ObjectEnum}_${random}`;
    //GettargetElement(className) -> ObjectInstanceInterface.js
    GettargetElement(ClassName).style.top = "200px";//内联

    let GetAllObject = document.querySelectorAll(".ObjectInstance");//GetAllObject
    let ObjectIndex = 0;
    
    GetAllObject.forEach((obj) => {
        ObjectIndex = ObjectIndex + 1;
        obj.addEventListener("click", (e) => {
            ObjectInstanceInterface();//在点击事件里为每一个Object添加ObjectInstanceInterface
            //ObjectInstanceInterfaceaddEventListener();//在界面完成加载后为当前实例的Object设置addEventListener
        });
    });
    console.log("ObjectNum:" + ObjectIndex);
    
    function Diamonds(Object,ObjectID){
        Object.data_type = 'Diamonds';
        Object.innerHTML = `
           <div class="Diamonds_${ObjectID}">
           </div>
        `;
        const container = document.getElementById('Main');
        container.appendChild(Object);
        ShowToast("已添加一个方块!","success",1000);
    }
    function Rotundity(Object,ObjectID){
        Object.data_type = 'Rotundity';
        Object.innerHTML = `
           <div class="Rotundity_${ObjectID}">
           </div>
        `;
        const container = document.getElementById('Main');
        container.appendChild(Object);
        ShowToast("已添加一个圆形!","success",1000);
    }
}

function GenerateCSS(ObjectType,ObjectID) {
    return `
    .${ObjectType}_${ObjectID} {
      background: #ffffff;
      position: absolute;
      width: 100px;
      height: 100px;
      left: 200px;
      border: #00ffff 3px solid;
      border-radius: ${ObjectType === "Rotundity"  ? 100 : 0}%;
      z-index: 1;
    }`;
}
//border: #00ffff 3px solid;是为了在User选中Object时高亮此Object
//#00ffff表示用户新建的Object
//z-index在物体重合时进行的设定-默认为1