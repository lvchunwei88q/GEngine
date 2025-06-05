function ObjectInstanceInterface(){
    let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//Class

    GetObjectInstance.forEach((obj) => {
        obj.addEventListener("click", (e) => {
            let dataType = e.currentTarget.data_type;//Type
            let GetObjectInstanceID = e.currentTarget.Object_ID;//ID
            localStorage.setItem("ObjectInstanceID",JSON.stringify(GetObjectInstanceID));
            switch (dataType){
                case "Diamonds":SetObjectInstanceInterface("Diamonds");
                    break;
                case "Rotundity":SetObjectInstanceInterface("Rotundity");
                    break;
            }
        });
    });
}

const ObjectInstanceData = [//创建ObjectInstanceInterface时的parameter
    //对于Object的Type使用ObjectType进行区分
    // -------- Diamonds -------- //
    {
        "Name": "X",
        "Value": "100.0",
        "Id":"Diamonds_Size_X",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "Y",
        "Value": "100.0",
        "Id":"Diamonds_Size_Y",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "颜色",
        "Value": "#ffffff",
        "Id":"Diamonds_Color",
        "Type": "Color",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "位置_X",
        "Value": "200.0",
        "Id":"Diamonds_Position_X",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "位置_Y",
        "Value": "200.0",
        "Id":"Diamonds_Position_Y",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "模拟物理",
        "Value": "false",
        "Id":"Diamonds_Physics",
        "Type": "Bool",
        "ObjectType":"Diamonds"
    },
    {
        "Name": "层级",
        "Value": "1.0",
        "Id":"Diamonds_Level",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
    // -------- Rotundity -------- //
    {
        "Name": "半径",
        "Value": "100.0",
        "Id":"Rotundity_Size",
        "Type": "Value",
        "ObjectType":"Rotundity"
    },
    {
        "Name": "颜色",
        "Value": "#fff671",
        "Id":"Rotundity_Color",
        "Type": "Color",
        "ObjectType":"Rotundity"
    },
    {
        "Name": "位置_X",
        "Value": "200.O",
        "Id":"Rotundity_Position_X",
        "Type": "Value",
        "ObjectType":"Rotundity"
    },
    {
        "Name": "位置_Y",
        "Value": "200.0",
        "Id":"Rotundity_Position_Y",
        "Type": "Value",
        "ObjectType":"Rotundity"
    },
    {
        "Name": "模拟物理",
        "Value": "false",
        "Id":"Rotundity_Physics",
        "Type": "Bool",
        "ObjectType":"Rotundity"
    },
    {
        "Name": "层级",
        "Value": "1.0",
        "Id":"Rotundity_Level",
        "Type": "Value",
        "ObjectType":"Rotundity"
    },
]; 

function SetObjectInstanceInterface(DataType){
    const Container = document.getElementById('Main');
    const ObjectInstanceInterface = document.querySelectorAll('.ObjectInstanceInterface');
    if (ObjectInstanceInterface){//如果ObjectInstanceInterface界面存在则删除界面
        ObjectInstanceInterface.forEach((obj) => {
            obj.parentNode.removeChild(obj);//删除界面
        });
    }
    
    const ObjectInstance = document.createElement('div');
    
    ObjectInstance.className = 'ObjectInstanceInterface';//这里添加ObjectInstanceInterface
    
    for (let i =0; i < ObjectInstanceData.length ; i++){
        if(DataType === ObjectInstanceData[i].ObjectType){//所有的类型均一致
            let item = ObjectInstanceData[i];
            switch (item.Type){
                case "Value":
                    ObjectInstance.innerHTML += `
                        <div class="ObjectInstanceface">
                             <span>${item.Name}</span>
                             <input type="number" name="Value" id=${item.Id} value=${item.Value}>
                             <hr />
                        </div>`;
                    break;
                case "Bool":
                    ObjectInstance.innerHTML += `
                        <div class="ObjectInstanceface">
                             <span>${item.Name}</span>
                             <input type="checkbox" name="Value" id=${item.Id} value=${item.Value}>
                             <hr />
                        </div>`;
                    break;
                case "Button":
                    ObjectInstance.innerHTML += `
                        <div class="ObjectInstanceface">
                             <span>${item.Name}</span>
                             <input type="button" name="Button" id=${item.Id} value=${item.Value}>
                             <hr />
                        </div>`;
                    break;
                case "Color":
                    ObjectInstance.innerHTML += `
                        <div class="ObjectInstanceface">
                             <span>${item.Name}</span>
                             <input type="color" name="Color" id=${item.Id} value=${item.Value}>
                             <hr />
                        </div>`;
                    break;
            }
        }
    }
    Container.appendChild(ObjectInstance);//AddObjectInstance
    let Size = [],Color,SizeRotundity,Position = [],Physics,ZIndex;
    //GetObjectCurrentValue
    switch (DataType){
        case "Diamonds":
                //Size = document.getElementById("Diamonds_Size").value;
            document.getElementById("Diamonds_Size_X").value = parseFloat(ObjectInstanceInterfaceInitialValue("Size")[0].X);//转换为float
                //Size = document.getElementById("Diamonds_Size").value;
            document.getElementById("Diamonds_Size_Y").value = parseFloat(ObjectInstanceInterfaceInitialValue("Size")[0].Y);//转换为float
            document.getElementById("Diamonds_Color").value = ObjectInstanceInterfaceInitialValue("Color");
                //Position = document.getElementById("Diamonds_Position").value;
            document.getElementById("Diamonds_Position_X").value = parseFloat(ObjectInstanceInterfaceInitialValue("Position")[0].X);//转换为float
                //Position = document.getElementById("Diamonds_Position").value;
            document.getElementById("Diamonds_Position_Y").value = parseFloat(ObjectInstanceInterfaceInitialValue("Position")[0].Y);//转换为float
            document.getElementById("Diamonds_Physics").checked = ObjectInstanceInterfaceInitialValue("Physics");
            document.getElementById("Diamonds_Level").value = ObjectInstanceInterfaceInitialValue("Level");
            break;
        case "Rotundity":
            document.getElementById("Rotundity_Size").value = parseFloat(ObjectInstanceInterfaceInitialValue("Size")[0].X);//转换为float
            document.getElementById("Rotundity_Color").value = ObjectInstanceInterfaceInitialValue("Color");
            document.getElementById("Rotundity_Position_X").value = parseFloat(ObjectInstanceInterfaceInitialValue("Position")[0].X);//转换为float
            document.getElementById("Rotundity_Position_Y").value = parseFloat(ObjectInstanceInterfaceInitialValue("Position")[0].Y);//转换为float
            document.getElementById("Rotundity_Physics").checked = ObjectInstanceInterfaceInitialValue("Physics");
            document.getElementById("Rotundity_Level").value = ObjectInstanceInterfaceInitialValue("Level");
            break;
    }
    
    ////在界面完成加载后为当前实例的Object设置addEventListener
    
    switch (DataType){
        case "Diamonds":
            document.getElementById("Diamonds_Size_X").addEventListener("input", (e) => {
                //Size = document.getElementById("Diamonds_Size").value;
                Size.push({
                    "X":document.getElementById("Diamonds_Size_X").value,
                    "Y":document.getElementById("Diamonds_Size_Y").value
                });
                ObjectInstanceInterfaceaddEventListener(Size,"Size");
                Size = [];
            });
            document.getElementById("Diamonds_Size_Y").addEventListener("input", (e) => {
                //Size = document.getElementById("Diamonds_Size").value;
                Size.push({
                    "X":document.getElementById("Diamonds_Size_X").value,
                    "Y":document.getElementById("Diamonds_Size_Y").value
                })
                ObjectInstanceInterfaceaddEventListener(Size,"Size");
                Size = [];
            });
            document.getElementById("Diamonds_Color").addEventListener("input", (e) => {
                Color = document.getElementById("Diamonds_Color").value;
                ObjectInstanceInterfaceaddEventListener(Color,"Color");
            });
            document.getElementById("Diamonds_Position_X").addEventListener("input", (e) => {
                //Position = document.getElementById("Diamonds_Position").value;
                Position.push({
                    "X":document.getElementById("Diamonds_Position_X").value,
                    "Y":document.getElementById("Diamonds_Position_Y").value
                })
                ObjectInstanceInterfaceaddEventListener(Position,"Position");
                Position = [];
            });
            document.getElementById("Diamonds_Position_Y").addEventListener("input", (e) => {
                //Position = document.getElementById("Diamonds_Position").value;
                Position.push({
                    "X":document.getElementById("Diamonds_Position_X").value,
                    "Y":document.getElementById("Diamonds_Position_Y").value
                })
                ObjectInstanceInterfaceaddEventListener(Position,"Position");
                Position = [];
            });
            document.getElementById("Diamonds_Physics").addEventListener("input", (e) => {
                Physics = document.getElementById("Diamonds_Physics").checked;
                ObjectInstanceInterfaceaddEventListener(Physics,"Physics");
            });
            document.getElementById("Diamonds_Level").addEventListener("input", (e) => {
                ZIndex = document.getElementById("Diamonds_Level").value;
                ObjectInstanceInterfaceaddEventListener(ZIndex,"Level");
            });
            break;
        case "Rotundity":
            document.getElementById("Rotundity_Size").addEventListener("input", (e) => {
                SizeRotundity = document.getElementById("Rotundity_Size").value;
                ObjectInstanceInterfaceaddEventListener(SizeRotundity,"Size");
            });
            document.getElementById("Rotundity_Color").addEventListener("input", (e) => {
                Color = document.getElementById("Rotundity_Color").value;
                ObjectInstanceInterfaceaddEventListener(Color,"Color");
            });
            document.getElementById("Rotundity_Position_X").addEventListener("input", (e) => {
                //Position = document.getElementById("Diamonds_Position").value;
                Position.push({
                    "X":document.getElementById("Rotundity_Position_X").value,
                    "Y":document.getElementById("Rotundity_Position_Y").value
                })
                ObjectInstanceInterfaceaddEventListener(Position,"Position");
                Position = [];
            });
            document.getElementById("Rotundity_Position_Y").addEventListener("input", (e) => {
                //Position = document.getElementById("Diamonds_Position").value;
                Position.push({
                    "X":document.getElementById("Rotundity_Position_X").value,
                    "Y":document.getElementById("Rotundity_Position_Y").value
                })
                ObjectInstanceInterfaceaddEventListener(Position,"Position");
                Position = [];
            });
            document.getElementById("Rotundity_Physics").addEventListener("input", (e) => {
                Physics = document.getElementById("Rotundity_Physics").checked;
                ObjectInstanceInterfaceaddEventListener(Physics,"Physics");
            });
            document.getElementById("Rotundity_Level").addEventListener("input", (e) => {
                ZIndex = document.getElementById("Rotundity_Level").value;
                ObjectInstanceInterfaceaddEventListener(ZIndex,"Level");
            });
            break;
    }
}

function ObjectInstanceInterfaceaddEventListener(Parameter,Type,bHighPhysics){
    let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//Class
    
    GetObjectInstance.forEach((obj) => {
        if (obj.Object_ID === JSON.parse(localStorage.getItem("ObjectInstanceID"))) {//判断ObjectInstance
            const ObjectPhysicsID = JSON.parse(localStorage.getItem("ObjectPhysicsID"));
            if(ObjectPhysicsID)//ObjectPhysicsID
            for (let i=0; i < ObjectPhysicsID.length; i++){
                let item = ObjectPhysicsID[i];
                if(obj.Object_ID === item.ObjectID && item.PhysicsBool === false){//这里判断Object是否正在进行物理模拟
                    ShowToast("这个Object正在进行物理模拟!","warning");
                    return;//阻断
                }
            }
            let dataType = obj.data_type;//GetObjectType
            switch (dataType){
                case "Diamonds":addEventListenerDiamonds(obj,Parameter,Type,bHighPhysics);
                    break;
                case "Rotundity":addEventListenerRotundity(obj,Parameter,Type,bHighPhysics);
                    break;
            }
        }
    });
    
    function addEventListenerDiamonds(obj,Parameter,Type){
        let className = `Diamonds_${obj.Object_ID}`;
        switch (Type){
            case "Color":
                GettargetElement(className).style.background = Parameter;
                break;
            case "Size":
                if(JSON.parse(localStorage.getItem("Debug")))
                    console.log("Diamonds_Height:" + GettargetElement(className).style.height +
                                "Diamonds_Width:" + GettargetElement(className).style.width);//使用Debug控制打印
                GettargetElement(className).style.height = `${Parameter[0].Y}px`;
                GettargetElement(className).style.width = `${Parameter[0].X}px`;
                break;
            case "Position":
                if(JSON.parse(localStorage.getItem("Debug")))
                    console.log("Diamonds_Position_X:" + GettargetElement(className).style.top +
                        "Diamonds_Position_Y:" + GettargetElement(className).style.left);//使用Debug控制打印
                GettargetElement(className).style.left = `${Parameter[0].X}px`;
                GettargetElement(className).style.top = `${Parameter[0].Y}px`;
                break;
            case "Physics":
                obj.Physics = Parameter;
                PhysicsSimulation(obj.Object_ID,obj.Physics);//这个函数会将所有要模拟的物体全部封装并初始化
                break;
            case "Level"://Z-index
                GettargetElement(className).style.zIndex = Parameter;
                break;    
        }
    }
    
    function addEventListenerRotundity(obj,Parameter,Type){
        let className = `Rotundity_${obj.Object_ID}`;
        //const computedStyle = window.getComputedStyle(GettargetElement(className));//只读
        switch (Type){
            case "Color":
                GettargetElement(className).style.background = Parameter;
                break;
            case "Size":
                if(JSON.parse(localStorage.getItem("Debug")))
                    console.log("Rotundity_Height:" + GettargetElement(className).style.height +
                        "Rotundity_Width:" + GettargetElement(className).style.width);//使用Debug控制打印
                GettargetElement(className).style.height = `${Parameter}px`;
                GettargetElement(className).style.width = `${Parameter}px`;
                break;
            case "Position":
                if(JSON.parse(localStorage.getItem("Debug")))
                    console.log("Rotundity_Position_X:" + GettargetElement(className).style.top +
                        "Rotundity_Position_Y:" + GettargetElement(className).style.left);//使用Debug控制打印
                GettargetElement(className).style.left = `${Parameter[0].X}px`;
                GettargetElement(className).style.top = `${Parameter[0].Y}px`;
                break;
            case "Physics":
                obj.Physics = Parameter;
                PhysicsSimulation(obj.Object_ID,obj.Physics);//这个函数会将所有要模拟的物体全部封装并初始化
                break;
            case "Level"://Z-index
                GettargetElement(className).style.zIndex = Parameter;
                break;    
        }
    }
}

function ObjectInstanceInterfaceInitialValue(Type){
    let GetObjectInstance = document.querySelectorAll(".ObjectInstance");//Class
    let Value,ValueArray = [];
    
    GetObjectInstance.forEach((obj) => {
        if (obj.Object_ID === JSON.parse(localStorage.getItem("ObjectInstanceID"))) {//判断ObjectInstance
            let dataType = obj.data_type;//GetObjectType
            switch (dataType){
                case "Diamonds":addEventListenerDiamonds(obj,Type);
                    break;
                case "Rotundity":addEventListenerRotundity(obj,Type);
                    break;
            }
        }else{
            let dataType = obj.data_type;//GetObjectType
            switch (dataType){
                case "Diamonds":DetractSelection(obj,"Diamonds");
                    break;
                case "Rotundity":DetractSelection(obj,"Rotundity");
                    break;
            }
        }
    });

    function DetractSelection(obj,Type){
        let className = `${Type}_${obj.Object_ID}`;
        GettargetElement(className).style.border = "rgba(0,0,0,0) 3px solid";
    }

    function addEventListenerDiamonds(obj,Type){
        let className = `Diamonds_${obj.Object_ID}`;
        GettargetElement(className).style.border = "rgba(255,85,0,255) 3px solid";
        const computedStyle = window.getComputedStyle(GettargetElement(className));
        switch (Type){
            case "Color":
                Value = computedStyle.background.split(")")[0] + ")"; // 提取 "rgb(255, 255, 255)"
                Value = RgbToHex(Value);//Convert
                if (JSON.parse(localStorage.getItem("Debug")))
                     console.log(GettargetElement(className).background);
                break;
            case "Size":
                if (JSON.parse(localStorage.getItem("Debug")))
                     console.log(computedStyle.width + computedStyle.height);
                ValueArray.push({
                    "X":computedStyle.width,
                    "Y":computedStyle.height
                });
                break;
            case "Position":
                if (JSON.parse(localStorage.getItem("Debug")))
                    console.log(computedStyle.top);//使用Debug的localStorage打印margin
                //Value = computedStyle.margin;
                //const values = computedStyle.margin.split(" ").filter(Boolean); // 按空格拆分，并过滤空字符串
                ValueArray.push({
                    "X":computedStyle.left,
                    "Y":computedStyle.top
                });
                break;
            case "Physics":
                Value = obj.Physics;//GetPhysicsBool
                break;
            case "Level"://Z-index
                Value = computedStyle.zIndex;
                break;
        }
    }

    function addEventListenerRotundity(obj,Type){
        let className = `Rotundity_${obj.Object_ID}`;
        GettargetElement(className).style.border = "rgba(255,85,0,255) 3px solid";
        const computedStyle = window.getComputedStyle(GettargetElement(className));
        switch (Type){
            case "Color":
                Value = computedStyle.background.split(")")[0] + ")"; // 提取 "rgb(255, 255, 255)"
                Value = RgbToHex(Value);//Convert
                if (JSON.parse(localStorage.getItem("Debug")))
                    console.log(GettargetElement(className).background);
                break;
            case "Size":
                //Value = computedStyle.width + computedStyle.height;
                if (JSON.parse(localStorage.getItem("Debug")))
                    console.log(computedStyle.width + ":" + computedStyle.height);
                ValueArray.push({
                    "X":computedStyle.width,
                    "Y":computedStyle.height
                });
                break;
            case "Position":
                if (JSON.parse(localStorage.getItem("Debug")))
                    console.log(computedStyle.top);//使用Debug的localStorage打印margin
                //Value = computedStyle.margin;
                //const values = computedStyle.margin.split(" ").filter(Boolean); // 按空格拆分，并过滤空字符串
                ValueArray.push({
                    "X":computedStyle.left,
                    "Y":computedStyle.top
                });
                break;
            case "Physics":
                Value = obj.Physics;//GetPhysicsBool
                break;
            case "Level"://Z-index
                Value = computedStyle.zIndex;
                break;    
        }
    }
    if (Type !== "Size" && Type !== "Position")
        return Value;
    else
        return ValueArray;
}

function GettargetElement(className){//输入特定的ClassName返回Css元素
    // 获取元素
    const targetElement = document.querySelector(`.${className}`);
    if (targetElement) {
        return targetElement;
    } else {
        console.error('元素未找到');
    }
}