module.exports =printInventory;
function printInventory(inputs, allItems) {
    var count = calculateCount(inputs); //计算相同barcode;
    var countAndItems = combineItemsAndCount(count, allItems);  //合并商品信息与数量

    console.log(printReceiptText(countAndItems));   //打印拼接的信息
};
function calculateCount(inputs) {
    var count = 1;
    var array = [];
    var items = inputs.sort();   //对数据进行排序

    for (var i = 0; i < items.length; i++) {
        if (items[i] !== items[i + 1]) {
            array.push({"barcode": items[i], "count": count});
            count = 1;
        } else {
            count++;
        }
    }
    for (var i = 0; i < array.length; i++) {
        var itemInfo = array[i];

        if (itemInfo.barcode.indexOf("-") !== -1) {
            var barcodeSplit = itemInfo.barcode.split("-");

            array[i].barcode = barcodeSplit[0];
            array[i].count = parseInt(itemInfo.count) + parseInt(barcodeSplit[1]) - 1;
        }
    }
    return array;
}
function combineItemsAndCount(inputsCount, allItems) {
    var outputItems = [];

    for (var i = 0; i < inputsCount.length; i++) {
        for (var j = 0; j < allItems.length; j++) {
            if (inputsCount[i].barcode === allItems[j].barcode) {
                outputItems.push(Object.assign(inputsCount[i], allItems[j]));//Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
            }
        }
    }

    return outputItems;
}
function printReceiptText(outputItems) {
    var ReceiptTextHead = `***<没钱赚商店>购物清单***\n`;
    var ReceiptTextMiddle = `----------------------\n`;
    var ReceiptTextBelow = `**********************`;
    var ReceiptTextItem = "";
    var ReceiptTextDiscount = "挥泪赠送商品：\n";

    var totalMoney = 0;
    var saveMoney = 0;

    for (var i = 0; i < outputItems.length; i++) {
        var itemCount = outputItems[i].count;

        if (itemCount >= 3) {    //商品价格满二减一
            itemCount -= parseInt(itemCount / 3);
            ReceiptTextDiscount += `名称：${outputItems[i].name}，数量：${parseInt(outputItems[i].count / 3)}${outputItems[i].unit}\n`
        }
        var itemPrice = itemCount * outputItems[i].price;

        totalMoney += itemPrice;
        saveMoney += (parseInt(outputItems[i].count / 3)) * outputItems[i].price;
        ReceiptTextItem += `名称：${outputItems[i].name}，数量：${outputItems[i].count}${outputItems[i].unit}，单价：${parseFloat(outputItems[i].price).toFixed(2)}(元)，小计：${parseFloat(itemPrice).toFixed(2)}(元)\n`;
    }

    var totalAll = `总计：${parseFloat(totalMoney).toFixed(2)}(元)\n`;   //toFixed()可把 Number 四舍五入为指定小数位数的数字。
    var totalSave = `节省：${parseFloat(saveMoney).toFixed(2)}(元)\n`;
//$()获取在别的地方定义的函数；
    return ReceiptTextHead + ReceiptTextItem + ReceiptTextMiddle + ReceiptTextDiscount + ReceiptTextMiddle + totalAll + totalSave + ReceiptTextBelow;
}





