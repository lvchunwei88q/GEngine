function PhysicsSimulation(Object_ID,Bool){
    let ObjectPhysicsID = [];
    if (JSON.parse(localStorage.getItem("ObjectPhysicsID"))){
        ObjectPhysicsID = JSON.parse(localStorage.getItem("ObjectPhysicsID"));
    }
    if(Bool){
        ShowToast(`Object:${Object_ID}开启物理模拟!`,"success",2000);
        //写入Object的top
        let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//这里只有在开启物理模拟时才会调用

        GetObjectInstance.forEach((obj)=>{
            if (obj.Object_ID === Object_ID){
                let ClassName = `${obj.data_type}_${obj.Object_ID}`;
                //GettargetElement(className) -> ObjectInstanceInterface.js
                
                ObjectPhysicsID.push({
                    "ObjectID":Object_ID,
                    "top":GettargetElement(ClassName).style.top//Get->top
                });
            }
        });
        console.log(JSON.stringify(ObjectPhysicsID));
        localStorage.setItem("ObjectPhysicsID",JSON.stringify(ObjectPhysicsID));//这里记录了所有的ObjectPhysicsID
        
        TickPhysicalSimulationOfStateOfObject()//每次点击时判断
    }else{
        ShowToast(`Object:${Object_ID}关闭物理模拟!`,"success",2000);
        let ObjectPhysicsIDArray = [];
        let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//调用此函数GetClass
        for (let i=0; i < ObjectPhysicsID.length; i++){
            if(ObjectPhysicsID[i].ObjectID !== Object_ID){
                GetObjectInstance.forEach((obj)=>{
                    if(obj.Object_ID === Object_ID){//找到关闭物理模拟的Object
                        let ClassName = `${obj.data_type}_${obj.Object_ID}`;
                        ObjectPhysicsIDArray.push({
                            "ObjectID":ObjectPhysicsID[i].ObjectID,
                            "top":GettargetElement(ClassName).style.top//Get->top
                        });
                    }
                });
            }else{//这里就是关闭模拟的Object
                GetObjectInstance.forEach(obj => {
                    if(obj.Object_ID === Object_ID){//找到关闭物理模拟的Object
                        for (let j=0; j<ObjectPhysicsID.length; j++){
                            if(ObjectPhysicsID[i].ObjectID === Object_ID){
                                let ClassName = `${obj.data_type}_${obj.Object_ID}`;
                                //GettargetElement(className) -> ObjectInstanceInterface.js
                                GettargetElement(ClassName).style.top = ObjectPhysicsID[i].top//这里写入之前保存的top
                                GettargetElement(ClassName).style.bottom = "";//这里需要去除bottom
                            }
                        }
                    }
                });
            }
        }
        console.log(JSON.stringify(ObjectPhysicsIDArray));
        localStorage.setItem("ObjectPhysicsID",JSON.stringify(ObjectPhysicsIDArray));
        
        TickPhysicalSimulationOfStateOfObject()//每次点击时判断
    }
    if (JSON.parse(localStorage.getItem("ObjectPhysicsID")).length) {
        localStorage.setItem("Physics",JSON.stringify(true));
    }else{
        ShowToast(`检测到所有物体已关闭物理模拟!`,"success",3000);
        localStorage.setItem("Physics",JSON.stringify(false));
    }
}

function Physics(){
    if (JSON.parse(localStorage.getItem("Physics"))){
        PhysicsHas();//模拟
        FPhysicsFrameTick();//只有模拟的时候才调用
    }else{
        PhysicalNone();//不模拟
        FPhysicsFrameTick();//只有模拟的时候才调用
    }

    function PhysicsHas(){//开始物理模拟时调用
        let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//每帧调用->将top设置为Null

        GetObjectInstance.forEach((obj)=>{
            let ObjectPhysicsID = JSON.parse(localStorage.getItem("ObjectPhysicsID"));
            for (let i=0; i < ObjectPhysicsID.length; i++){
                if (ObjectPhysicsID[i].ObjectID === obj.Object_ID){
                    let dataType = obj.data_type;//GetObjectType
                    let className = `${dataType}_${obj.Object_ID}`;//GetclassName
                    //GettargetElement(className) -> ObjectInstanceInterface.js
                    let GetObjectHeight = ObjectPhysicsID[i].top;
                    //console.log(obj.Object_ID);Debug
                    
                    PhysicalAlgorithms(obj,className,GetObjectHeight);//物理模拟函数-传入Obj
                    bOne = [];PhysicalIndex = 0;//这里需要重置
                }
            }
        });
    }

    function PhysicalNone(){//关闭物理模拟时调用
        
    }
}

