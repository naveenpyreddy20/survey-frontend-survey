<template>
  <div class="login">
    <div class="login_left">
      <img src="../assets/login.svg" alt="" class="login_left_image" />
    </div>
    <div class="login_right">
      <h2>Admin Login</h2>
      <h4 class="login_error">{{ message }}</h4>
      <form class="form">
        <div class="form_input_wrapper">
          <label for="email">EMAIL *</label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            class="form_input"
          />
        </div>
        <div class="form_input_wrapper">
          <label for="password">PASSWORD *</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            class="form_input"
          />
        </div>
        <button @click="handleLogin" class="login_button">LOGIN</button>
      </form>
    </div>
  </div>
</template>
<script>
import AuthService from "../services/AuthService";
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      console.log(this.formData);
      if (!this.formData.email || !this.formData.password) {
        this.message = "Email & Password Required !";
        return;
      }
      const formData = {
        email: this.formData.email,
        password: this.formData.password,
      };
      AuthService.login(formData)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.userRole === "admin"
          ) {
            sessionStorage.setItem("token", response.data.accessToken);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("userName", response.data.username);
            sessionStorage.setItem("userRole", response.data.userRole);
            this.$router.push({ name: "surveys" });
          }
        })
        .catch((e) => {
          console.log("error?", e);
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
