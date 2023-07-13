/**
 * 将innerHtml 处理为字符串
 * @param str 
 * @returns string
 */
function getHtmlStr(str: string) {
  const ret = str.replace(/<(\/)?div>/g, "").replace(/<br>/g, "\n");

  return ret;

}

/**
 * 将str指定位置positions替换为replaceStr
 * @param str 
 * @param positions 
 * @param replaceStr 
 */
function replaceString(str: string, positions: [number, number, string][], replaceStr: string) {
  let result = '';
  let lastIndex = 0;
  for (let i = 0; i < positions.length; i++) {
    const [start, end] = positions[i];
    result += str.slice(lastIndex, start) + replaceStr;
    lastIndex = end;
  }
  result += str.slice(lastIndex);
  return result;
}

import { calcPatch } from 'fast-myers-diff'

/**
 * 比较结果
 * @param textL 
 * @param textR 
 * @returns result
 */
function compareResult(textL: string, textR: string) {
  const beforeText = textL.replace(/%/g, "\x89")

  const ret = calcPatch(beforeText, textR.replace(/%/g, "\x89"));
  let retStr = beforeText
  let bb: [number, number, string][] = []
  for (const i of ret) {
    bb.push(i)
  }

  retStr = replaceString(retStr, bb, "%s");

  let repStr: string[] = []

  for (const i of bb) {
    if (i[0] == i[1]) {//纯插入
      repStr.push('<em>' + i[2].replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</em>')
    }
    else if (i[2].length == 0) {// 纯删除
      repStr.push('<del>' + beforeText.slice(i[0], i[1]).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</del>')
    }
    else {
      repStr.push('<em>' + i[2] + '</em>' + '<del>' + beforeText.slice(i[0], i[1]).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</del>')
    }
  }
  let ii = 0;
  while (retStr.match("%s")) {
    retStr = retStr.replace("%s", repStr[ii])
    ii++;
  }

  retStr = retStr.replace(/\x89/g, '%')

  retStr = retStr.replace(/\n/g, '&nbsp<br />')
  return retStr;
}

export { getHtmlStr, replaceString, compareResult };