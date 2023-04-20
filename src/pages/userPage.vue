<template>
    <div>
        <h1>Сторінка з постами</h1>
        <my-input
        v-model="searchQuery"
        placeholder="Пошук..."
        />
            
        
        <div class="app__btns">
            <my-button 
            @click="showDialog"
            >
            Створити користувача
            </my-button>
            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            />
        </div>
        
        
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>

    <!-- <post-form @create="createPost"/> -->
    <post-list :posts="sortedAndSearchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading"
    /> 
    <div >Загрузка...</div>

    <div ref="observer" class="observer"></div>

    <!-- <div class="page__wrapper">
        <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber"
        class="page"
        :class="{
            'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
        >
        {{ pageNumber }}
    </div>
    </div> -->


    </div>
</template>



<script>
import postForm from '@/components/postForm.vue';
import postList from '@/components/postList.vue';
import myButton from '@/components/ui/myButton.vue';
import axios from 'axios'
import mySelect from '@/components/ui/mySelect.vue';
import myInput from '@/components/ui/myInput.vue';

export default {
    components:{
        postList,postForm
    },
    data(){
        return{
            posts:[],
            dialogVisible:false,
            isPostsLoading:false,
            selectedSort: '',
            searchQuery:'',
            page: 1,
            limit: 10,
            totalPages:0,
            sortOptions:[
                {value:'title',name:'По назві'},
                {value:'body',name:'По опису'},
            ]
        }
    },

    methods:{
     createPost(post){
        this.posts.push(post)
        this.dialogVisible= false;
     },
     removePost(post){
        this.posts = this.posts.filter(p => p.id !== post.id)
     },
     showDialog(){
        this.dialogVisible = true;
     },
    //  changePage(pageNumber){
    //     this.page = pageNumber
    //  },
     async fetchPosts(){
        try{
            this.isPostsLoading = true;
            setTimeout(async () =>{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                params:{
                    _page:this.page,
                    _limit:this.limit,
                }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data
            },1000)
           
        }catch(e){
            alert('помилка')
        }finally{
            this.isPostsLoading = false;
        }
      },

      async loadMorePosts(){
        try{
           this.page +=1;
            setTimeout(async () =>{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                params:{
                    _page:this.page,
                    _limit:this.limit,
                }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = [...this.posts, ...response.data]
            },1000)
           
        }catch(e){
            alert('помилка')
        }
      }
    },
    mounted(){
        this.fetchPosts();
        const options = {
            rootMargin: '0px',
            threshold: 1.0
            }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            }
            };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
        // console.log(this.$refs.observer);
    },
    computed:{
        sortedPosts(){
            return[...this.posts].sort((post1,post2) =>
                post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },

    watch:{
        // page(){
        //     this.fetchPosts()
        // }
    }


 
}
</script>


<style>

.app__btns{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper{
    display: flex;
    margin-top: 15px;
    justify-content: center;

}

.page{
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
    margin: 5px;
}

.current-page{
    border: 2px solid green;
   
}

/* .observer{
    height: 30px;
    background: green;
} */

</style>