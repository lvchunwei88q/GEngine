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
        "Value": "true",
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

function ParametersLeft(){
    //创建元素
    const LeftDiv = document.createElement('div');
    LeftDiv.className = 'LeftDiv';
    for (let i=0; i<MessageJson.length; i++){
        let item = MessageJson[i];
        switch (item.Type){
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
                          <input type="checkbox" name="Bool':" id=${item.Id} checked=${item.Value}>
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
    const container = document.getElementById('Main');
    container.appendChild(LeftDiv);
}