function TickPhysicalSimulationOfStateOfObject(){//每用户点击时会对Object进行检测
    //当前物体模拟判断->物理模拟 - 为了动态变化需要每帧获取物体以应对更新的物体
    if(!JSON.parse(localStorage.getItem("PhysicalSimulationOfStateOfObject"))){
        //如果PhysicalSimulationOfStateOfObject没有值直接赋值
        let ObjectPhysicsID = JSON.parse(localStorage.getItem("ObjectPhysicsID")),ObjectPhysics = [];
        for (let i=0; i < ObjectPhysicsID.length; i++){
            ObjectPhysics.push({
                "ObjectID":ObjectPhysicsID[i].ObjectID,
                "PhysicsBool":true//因为是初始赋值所以直接都要模拟
            });
        }
        localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(ObjectPhysics));//保存
        if(JSON.parse(localStorage.getItem("Debug"))){
            console.log("初始赋值已完成！");//这里只是初始赋值接下来需要每帧判断是否有新加入的Object
        }
    }
    
    let ObjectPhysicsID = JSON.parse(localStorage.getItem("ObjectPhysicsID")),ObjectPhysics = [];//GetObjectPhysicsID
    ObjectPhysics = JSON.parse(localStorage.getItem("PhysicalSimulationOfStateOfObject"));//GetPhysicalSimulationOfStateOfObject
    for (let i=0; i < ObjectPhysicsID.length; i++){
        let item = ObjectPhysicsID[i],Index = 0;
        for (let j=0; j<ObjectPhysics.length; j++){//两次循环判断是否有值更新
            if(item.ObjectID === ObjectPhysics[j].ObjectID){
                Index = 1;//如果相符就设置为1否则为0
            }
        }
        if(Index === 1)continue;//如果符合则跳过
        if(ObjectPhysics.length < ObjectPhysicsID.length){//这里是每帧判断所以这种方法完全可行
            if(Index !== 1){//说明没有对应的Object-add
                ObjectPhysics.push({
                    "ObjectID":ObjectPhysicsID[i].ObjectID,
                    "PhysicsBool":true//新加的Object需要进行模拟
                });
                localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(ObjectPhysics));
                //console.log(localStorage.getItem("PhysicalSimulationOfStateOfObject"));
                if(JSON.parse(localStorage.getItem("Debug"))){
                    console.log("ObjectPhysics:"+ObjectPhysics.length);
                }
            }
        }else{//因为每帧只可能去掉一个所以不用递归-这里只可能是减去->ObjectPhysics.length < ObjectPhysicsID.length
            let NewObjectPhysics = [];
            if(ObjectPhysicsID === []){//这里判断ObjectPhysics的数量是否为0
                localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(NewObjectPhysics));
            }else{
                for (let x=0; x < ObjectPhysicsID.length; x++){//ObjectPhysicsID是已经被更新过的
                    let Bool,items = ObjectPhysicsID[x];
                    for(let j=0; j<ObjectPhysics.length; j++){
                        if (items.ObjectID === ObjectPhysics[j].ObjectID){
                            Bool = ObjectPhysics[j].PhysicsBool;
                            NewObjectPhysics.push({
                                "ObjectID":items.ObjectID,
                                "PhysicsBool":Bool//模拟
                            });
                        }
                    }
                }
                localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(NewObjectPhysics));
            }
            if(JSON.parse(localStorage.getItem("Debug"))){
                console.log("ObjectPhysics:"+ObjectPhysics.length);
            }
        }
    }
}

// ----- End!