/*
	对Date的扩展，将 Date 转化为指定格式的String
	月(M)、日(D)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	年(Y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	例子： 
	dateFormat(Date, "YYYY-MM-D") ==> 2006-07-02
	dateFormat(Date, "YYYY-MM-D hh:mm") ==> 2006-07-02 08:09
	dateFormat(Date, "YYYY-M-D h:m:s.S") ==> 2006-7-2 8:9:4.18 
	dateFormat(Date, "YYYY-MM-D hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
*/
function dateFormat(dateString, fmt) {

	let _Date = new Date(dateString);

    var o = {
        "M+": _Date.getMonth() + 1, //月份 
        "D+": _Date.getDate(), //日 
        "h+": _Date.getHours(), //小时 
        "m+": _Date.getMinutes(), //分 
        "s+": _Date.getSeconds(), //秒 
        "q+": Math.floor((_Date.getMonth() + 3) / 3), //季度 
        "S": _Date.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_Date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    
    return fmt;
}


module.exports = dateFormat;