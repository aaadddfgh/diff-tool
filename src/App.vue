<script setup lang="ts">
import { calcPatch } from 'fast-myers-diff'
import {  ref, watch, type TextareaHTMLAttributes, type StyleValue, computed } from 'vue';


const inputLText = ref("")
const inputRText = ref("")
const outputText = ref("")

const obj:StyleValue={}

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

watch([inputLText, inputRText], () => {

  const beforeText = inputLText.value.concat().replace(/%/g, "\x89")

  const ret = calcPatch(beforeText, inputRText.value.concat().replace(/%/g, "\x89"));
  let retStr = beforeText
  let bb: [number, number, string][] = []
  for (const i of ret) {
    bb.push(i)
  }

  retStr = replaceString(retStr, bb, "%s");

  let repStr: string[] = []

  for (const i of bb) {
    if (i[0] == i[1]) {//纯插入
      repStr.push('<em>' + i[2] + '</em>')
    }
    else if (i[2].length == 0) {// 纯删除
      repStr.push('<del>' + beforeText.slice(i[0], i[1]) + '</del>')
    }
    else {
      repStr.push('<em>' + i[2] + '</em>' + '<del>' + beforeText.slice(i[0], i[1]) + '</del>')
    }
  }
  let ii = 0;
  while (retStr.match("%s")) {
    retStr = retStr.replace("%s", repStr[ii])
    ii++;
  }
  retStr = retStr.replace(/\x89/g, '%')

  retStr = retStr.replace(/\n/g, '&nbsp<br />')

  outputText.value = retStr;

})

const IL=ref<any>()

const thinCSS=ref('@media (max-width: 768px) { height: '+'100%'+' }');
const hhh= computed(()=>{
  return `height: ${IL.value?IL.value.scrollHeight:100}px`;
})
function setHeight(){
  IL.value.style.cssText=`height: ${IL.value?IL.value.scrollHeight-4:130}px `;
}
</script>

<template>
  <div>
    <div>
      <h2>文本差异比较</h2>
      <p style="color: red;">不适用于xml</p>
    </div>
    
    <div class="container">

      <div class="input-container">
        <label class="input-lable">
          <p class="text">原始文本:</p>
          <div class="input-area" contenteditable="true" v-on:input="(e:any)=>{inputLText=e.target.innerText}" ></div>
        </label>
      </div>

      <div class="input-container  output" id="wideOutput">
        <h4 class="text">差异：</h4>
          <div class="content" v-html="outputText">
          </div>
      </div>

      <div class="input-container">

        <label class="input-lable">
          修改后文本:
          <div class="input-area" contenteditable="true" v-on:input="(e:any)=>{inputRText=e.target.innerText}" ></div>
        </label>


      </div>
      <div class="input-container">
        <h4 style="margin: 0;  width: 100%;">差异：</h4>
        <div v-html="outputText" class="content">

        </div>
      </div>
    </div>
  </div>
</template>

<style>
#wideOutput {
 margin: 10px 0;
}

.text{
  margin: 0;
}

.output{
  border-left: 1px dashed rgb(187, 187, 187);
  border-right: 1px dashed rgb(187, 187, 187);
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: auto;
  height: 100%;
}

.input-container {
  margin: 10px;
  flex-basis: calc(33.33% - 21px);
  flex-direction: column;
  display: flex;
}

.input-container:nth-child(4) {
  display: none;
}

.input-lable{
  height: 100%;
  display: flex;    
  flex-direction: column;
  font-family: auto;
  margin-top: 10px;
}

.scrollable {
  height: 100%;

  overflow-y: scroll;
}
.content {
  padding: 10px;
  word-break: break-word;
  margin-top: 0;
  
}

.input-area{
  word-break: break-word;
  padding: 2px;
  border: 1px solid black;
  margin: 0 5px;
  cursor: text;
  min-height: 150px;
}

textarea {
  resize: none;
  height: 100%;
  font-size: 16px;
  font-family: auto;
  margin: 0 5px;
}

em{
  color: green;
  background-color: lightblue;
}

del{
  color: palevioletred ;
  background-color: lightpink;
}

/*

*/

@media (min-width: 768px) {
  .container{
    min-height: 300px;
  }
  .input-container:nth-child(4) {
    display: none;
  }
  .content {
    max-width: calc(100% - 20px);
    
  }
  textarea{
    height: 100%;
  }
}

@media (max-width: 768px) {
  .input-container {
    flex-basis: 100%;
  }

  .input-container:nth-child(2) {
    display: none;
  }

  .input-container:nth-child(4) {
    display: flex;
  }
}
</style>
