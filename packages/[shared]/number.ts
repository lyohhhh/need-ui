// 判断是否是数字
export const isNumber = function (val: string | number) {
	val = String(val);
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	if (regPos.test(val) || regNeg.test(val)) {
		return true;
	} else {
		return false;
	}
};
