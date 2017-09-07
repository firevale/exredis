
import HashMap from 'hashmap'
let filterMap = new HashMap();
let endTag = '\0'; // 敏感词结束符

export const init = data => { 
    let filterWordList = data.split(/,/);
    for (var i = 0; i < filterWordList.length; i++) {
        var charArray = filterWordList[i].split('');
        var len = charArray.length;
        if (len > 0) {
            var subMap = filterMap;
            for (var k = 0; k < len - 1; k++) {
                var obj = subMap.get(charArray[k]);
                if (obj == null) {
                    var subMapTmp = new HashMap();
                    subMap.set(charArray[k], subMapTmp);
                    subMap = subMapTmp;
                } else {
                    subMap = obj;
                }
            }

            var obj = subMap.get(charArray[len - 1]);
            if (obj == null) {
                var subMapTmp = new HashMap();
                subMapTmp.set(endTag, null);
                subMap.set(charArray[len - 1], subMapTmp);
            } else {
                obj.set(endTag, null);
            }
        }
    }
}

export const hasKeyword = text => { 
    if (text == null || text == undefined)
        return false;
    var charArray = text.split('');
    var len = charArray.length;
    for (var i = 0; i < len; i++) {
        var index = i;
        var sub = filterMap.get(charArray[index]);
        while (sub != null) {
            if (sub.has(endTag)) {
                return true;
            } else {
                index++;
                if (index >= len) {
                    return false;
                }
                sub = sub.get(charArray[index]);
            }
        }
    }
    return false;
};

export const replaceKeyword = (text, replaceWord) => {
    if (text == null || text == undefined || replaceWord == null || replaceWord.length == 0)
        return text;
    var charArray = text.split('');
    var len = charArray.length;
    var newText = '';
    var i = 0;
    while (i < len) {
        var end = -1;
        var index;
        var sub = filterMap;
        for (var index = i; index < len; index++) {
            sub = sub.get(charArray[index]);
            if (sub == null) {
                if (end == -1) {
                    newText += charArray[i];
                    i++;
                    break;
                } else {
                    for (var j = i; j <= end; j++) {
                        newText += replaceWord;
                    }
                    i = end + 1;
                    break;
                }
            } else {
                if (sub.has(endTag)) {
                    end = index;
                }
            }
        }
        if (index >= len) {
            if (end == -1) {
                newText += charArray[i];
                i++;
            } else {
                for (var j = i; j <= end; j++) {
                    newText += replaceWord;
                }
                i = end + 1;
            }
        }
    }
    return newText;
};



