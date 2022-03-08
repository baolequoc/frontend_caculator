// @ is an alias to /src
import buttonCaculator from '@/components/button-caculator.vue'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    buttonCaculator
  },
  async created() {
    // get history user in database
    if (localStorage.getItem('accessToken')) {
      try {
        const response = await axios.get('http://localhost:3000/api/getdata', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          }
        });
        this.value = response.data.history + '';
        this.login = true;

      } catch (error) {
        alert('Something went wrong, please login again!');
      }
      // get history from localStorage
    } else {
      if (localStorage.getItem('history')) {
        this.value = localStorage.getItem('history');
      }
    }
  },
  data() {
    return {
      valueHistory: '0',
      value: '0',
      result: '0',
      login: false,
      history: [],
      rows: [
        ['AC', 'C', '%', '/'],
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['^', '0', '.', '=']
      ]
    }
  },
  methods: {
    handleEvent(character) {
      if (character === 'AC') {
        this.clearAll();
      } else if (character === 'C') {
        this.clear();
      } else if (character === '=') {
        this.submmitData();
      } else {
        this.append(character);
      }
    },
    append(val) {
      if (this.value.charAt(0) === '0') {
        this.value = '' + val;
      } else {
        this.value = this.value + '' + val;
      }
    },
    clear() {
      if (this.value.length === 1) {
        this.value = '0';
      } else {
        this.value = this.value.slice(0, -1);
      }
    },
    clearAll() {
      this.value = '0';
    },
    async submmitData() {
      // calculate expression
      try {
        const valueSend = { "value": this.value };
        const response = await axios.post("http://localhost:3000/api/getdata", valueSend);
        this.result = '=' + response.data.value;
        this.history.push(this.value);
        if (this.login) {
          // save history to database
          if (localStorage.getItem('accessToken')) {

            const sendHistory = { "history": this.value };
            axios.post('http://localhost:3000/api/savedata', sendHistory, {
              headers: {
                'x-access-token': localStorage.getItem('accessToken'),
              },
            });
          }
        }
        else {
          // save to localStorage
          localStorage.setItem('history', this.value);
        }
        this.value = response.data.value + '';
      } catch (e) {
        alert('Something went wrong, please login again!');
      }
    },
    logout() {
      // remove token in localStorage
      this.login = false;
      localStorage.removeItem('accessToken');
    }
  }
}

