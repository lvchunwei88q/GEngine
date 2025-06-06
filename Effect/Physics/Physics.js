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

                // 获取元素底部到视口顶部的距离
                const ObjectBottomToViewportTop = obj.getBoundingClientRect().bottom;
                // 获取视口高度
                const viewportHeight = window.innerHeight;
                // 计算元素底部到视口底部的高度
                const DistanceToViewportBottom = viewportHeight - ObjectBottomToViewportTop - parseFloat(GettargetElement(ClassName).style.top) / 2;//这里也要减去GetObjectHeight
                
                ObjectPhysicsID.push({
                    "ObjectID":Object_ID,
                    "top":GettargetElement(ClassName).style.top//Get->top
                });

                GettargetElement(ClassName).style.top = "";//清除top
                GettargetElement(ClassName).style.bottom = `${DistanceToViewportBottom}px`;
            }
        });
        console.log(JSON.stringify(ObjectPhysicsID));
        localStorage.setItem("ObjectPhysicsID",JSON.stringify(ObjectPhysicsID));//这里记录了所有的ObjectPhysicsID
        
        //TickPhysicalSimulationOfStateOfObject()//每次点击时判断
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
        
        //TickPhysicalSimulationOfStateOfObject()//每次点击时判断
    }
    if (JSON.parse(localStorage.getItem("ObjectPhysicsID")).length) {
        localStorage.setItem("Physics",JSON.stringify(true));
    }else{
        if(JSON.parse(localStorage.getItem("Debug")))
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
                    /* 每一帧都会遍历所有的Object */
                }
            }
        });
    }
    function PhysicalNone(){//关闭物理模拟时调用
        
    }
}
// ----- End!