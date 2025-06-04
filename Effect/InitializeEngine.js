function InitializeEngine(){
    InitializeEngineMap();
}

function InitializeEngineMap(){
    let EngineBody = document.getElementById("Main");
    //GetID on Main
    EngineBody.style.background = "#000000"//初始化为#000000
    
    document.getElementById("Background_Color").addEventListener("input",function (){
        EngineBody.style.background = document.getElementById("Background_Color").value;
        
        //让帧率一直是比背景颜色要亮的
        const RGBA_Color = ConvertHexToRGBA(document.getElementById("Background_Color").value);
        RGBA_Color.r *= 4;
        RGBA_Color.g *= 4;
        RGBA_Color.b *= 4;
        document.getElementById("framerate").style.color = ConvertRGBToHex(RGBA_Color);
        document.getElementById("physicsframerate").style.color = ConvertRGBToHex(RGBA_Color);
    });
}