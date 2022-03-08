import axios from 'axios';
import InputForm from '@/components/input-form.vue'
import { isReferencedIdentifier } from '@vue/compiler-core';
export default {
  name: 'login',
  components: {
    InputForm
  },
  data() {
    return {
      message: '',
      inputs: [
        {
          name: 'email',
          label: 'Email address',
          value: '',
          type: 'email'
        },
        {
          name: 'password',
          label: 'Password',
          value: '',
          type: 'password'
        }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      // get value input
      const email = this.inputs[0].value;
      const password = this.inputs[1].value;
      // send value
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signin', {
          email: email,
          password: password
        });
        // save token in localStorage
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          this.$router.push('home');
        }
      }
      catch (err) {
        this.message = err.response.data.message;
      }
    }
  }
}