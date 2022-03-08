import axios from 'axios';
import InputForm from '@/components/input-form.vue'
import { isReferencedIdentifier } from '@vue/compiler-core';
export default {
  name: 'register',
  components: {
    InputForm
  },
  data() {
    return {
      message: '',
      inputs: [
        {
          name: 'username',
          label: 'Username',
          value: '',
          type: 'text'
        },
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
        },
        {
          name: 'repassword',
          label: 'Cornfirm password',
          value: '',
          type: 'password'
        }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      // get value input
      const username = this.inputs[0].value;
      const email = this.inputs[1].value;
      const password = this.inputs[2].value;
      const confirmPassword = this.inputs[3].value;
      // check math password
      if (confirmPassword !== password) {
        this.message = 'Password and confirm password not math!';
      } else {
        // send value signup
        try {
          const reponse = await axios.post('http://localhost:3000/api/auth/signup', {
            username: username,
            email: email,
            password: password
          });
          alert(reponse.data.message);
          // sigin 
          const responseLogin = await axios.post('http://localhost:3000/api/auth/signin', {
            email: email,
            password: password
          });
          //save token to localStorage
          if (responseLogin.data.accessToken) {
            localStorage.setItem('accessToken', responseLogin.data.accessToken);
            this.$router.push('home');
          }
        } catch (err) {
          this.message = err.response.data.message;
        }

      }

      console.log(username, email, password, confirmPassword)

    }
  }
}