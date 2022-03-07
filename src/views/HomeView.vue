<template>
  <div class="home">
    <Caculator :valueHistory="this.valueHistory"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Caculator from '@/components/caculator.vue'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    Caculator
  },
   async created(){
      if(localStorage.getItem('accessToken')) {
        try{
            const response = await axios.get('http://localhost:3000/api/getdata', {
            headers: {
              'x-access-token' : localStorage.getItem('accessToken'),
            }
          });
          console.log('login thanh cong');
          this.valueHistory = response.data.history+'';
          console.log(this.valueHistory);
        } catch (error) {
          console.log(error);
        }
      } else {
        if(localStorage.getItem('history')) {
            this.valueHistory = localStorage.getItem('history');
        }
        console.log("Không đăng nhập bằng jwt");
        console.log(this.valueHistory);
      }
  },
   data() {
        return {
          valueHistory:'0'
        }
      }
     
}
</script>
