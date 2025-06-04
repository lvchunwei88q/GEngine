function FrameRate() {
    const toast = document.createElement('div');
    toast.classList = "FrameRate";
    toast.innerHTML =`<span id="framerate"></span>`;
    const frameRate = setInterval(() => {
        const Tick = JSON.parse(localStorage.getItem("Tick"));
        if (document.getElementById("FrameRateBool").checked !== true) {
            //如果不等于true就直接不打印帧数
            document.getElementById('framerate').innerHTML ="";//Null
        }else{
            document.getElementById('framerate').innerText = `
            FPS:${Tick}`;
            //console.log(Tick);Debug
        }
        localStorage.setItem("Tick",0);
    },1000);//每秒一次
    // 添加到容器
    const container = document.getElementById('Main');
    container.appendChild(toast);
    
    return true;
}

let PhysicsFrameTick = 0;

function PhysicsFrame(){
    const toast = document.createElement('div');
    toast.classList = "PhysicsFrameRate";
    toast.innerHTML =`<span id="physicsframerate"></span>`;
    const physicsframe = setInterval(() => {
        if (JSON.parse(localStorage.getItem("Physics"))) {
            document.getElementById('physicsframerate').innerText = `
            PhysicsFPS:${PhysicsFrameTick}`;
        }else{
            document.getElementById('physicsframerate').innerHTML ="";//Null
        }
        PhysicsFrameTick = 0;//重置为0
    },1000);
    // 添加到容器
    const container = document.getElementById('Main');
    container.appendChild(toast);
    
    return true;
}

function FPhysicsFrameTick(){
    PhysicsFrameTick++;//每次为模拟的物理帧加一
}