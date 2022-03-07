<template>
 <div class="mx-auto overflow-hidden mt-10 shadow-lg mb-2 bg-purple-800 shadow-lg border rounded-lg lg:w-2/6 md:w-3/6 sm:w-4/6">
    <div class="">
      <div class="p-5 text-white text-center text-3xl bg-purple-900"><span class="text-orange-500">Calcu</span>lator</div>
      <div class="pt-16 p-5 pb-0 text-white text-right text-3xl bg-purple-800">
        <div class="md:container md:mx-auto">
          <p v-for="val in history" :key="val">{{val}}</p>
           <p>{{value}}</p> 
        </div>
        </div>
      <div class="p-5 text-white text-right text-3xl bg-purple-800"><span class="text-orange-500">{{result}}</span></div>
      
      
    <div v-for="(buttons,i) in rows" :key="i"  class="flex items-stretch bg-purple-900 h-24">
        <buttonCaculator v-for="button in buttons" 
        :key="button"
        @on-click="handleEvent"
        :character="button"
        />
    </div>
  </div>
</div>
</template>

<script>
import buttonCaculator from '@/components/button-caculator.vue'
import axios from 'axios'
export default {
  name: 'caculator',
  data() {
    return {
      value: '0',
      result: '0',
      history: [],
      rows: [['AC','C','%','/'],['7','8','9','x'],['4','5','6','-'],['1','2','3','+'],['^','0','.','=']]
    }
  },
  async created() {
    console.log(this.valueHistory);
    if(this.valueHistory) {
      console.log('Khoi tao gia tri');
      console.log(this.valueHistory);
       this.value = this.valueHistory;
      console.log(this.value);
    }
  },
  props: ['valueHistory'],
  methods: {
    handleEvent(character) {
      if(character==='AC') {
        this.clearAll();
      } else if(character==='C') {
        this.clear();
      } else if(character==='=') {
        this.submmitData(); 
      } else {
        this.append(character);
      }
    },
    append(val) {
      if(this.value.charAt(0) ==='0') {
        this.value = ''+ val;
      } else {
         this.value = this.value + '' + val;
      }
    },
    clear() {
      if(this.value.length === 1) {
        this.value = '0';
      } else {
        this.value = this.value.slice(0,-1);
      }
    }, 
    clearAll() {
      this.value = '0';
    },
    async submmitData() {
      const valueSend = {"value": this.value};
      const response = await axios.post("http://localhost:3000/api/getdata",valueSend);
      this.result = '='+ response.data.value;
      this.history.push(this.value);
      localStorage.setItem('history',this.value);
      this.value = response.data.value+'';
      console.log(localStorage.getItem('history'));
    }
  },
  components: {
    buttonCaculator
  },

}
</script>

