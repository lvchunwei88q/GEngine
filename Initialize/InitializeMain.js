function Initialize(){
    let Initializeinterface = false,
        Framerate = false,
        Physicsframe = false;
        Interfaceparameters = false;
    // Let

    Initializeinterface = InitializeInterface();
    Interfaceparameters = InterfaceParameters();
    Framerate = FrameRate();//初始化帧率显示
    Physicsframe = PhysicsFrame();
    
    InitialLoading();//初次加载的函数
    
    if(Initializeinterface && Interfaceparameters && Framerate) {
        localStorage.setItem("Initialize",JSON.stringify(false));
        //这表明界面已经设置完成
        ShowToast("界面已经设置完成!","success");
    }
}

function InitializeInterface(){
    let MainIdFace = JSON.parse(localStorage.getItem("MainID"));
    console.log("InitializeInterface", MainIdFace);
    //初始化参数界面
    ParametersLeft();//ParametersLeft.js
    //开始不会显示只有到了用户点击ObjectInstance才会显示
    
    //ObjectInstanceInterface()//ObjectInstanceInterface.js
    
    return true;
}

function InterfaceParameters(){
    
    return true;
}

function InitialLoading(){
    //Initialize the engine
    InitializeEngine();//包含Map....(首先这里设置了GEngine的Back)
    //Bind a click event
    //Enum——枚举
    //Object
    const Diamonds = document.getElementById("Diamonds");
    const Rotundity = document.getElementById("Rotundity");
    //Bool
    const DebugBool = document.getElementById("DebugBool");
    //这里表示了GEngine的所有的模型枚举
    BindClickEvent(Diamonds,Rotundity);
    DebugValueAndObject(DebugBool);
}