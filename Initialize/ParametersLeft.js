const MessageJson = [
    {
        "Name": "显示帧率",
        "Value": "true",
        "Id":"FrameRateBool",
        "Type": "Bool"
    },
    {
        "Name": "方块",
        "Id":"Diamonds",
        "Type": "Button"
    },
    {
        "Name": "圆形",
        "Id":"Rotundity",
        "Type": "Button"
    },
    {
        "Name": "Debug",
        "Value": "false",
        "Id":"DebugBool",
        "Type": "Bool"
    },
    {
        "Name": "背景颜色",
        "Value": "#000000",
        "Id":"Background_Color",
        "Type": "Color",
    },
];

const WorldPhysicsSettings = [//物理设置
    {
        "Name": "HighPhysics",
        "Value": "false",
        "Id":"bHighPhysics",
        "Type": "Bool"
    },
    {
        "Name": "G加速度",
        "Value": "1.0",
        "Id":"GravitationalAcceleration",
        "Type": "Value",
        "ObjectType":"Diamonds"
    },
];

function ParametersLeft(Index){//初始化All面板
    switch(Index){
        case 0:WorldCommon();//Common
            break;
        case 1:WorldPhysics();//Physics
            break;
    }
}

function WorldCommon(){
    //创建元素
    const MainDiv = document.createElement('div');//主要的基础界面
    MainDiv.className = 'Main_LeftDiv';
    const LeftDiv = document.createElement('div');
    LeftDiv.className = 'LeftDiv';
    for (let i=0; i<MessageJson.length; i++){
        let item = MessageJson[i];
        AddWorldParametersLeft(LeftDiv,item);
    }
    const container = document.getElementById('Main');
    container.appendChild(MainDiv);
    const MainDiClass = document.querySelectorAll(".Main_LeftDiv");
    MainDiClass[0].appendChild(LeftDiv);
}
function WorldPhysics(){
    //创建元素
    const LeftDiv = document.createElement('div');
    LeftDiv.className = 'LeftDiv_Physics';
    LeftDiv.innerHTML += `
      <div style = "height: 5px;width: 100%;float: left;"></div>
    `;//这里是为了有一个间隔
    
    for (let i=0; i<WorldPhysicsSettings.length; i++){
        let item = WorldPhysicsSettings[i];
        AddWorldParametersLeft(LeftDiv,item);
    }
    const MainDiClass = document.querySelectorAll(".Main_LeftDiv");
    MainDiClass[0].appendChild(LeftDiv);
}

function AddWorldParametersLeft(LeftDiv,item){
    switch (item.Type) {
        case 'Value':
            LeftDiv.innerHTML += `
                      <div class="LeftDivNode">
                          <span>${item.Name}</span>
                          <input type="number" name="Value" id=${item.Id} value=${item.Value}>
                          <hr />
                      </div>
                     `;
            break;
        case 'Bool':
            LeftDiv.innerHTML += `
                      <div class="LeftDivNode">
                          <span>${item.Name}</span>
                          <input type="checkbox" name="Bool" id=${item.Id} ${item.Value === "true" ? "checked" : ""}>
                          <hr />
                      </div>
                     `;
            break;
        case 'Button':
            LeftDiv.innerHTML += `
                      <div class="LeftDivNode">
                          <span>${item.Name}</span>
                          <input type="button" name="Button" id=${item.Id}>
                          <hr />
                      </div>
                     `;
            break;
        case 'Color':
            LeftDiv.innerHTML += `
                      <div class="LeftDivNode">
                          <span>${item.Name}</span>
                          <input type="color" name="Color" id=${item.Id} value=${item.Value}>
                          <hr />
                      </div>
                     `;
            break;
    }
}

function AddPhysicalSettings(bHighPhysics,GravitationalAcceleration){
    localStorage.setItem("bHighPhysics", JSON.stringify(false));

    bHighPhysics.addEventListener("input", (e) => {
        if(bHighPhysics.checked){
            localStorage.setItem("bHighPhysics", JSON.stringify(true));
            ShowToast(`开启高品质模拟!`,"success",1500);
        }else{
            localStorage.setItem("bHighPhysics", JSON.stringify(false));
            ShowToast(`关闭高品质模拟!`,"success",1500);
        }
    });

}