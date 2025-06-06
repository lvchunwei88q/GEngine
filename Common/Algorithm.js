//这个页面存储基础算法

function PythagoreanTheorem(A,B){//勾股定理
    let C;
    C = (A*A) + (B*B);//C^2
    C = Math.sqrt(C);//开方
    return C;
}

function CalculateObjectSpacing(Ax,Ay,Bx,By,aPOS,bPOS){//Input A,B
    //const PI = 3.141592653589793;//圆周率
    //转换
    Ax = parseFloat(Ax);Ay = parseFloat(Ay);
    Bx = parseFloat(Bx);By = parseFloat(By);
    
    /* aPOS == x And y bPOS == x And y */
    let ACenterCircle = [],BCenterCircle = [];

    ACenterCircle.push({
        "X": aPOS[0].x + Ax,
        "Y": aPOS[0].y + Ay,
    });
    BCenterCircle.push({
        "X": bPOS[0].x + Bx,
        "Y": bPOS[0].y + By,
    });
    let Aradius,Bradius;//radius

    Aradius = PythagoreanTheorem(Ax,Ay)/2;
    Bradius = PythagoreanTheorem(Bx,By)/2;
    
    let XPos,YPos,Length;//Postion

    XPos = aPOS[0].x - bPOS[0].x;
    YPos = aPOS[0].y - bPOS[0].y;
    //确保一直是正数
    if(XPos < 0)XPos = -XPos;
    if(YPos < 0)YPos = -YPos;

    Length = PythagoreanTheorem(XPos,YPos);

    Length = Length - Aradius - Bradius;
    
    return Length <= 0;
    //如果Length小于0说明已经碰撞上了
}