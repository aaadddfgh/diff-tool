<script setup lang="ts">

import { getCurrentInstance, ref, watch, type ComponentInternalInstance, inject } from 'vue';

import { compareResult } from '@/lib/StrLib'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const inputLText = ref("")
const inputRText = ref("")
const outputText = ref()

const lang = [

]

const LTextArea = ref()
const RTextArea = ref()

const spellCheck = ref(false);
const spellCheckText = ref(t("禁用"));

watch([inputLText, inputRText], ([textL, textR]) => {

  outputText.value = compareResult(textL, textR);

})
const { locale } = useI18n({ useScope: 'global' });

const langChange = (e: any) => {

  try {
    const loc1: string = ((e as any).target.value.split("-"))[0];

    locale.value = loc1; // change!
  }
  catch (err) {
    locale.value = "zh-CN"
  }

}

</script>

<template>
  <div class="d-flex flex-column h-100 appbox">
    <div class="navbar bg-light ">
      <h2 class="ml-2">{{ t('标题') }}</h2>
      <div class="nav nav-masthead">
        <label class="my-auto mr-1" for="spell">{{t("语法检查")}}</label>
        <button class="mr-3 btn" :class="{'btn-success':spellCheck,'btn-secondary':!spellCheck}" name="spell" v-on:click="()=>
        {spellCheck=!spellCheck;
        spellCheckText=spellCheck?t('启用'):t('禁用');}">{{spellCheckText}}</button>
        <label class="my-auto" for="language">language&nbsp;</label>
        <select @change="langChange" name="language">
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>
      </div>

      <!-- <p style="color: red;">{{ t('警告') }}</p> -->
    </div>

    <div class="my-container mx-5">

      <div class="input-container">
        <label class="input-lable ">
          <span class="text">{{ t('原始文本') }}</span>
          <textarea ref="LTextArea" class="input-area" contenteditable="true" :spellcheck="spellCheck" v-on:input="(e: any) => {
            RTextArea.style.height = '150px';
            LTextArea.style.height = '150px';
            let height = Math.max(LTextArea.scrollHeight, RTextArea.scrollHeight);
            RTextArea.style.height = height + 'px';
            LTextArea.style.height = height + 'px';
            inputLText = e.target.value
          }"></textarea>
        </label>
      </div>

      <div class="input-container  output" id="wideOutput">
        <h4 class="text">{{ t('差异') }}</h4>
        <div class="content" v-html="outputText">
        </div>
      </div>

      <div class="input-container">

        <label class="input-lable ">
          <span class="text">{{ t('修改后文本') }}</span>
          <textarea ref="RTextArea" class="input-area" contenteditable="true" :spellcheck="spellCheck" v-on:input="(e: any) => {
            RTextArea.style.height = '150px';
            LTextArea.style.height = '150px';
            let height = Math.max(LTextArea.scrollHeight, RTextArea.scrollHeight);
            RTextArea.style.height = height + 'px';
            LTextArea.style.height = height + 'px';
            inputRText = e.target.value
          }"></textarea>
        </label>

      </div>
      <div class="input-container">
        <h4 style="margin: 0;  width: 100%;">{{ t('差异') }}</h4>
        <div v-html="outputText" class="content">

        </div>
      </div>
    </div>

    <footer class="footer bg-light mt-auto py-1 my-footer">
      <div class="container flex-row d-flex px-3" style="justify-content: space-between;">
        <span>
          @ aaadddfgh
        </span>
        <a href="https://github.com/aaadddfgh/diff-tool">source</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#wideOutput {
  margin: 10px 0;
}

.appbox {
  min-height: 100vh;
}

.text {
  margin: 0;
}

.output {
  border-left: 1px dashed rgb(187, 187, 187);
  border-right: 1px dashed rgb(187, 187, 187);
}

.my-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: auto;
  height: 100%;
  overflow: auto;
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

.input-lable {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: auto;
  margin-top: 10px;
}


.content {
  padding: 10px;
  word-break: break-word;
  margin-top: 0;

}

.input-area {
  word-break: break-word;
  padding: 2px;
  border: 1px solid black;
  margin: 0 5px;
  cursor: text;
  min-height: 150px;
  overflow-y: hidden;
}


del {
  color: palevioletred;
  background-color: lightpink;
}

/*

*/

@media (min-width: 768px) {
  .my-container {
    min-height: 300px;
  }

  .input-container:nth-child(4) {
    display: none;
  }

  .content {
    max-width: calc(100% - 20px);

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
