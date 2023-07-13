<script setup lang="ts">

import { getCurrentInstance, ref, watch, type ComponentInternalInstance, inject } from 'vue';

import { getHtmlStr,compareResult } from '@/lib/StrLib'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const inputLText = ref("")
const inputRText = ref("")
const outputText = ref("")

const lang=[

]

watch([inputLText, inputRText], ([textL,textR]) => {

  outputText.value = compareResult(textL,textR);

})
const { locale } = useI18n({ useScope: 'global' });

const langChange=(e: any)=>
        {
          
          try{
            const loc1 :string = ((e as any).target.value.split("-"))[0];
            
            locale.value = loc1; // change!
          }
          catch(err){
            locale.value="zh-CN"
          }
          
        }

</script>

<template>
  <div>
    <div>
      <h2>{{ t('标题') }}</h2>
      <label  for="language">language&nbsp;</label>
      <select @change="langChange" name="language"
      >
        <option value="zh-CN">简体中文</option>
        <option value="en">English</option>
      </select>
      <p style="color: red;">{{ t('警告') }}</p>
    </div>
    
    <div class="container">

      <div class="input-container">
        <label class="input-lable">
          <p class="text">{{ t('原始文本') }}</p>
          <div class="input-area" contenteditable="true" v-on:input="(e:any)=>{inputLText=getHtmlStr(e.target.innerHTML)}" ></div>
        </label>
      </div>

      <div class="input-container  output" id="wideOutput">
        <h4 class="text">{{ t('差异') }}</h4>
          <div class="content" v-html="outputText">
          </div>
      </div>

      <div class="input-container">

        <label class="input-lable">
          {{ t('修改后文本') }}
          <div class="input-area" contenteditable="true" v-on:input="(e:any)=>{inputRText=getHtmlStr(e.target.innerHTML)}" ></div>
        </label>

      </div>
      <div class="input-container">
        <h4 style="margin: 0;  width: 100%;">{{ t('差异') }}</h4>
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

label{
  font-size: 0.6rem;
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
