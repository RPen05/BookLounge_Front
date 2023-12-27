<script>
import axios from 'axios';

export default {
  data() {
    return {
      phoneNumber: '', // добавим свойство для хранения номера телефона
      phoneNumberError: '',
      loginResponse: {
        success: false,
        code: null,
      },
      verificationResponse: false,
    };
  },
  props:{
    showModal:{
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    console.log(this.verificationResponse);
    console.log(this.loginResponse.success);
  },
  methods: {
    closeModal() {
      this.$emit('update:showModal', false);
      this.phoneNumber = '';
      this.resetLoginResponse();
      this.verificationResponse = false;
      console.log(this.verificationResponse);
    },
    resetLoginResponse() {
      this.loginResponse.success = false;
      this.loginResponse.code = null;
    },
    login() {
      axios
          .post('http://localhost:3000/auth/phone', { phoneNumber: this.phoneNumber }, { withCredentials: true })
          .then((response) => {
            // Обработка успешного входа
            this.loginResponse.success = response.data.success;
            this.loginResponse.code = response.data.code;
          })
          .catch((error) => {
            // Обработка ошибок
            this.loginResponse.success = false;
            this.loginResponse.code = null;
          });
    },
    verify() {
      axios
          .post('http://localhost:3000/auth/verify-code', { code: this.loginResponse.code }, { withCredentials: true })
          .then((response) => {
            this.verificationResponse = response.data.success;
          })
          .catch((error) => {
            this.verificationResponse = false;
          });
      console.log('Data', this.verificationResponse);
    },
    validatePhoneNumber() {
      const phoneRegex = /^\+7\d{3}\d{3}\d{2}\d{2}$/;
      if (!phoneRegex.test(this.phoneNumber)) {
        this.phoneNumberError = 'Некорректный формат номера телефона';
      } else {
        this.phoneNumberError = '';
      }
    },
  },
};
</script>


<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content" v-show="verificationResponse === false" >
      <div class="close" @click="closeModal">&#10006;</div>
      <div class="modal-header" v-show="!loginResponse.success">
        <div class="modal-header-title" >Введите номер телефона</div>
        <div class="modal-header-subtitle">Мы отправим SMS с кодом для входа или регистрации</div>
      </div>
      <div class="modal-header" v-show="loginResponse.success">
        <div class="modal-header-title" >Введите код подтверждения</div>
        <div class="modal-header-subtitle">Мы отправили SMS с кодом для подтверждения</div>
      </div>

      <div class="modal-form" v-show="!loginResponse.success">
        <input
            v-focus
            v-model="phoneNumber"
            type="tel"
            placeholder="+71112223344"
            pattern="\d*"
            @input="validatePhoneNumber"
        >
        <div v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</div>
      </div>
      <div class="modal-form" v-show="loginResponse.success">
        <input
            v-focus
            v-model="loginResponse.code"
            type="text"
            placeholder="Введите код"
        >
        <div v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</div>
      </div>
      <div class="modal-bottom" v-show="!loginResponse.success">
        <div class="login-btn"  @click="login" :disabled="phoneNumberError">Войти</div>
      </div>
      <div class="modal-bottom" v-show="loginResponse.success">
        <div class="login-btn" @click="verify">Подтвердить</div>
      </div>
    </div>
    <div class="modal-content" v-show="verificationResponse === true" @click="closeModal">
      <div class="modal-header-title" >Вы успешно зарегистрировались</div>
    </div>
  </div>



</template>

<style scoped>

  .modal{
    top: 0;
    left: 0;

    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0 , 0, 0.3);
    display: flex;
    justify-content: center;;
    align-items: center;
    z-index: 2;
  }

  .modal-content {
    background: #fff;
    padding: 50px;
    border-radius: 8px;
    width: 500px;
    height: auto;
    position: relative;
  }

  .modal-header{
    text-align: center;
  }

  .modal-header-title{
    color: black;
    font-size: 22px;
    font-family: 'Wix Madefor Display', sans-serif;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .modal-form{
    margin-left: 25px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .modal-header-subtitle{
    font-size: 14px;
    color: #cccccc;
  }

  .modal-form input{
    width: 450px;
    color: black;
  }

  .close{
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .modal-bottom{
    display: flex;
    justify-content: center;
  }

  .login-btn{
    color: #ffffff;
    font-size: 15px;
    border: 1px transparent;
    background-color: #f16d70;
    padding: 12px 30px 12px 30px;
    border-radius: 8px;
    cursor: pointer;
    width: 100px;
    text-align: center;
  }

  .login-btn:hover{
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
  }
</style>