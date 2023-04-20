<template>
   <form @submit.prevent> 
        <h4>Створення поста</h4>
        <my-input 
            v-focus
            v-model="post.title"
            type="text" 
            placeholder="Назва поста"/>
        <my-input 
            v-model="post.body"
            type="text" 
            placeholder="Опис поста"/>
        <my-button style="margin-top: 15px;"
        class="btn" @click="createPost">Створити</my-button>
    </form>

</template>

<script>

export default {
    
 data(){
    return{
        post:{
            title: '',
            body: '',
        }
    }
 },

 methods:{
    createPost(){
        this.post.id = Date.now();
        this.$emit('create', this.post);
        this.post = {
            title: '',
            body: ''
        }
      },
 }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
}




</style>
