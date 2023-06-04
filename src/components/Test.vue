<template>
    <div class="container">
      <div class="input-container">
        <label for="input1">Input 1:</label>
        <input type="text" id="input1">
      </div>
      <div class="input-container">
        <label for="input2">Input 2:</label>
        <input type="text" id="input2">
      </div>
      <div class="input-container">
        <label for="input3">Input 3:</label>
        <input type="text" id="input3">
      </div>
    </div>
    
  </template>
  
  <style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .input-container {
    margin: 10px;
    flex-basis: calc(33.33% - 20px);
  }
  
  .input-container:nth-child(4) {
      display:none;
  }
  
    @media (min-width: 768px) {.input-container:nth-child(4) {
      display: none;
    }}
  
  @media (max-width: 768px) {
    .input-container {
      flex-basis: 100%;
    }
    .input-container:nth-child(2) {
      display: none;
    }
    .input-container:nth-child(4) {
      display: block;
    }
  }
  </style>