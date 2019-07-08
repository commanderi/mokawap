// 单选
function singleSelect(y,x,me) {
    if(me.userArr[y].indexOf(x) === -1){
        me.userArr[y].push(x);
    }else{
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
    }
    switch (me.NavTwo_index) {
        case 1:case 13:case 19:case 25:case 31:case 37:case 43:case 49:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwo_index);
        break;
    }
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    AssemblyData(me,5);
    console.log(me.userArr);
};
export{
    singleSelect
}
// 多选
function multipleSelect(e,y,x,me){
    me.userArr[y] = [];
    if(x!=5){
        me.DesignationArr[y].num = x;
        for (let i = 0; i < 10; i++) {
            if(x==0){
                me.userArr[y].push(i);
            }else if(x==1 && i>4){
                me.userArr[y].push(i);
            }else if(x==2 && i<5){
                me.userArr[y].push(i);
            }else if(x==3 && i%2!=0){
                me.userArr[y].push(i);
            }else if(x==4 && i%2==0){
                me.userArr[y].push(i);
            }
        }
    }else{
        me.DesignationArr[y].num = null;
    }
    console.log(me.userArr);
};
export{
    multipleSelect
}
// 组装数据,并将号码添加到底部
function AssemblyData(me,num){
    // const me = m.$data;
    let xuanzheData = [];
    let successData = null;
    let title = ['W','Q','B','S','G',];
    let rr = '';
    // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率
    let list = {number:null,odd_play:null,note:null,money:null,one_money:null,rate:null,multiple:null,name:null};
    for (let i = 0; i < me.userArr.length; i++) {
        if(me.userArr[i]!=undefined||me.userArr[i]!=null){
            xuanzheData[i] = me.userArr[i];
        }
    }
    switch (me.NavTwo_index) {
        case 1:case 55:case 62:case 65:case 70:
            
        break;
        default:
            spliceBetNumberArr(xuanzheData,5);
        break;
    }
    successData = (xuanzheData.join('|')).replace(/,/g,' ');
    switch (me.NavTwo_index) {
        case 63:case 64:case 66:case 67:case 68:case 69:case 71: //有选择'万千百十个'的情况
            for (let j = 0; j < me.rxArr.length; j++) {
                rr += ' '+title[me.rxArr[j]];
            }
            successData = rr+':'+successData;
        break;
        case 3:case 4:case 5:case 7:case 15:case 17:case 21:case 23:case 28:case 29:case 34:case 35:case 40:
        case 41:case 47:case 53:case 56:case 57:case 58:case 59:case 60:case 61:case 77:case 78:case 79:case 80: //单排数字
            for (let j = 0; j < successData.length; j++) {
                successData = successData.replace('|','');
            }
        break
        case 46:case 52: //两排汉字
            let arr = me.userArrChinese[0]+'|'+me.userArrChinese[1];
            successData = arr.replace(/,/g,' ');
        break;
        case 6:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90: //单排汉字
            spliceBetNumberArr(me.userArrChinese,2);
            successData = (me.userArrChinese[0].join(' ')).replace(/,/g,' ');
        break
    }
    me.bettingInfo.number = successData;
    list = {
        number:successData,
        odd_play:me.bettingInfo.odd_play,
        odd_id:me.NavTwo_index,
        note:me.bettingInfo.bettingNumber,
        money:me.bettingInfo.allMoney,
        one_money:me.bettingInfo.singleMoney,
        rate:me.bettingInfo.rate,
        multiple:me.bettingInfo.setMultipleNumber,
        name:me.NavOneData[me.NavOne_index].name+'-'+me.NavTwoFont,
    };
    me.myObj.push(list);
    console.log(me.myObj)
    // m.clearUserArr();
};
export{
    AssemblyData
}
// 删除二维数组为空的数组(arr:数组,num:循环次数)
function spliceBetNumberArr(arr, num) {
    for (let i = 0; i < num; i++) {
        for (let w = 0; w < arr.length; w++) {
            if(arr[w]!=null||arr[w]!=undefined){
                if (arr[w].length <= 0) {
                    arr.splice(w, 1);
                }
            }
        }
    }
    return arr
};
// 五星算法
function getBettingNumber(me,id){
    let num = [];
    if(me.userArr[0]!=null||me.userArr[0]!=undefined){
        for (let i = 0; i < me.userArr[0].length; i++) {
            if(me.userArr[1]!=null||me.userArr[1]!=undefined){
                for (let j = 0; j < me.userArr[1].length; j++) {
                    if(id==43||id==49){ //二星
                        let dusi = me.userArr[0][i];
                        let dusj = me.userArr[1][j];
                        num.push(dusi+','+dusj);
                    }else{
                        if(me.userArr[2]!=null||me.userArr[2]!=undefined){
                            for (let k = 0; k < me.userArr[2].length; k++) {
                                if(id==25||id==31||id==37){ //三星
                                    let dusi = me.userArr[0][i];
                                    let dusj = me.userArr[1][j];
                                    let dusk = me.userArr[2][k];
                                    num.push(dusi+','+dusj+','+dusk);
                                }else{
                                    if(me.userArr[3]!=null||me.userArr[3]!=undefined){
                                        for (let a = 0; a < me.userArr[3].length; a++) {
                                            if(id==13||id==19){ //四星
                                                let dusi = me.userArr[0][i];
                                                let dusj = me.userArr[1][j];
                                                let dusk = me.userArr[2][k];
                                                let dusa = me.userArr[3][a];
                                                num.push(dusi+','+dusj+','+dusk+','+dusa);
                                            }else if(id==1){ //五星
                                                if(me.userArr[4]!=null||me.userArr[4]!=undefined){
                                                    for (let b = 0; b < me.userArr[4].length; b++) {
                                                        let dusi = me.userArr[0][i];
                                                        let dusj = me.userArr[1][j];
                                                        let dusk = me.userArr[2][k];
                                                        let dusa = me.userArr[3][a];
                                                        let dusb = me.userArr[4][b];
                                                        num.push(dusi+','+dusj+','+dusk+','+dusa+','+dusb);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return num.length;
};