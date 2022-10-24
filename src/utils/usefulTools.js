export function deepClone(target) {
        let result;
        if (typeof target === 'object') {
            if (Array.isArray(target)) {
                result = [];
                for (let i in target) {
                    result.push(deepClone(target[i]))
                }
            } else if(target===null) {
                result = null;
            } else if(target.constructor===RegExp){
                result = target;
            }else {
                result = {};
                for (let i in target) {
                    result[i] = deepClone(target[i]);
                }
            }
        } else {
            result = target;
        }
        return result;
}

// 参数 str 为时间戳 可以传入10位也可以传入13位
// 参数 bool的值可传true或者false或者不传，如果需要显示秒则传true，不需要显示则传false或者不传
export function getMyDate(str, bool){
    var c_Date
    if(str > 9999999999) { // 这里判断：时间戳为几位数
        c_Date = new Date(parseInt(str));
    } else {
        c_Date = new Date(parseInt(str) * 1000);
    }
    var c_Year = c_Date.getFullYear(),
        c_Month = c_Date.getMonth()+1,
        c_Day = c_Date.getDate(),
        c_Hour = c_Date.getHours(),
        c_Min = c_Date.getMinutes(),
        c_Sen = c_Date.getSeconds();
    var c_Time;
    if(bool) { // 判断是否需要显示秒
        c_Time = c_Year +'-'+ getzf(c_Month) +'-'+ getzf(c_Day) +' '+ getzf(c_Hour) +':'+ getzf(c_Min) +':'+getzf(c_Sen);//最后拼接时间
    } else {
        c_Time = c_Year +'-'+ getzf(c_Month) +'-'+ getzf(c_Day) +' '+ getzf(c_Hour) +':'+ getzf(c_Min);//最后拼接时间
    }
    return c_Time;
}
//补0操作  小于10的就在数字前面加0，这应该很好理解吧

function getzf(c_num){
    if(parseInt(c_num) < 10){
        c_num = '0' + c_num;
    }
    return c_num;
}
// 用法：
// 需要显示秒：getMyDate(1523927510, true)
// 不需要显示秒：① getMyDate(1523927510, false) ② getMyDate(1523927510)
// 如果只需要时间： getMyDate(1523927510, true).split(" ")[1];
// 如果只需要日期： getMyDate(1523927510, true).split(" ")[0];

export function get7day() {
    function addDate0(time) {
        if (time.toString().length == 1) {
            time = '0' + time.toString();
        }
        return time;
    }
    let days = [];
    for(let i=0; i<=24*6;i+=24){		//今天加上前6天
        let dateItem=new Date(new Date().getTime() - i * 60 * 60 * 1000);	//使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        let y = dateItem.getFullYear()
        let m = dateItem.getMonth() + 1;	//获取月份js月份从0开始，需要+1
        let d= dateItem.getDate();	//获取日期
        m = addDate0(m);	//给为单数的月份补零
        d = addDate0(d);	//给为单数的日期补零
        for(let j=1; j<=24; j++){
            j = addDate0(j)
            let valueItem= d + '/' + m + '/' + y + ' - ' + j + ':00';	//组合
            days.push(valueItem);	//添加至数组
        }
    }
    return days;
}

//给日期加0
