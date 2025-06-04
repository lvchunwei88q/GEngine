function Launch(Id) {
    Basiconfiguration(Id);//初始化参数
    const GEngineLoop = setInterval(function () {
        if (JSON.parse(localStorage.getItem("LoopSystem")) && JSON.parse(localStorage.getItem("ThreadLocks"))) {
            localStorage.setItem("ThreadLocks", JSON.stringify(false));
            EngineLoop();
        }else if(!JSON.parse(localStorage.getItem("LoopSystem"))) EndGEgineLoop(GEngineLoop);
    });
}

function EndGEgineLoop(GEngineLoop) {
    clearInterval(GEngineLoop);//清除GEngineLoop
    console.log("GEnginEnd!");
}

function EngineLoop(GEngineLoop) {
    localStorage.setItem("Tick",JSON.stringify(JSON.parse(localStorage.getItem("Tick")) + 1));
    if (!JSON.parse(localStorage.getItem("MainID"))) {
        ShowToast("Error:MainIDisNull!","error");
    }
    if(JSON.parse(localStorage.getItem("Initialize"))) {
        console.log("[EngineLoop:]Initialize!");
        Initialize();
    }
    Physics();//PhysicsLoop
    localStorage.setItem("ThreadLocks", JSON.stringify(true));
}