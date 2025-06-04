let bOne = [],PhysicalIndex = 0;//这里是全局变量
//The physical simulation of the state of the object
let PhysicalSimulationOfStateOfObject = [];//这里记录每一个Object的物理模拟情况

/* 这个函数每帧都会调用以Object的数量次 */
function PhysicalAlgorithms(Object,className,GetObjectHeight){//GetObject
    //在这里进行物理算法的模拟PhysicalAlgorithms-function
    bOne.push({
        "Bool":true
    });
    
    if(bOne[PhysicalIndex].Bool){//这里只会执行一次
        //GetObject vs. bottom height
        // 获取元素底部到视口顶部的距离
        const ObjectBottomToViewportTop = Object.getBoundingClientRect().bottom;
        // 获取视口高度
        const viewportHeight = window.innerHeight;
        // 计算元素底部到视口底部的高度
        const DistanceToViewportBottom = viewportHeight - ObjectBottomToViewportTop - parseFloat(GetObjectHeight) / 2;//这里也要减去GetObjectHeight
        //GettargetElement(className) -> ObjectInstanceInterface.js
        
        //BLoop.push({
        //    "ObjectID":Object.Object_ID,//当前Object的ID
        //    "Bool":true
        //});
        let bEnterSimulation = false;
        PhysicalSimulationOfStateOfObject = JSON.parse(localStorage.getItem("PhysicalSimulationOfStateOfObject"));
        //console.log(Object.Object_ID)
        
        for (let i = 0; i < PhysicalSimulationOfStateOfObject.length; i++) {
            let item = PhysicalSimulationOfStateOfObject[i];
            if(item.ObjectID === Object.Object_ID){
                bEnterSimulation = item.PhysicsBool;//判断当前物体是否进入
                //if(JSON.parse(localStorage.getItem("Debug")))
                //console.log(`Object：${Object.Object_ID}Physical:${item.PhysicsBool}`);//打印Object物理模拟情况
            }
        }
        if(bEnterSimulation) {
            GettargetElement(className).style.top = "";
            GettargetElement(className).style.bottom = `${DistanceToViewportBottom}px`;//这里设置bottom的大小
            MainPhysicsSimulation(Object,PhysicalSimulationOfStateOfObject,DistanceToViewportBottom,className);//开始设置定时器，物理模拟
        }
        
        bOne[PhysicalIndex].Bool = false;//这里不要每帧更新
    }
    PhysicalIndex++;
}

function MainPhysicsSimulation(Object,PhysicalSimulationOfStateOfObject,DistanceToViewportBottom,className){
    let NewPhysicalSimulationOfStateOfObject = [];
    for (let i = 0; i < PhysicalSimulationOfStateOfObject.length; i++) {
        let item = PhysicalSimulationOfStateOfObject[i];
        if(item.ObjectID === Object.Object_ID){//这里的每一个Object都只有一次进入的机会
            NewPhysicalSimulationOfStateOfObject.push({
                "ObjectID":item.ObjectID,
                "PhysicsBool":false//模拟
            });
            if(JSON.parse(localStorage.getItem("Debug")))
                console.log(`Object：${item.ObjectID}已进入物理模拟!`);//打印Object物理模拟情况
            SDF(DistanceToViewportBottom,className,Object.Object_ID);
        }else{
            NewPhysicalSimulationOfStateOfObject.push({
                "ObjectID":item.ObjectID,
                "PhysicsBool":item.PhysicsBool//模拟
            });
        }
    }
    localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(NewPhysicalSimulationOfStateOfObject));//更新

    // ----------------------- 物理算法 ------------------------ //
    function SDF(Position,className,ObjectID) {
        let Object = GettargetElement(className).style;
        let G = 0.1; //初始下落速度
        let Index = 0,
            BoolLoop = false,
            bLoop = true,
            IndexS = 0;
        const LoopSdf = setInterval(function() {
            if (BoolLoop) {
                console.log("模拟完成");
                //GetObjectList
                let ObjectData = JSON.parse(localStorage.getItem("PhysicalSimulationOfStateOfObject")),
                NewPhysicalSimulationOfStateOfObject = [];
                
                for(let i=0; i<ObjectData.length; i++) {
                    NewPhysicalSimulationOfStateOfObject.push({
                        "ObjectID":ObjectData[i].ObjectID,
                        "PhysicsBool":ObjectID === ObjectData[i].ObjectID ? false : ObjectData[i].PhysicsBool//GetCurrentObjectID
                    });
                }
                //更新PhysicalSimulationOfStateOfObject->在物理模拟完成之后就会进行取消
                localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(NewPhysicalSimulationOfStateOfObject));
                clearInterval(LoopSdf);//解释主要循环
            }
            if (bLoop) {
                IndexS += IndexS ? IndexS/2 : 0.8;
                bLoop = false;
                Index = 0;
                const LoopE = setInterval(function() {
                    G *= 1.0055; //重力加速度
                    Position -= G;
                    Index++;
                    //console.log("G:"+Position);
                    Object.bottom = `${Position}px`;
                    if (Position < 0.3) {
                        clearInterval(LoopE);
                        if (Index <= 10) {
                            BoolLoop = true;
                        }
                        const LoopS = setInterval(function() {
                            //console.log(IndexS+":"+ Index);
                            Index = Index - IndexS;
                            G /= 1.0055; //弹力减速度
                            Position += G;
                            //console.log("F:"+Position);
                            Object.bottom = `${Position}px`;
                            if (Index <= 0) {
                                clearInterval(LoopS);
                                bLoop = true;
                            }
                        });
                    }
                });
            }
        });
    }
}