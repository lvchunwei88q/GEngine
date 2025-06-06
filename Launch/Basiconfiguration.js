function  Basiconfiguration(Id){
    localStorage.setItem("MainID", JSON.stringify(Id));
    localStorage.setItem("ThreadLocks", JSON.stringify(true));//线程锁
    localStorage.setItem("LoopSystem",JSON.stringify(true));//初始化为True
    localStorage.setItem("Initialize",JSON.stringify(true));//初始化
    localStorage.setItem("Tick",0);//初始化为0
    localStorage.setItem("Debug",JSON.stringify(true));//默认开启
    localStorage.setItem("ObjectID",JSON.stringify(null));//这里记录的所有的ObjectID
    localStorage.setItem("ObjectInstanceID",JSON.stringify(null));//当用户点击Object的Instance时Get的ID
    localStorage.setItem("Physics",JSON.stringify(false));//控制物理模拟
    localStorage.setItem("ObjectPhysicsID",JSON.stringify(null));//存储那些是需要进行物理模拟的Object
    //localStorage.setItem("PhysicalSimulationOfStateOfObject",JSON.stringify(null));//这里记录了每一个object的物理模拟状态
}