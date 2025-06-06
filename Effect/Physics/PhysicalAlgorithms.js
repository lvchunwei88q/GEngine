//let bOne = [],PhysicalIndex = 0;//这里是全局变量
//The physical simulation of the state of the object

/* 这个函数每帧都会调用以Object的数量次 */
function PhysicalAlgorithms(Object,className,GetObjectHeight) {//GetObject
    //在这里进行物理算法的模拟PhysicalAlgorithms-function
    //当前的Object
    let GetObjectPostion = [];
    let GetObjectWH = [];
    const computedStyle = window.getComputedStyle(GettargetElement(className));//GetClass

    GetObjectPostion.push({//GetObjectPostion
        "X":parseFloat(computedStyle.left),
        "Y":parseFloat(computedStyle.top),
    });
    GetObjectWH.push({//GetObjectWH
        "X":parseFloat(computedStyle.width),
        "Y":parseFloat(computedStyle.height),
    });
    
    if(JSON.parse(localStorage.getItem("Debug")))//每帧遍历Object->这里的Object就是模拟物理的
        console.log(`${Object.Object_ID}ObjectPostion:`+GetObjectPostion[0].X + ":" +GetObjectPostion[0].Y+"-"
         +`${Object.Object_ID}GetObjectWH:`+GetObjectWH[0].X+ ":" +GetObjectWH[0].Y);
    //这里按照重力加速度还需要计算碰撞
    SDFAA(className,Object,GetObjectPostion);
}

function SDFAA(className,Object,GetObjectPostion) {
    const Currentelement = GettargetElement(className);
    if (!Currentelement) return;
    
    //碰撞体计算
    let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//获取所有的Object实例
    GetObjectInstance.forEach((obj)=>{
        if (obj.Object_ID !== Object.Object_ID){//如果是自己直接跳过
            const Classname = `${obj.data_type}_${obj.Object_ID}`;//GetclassName
            const Element = GettargetElement(Classname);
            const ElementStyle = window.getComputedStyle(Element);
            const CurrentelementStyle = window.getComputedStyle(Currentelement);
            let aPostion = [],bPostion = [];

            aPostion.push({
                "x":GetObjectPostion[0].X,
                "y":GetObjectPostion[0].Y,
            });
            bPostion.push({
                "x":parseFloat(ElementStyle.left),
                "y":parseFloat(ElementStyle.top),
            });

            const Bool = CalculateObjectSpacing(CurrentelementStyle.width,CurrentelementStyle.height,
                ElementStyle.width,ElementStyle.height,aPostion,bPostion);
            
            if(Bool){
                //alert();//CS
            }
        }
    });
    
    if(parseFloat(Currentelement.style.bottom) > 0){
        Currentelement.style.bottom = `${parseFloat(Currentelement.style.bottom) - 1}px`;
    }
}