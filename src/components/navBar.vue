<template>
    <div class="navbar">
       <div @click="$router.push('/')">Crud</div>
       <div class="navbar__btns">
        <my-button style="cursor: pointer;" @click="$router.push('/user')">Користувачі</my-button>
        <my-button style="cursor: pointer;" @click="$router.push('/about')">2 Сторінка</my-button>
       </div>
    </div>
 </template>
 
 
 <script>
 
 export default {
  
 }
 </script>
 
 <style scoped>
 .navbar{
    height: 58px;
    background: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
 }
 .navbar__btns{
    margin-left: auto;
    display: flex;
    gap: 20px;
    
 }
 </style>