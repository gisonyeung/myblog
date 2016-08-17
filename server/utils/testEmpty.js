module.exports = function testEmpry(str) {
	
	if ( !/\S/.test(str) // 检测不到非空字符
		|| str == 'undefined' // 数据为undefined
		|| !(/[^\u0000-\u0020|^\u007f]/g.test(str)) // 检测不到0~32号及127号以外的字符：控制字符或通讯专用字符
		|| !(/[\u4E00-\u9FA5|\w]/g.test(str)) // 检测不到中英文字符
	) {
		return true;
	} else {
		return false;
	}

}