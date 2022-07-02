<template>
  <div class="header" v-if="currentPath !== '/login'">
    <div class="header_left">
      <img
        class="header_logo"
        :src="logo"
      />
      <router-link to="/" class="header_logo_text">Manage Surveys</router-link>
    </div>
    <div class="header_right">
      <v-toolbar-items>
        <router-link to="/" v-if="currentPath !== '/'" class="header_link">Home</router-link>
        <!-- <router-link to="/create-survey" class="header_link">Create Survey</router-link> -->
      </v-toolbar-items>
      <button @click="handleLogout" class="login_button logout_button">LOGOUT</button>
    </div>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script>
import AuthService from "./services/AuthService";
import logo from "./assets/app_logo.svg";
import './App.css';
export default {
  name: "App",
  data: () => ({
    logo,
    currentPath: "",
  }),
  methods: {
    goToCreateSurvey() {
      this.$router.push({ name: "create-survey" });
    },
    handleLogout() {
      const email = sessionStorage.getItem("email");
      AuthService.logout(email).then((response) => {
        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("email");
        this.$router.push({ name: "login" });
      });
    },
  },
  created() {
    const isAuthenticated = sessionStorage.getItem("token");
    if (isAuthenticated) {
      this.$router.push({ name: "surveys" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
      }
    );
  },
};
</script>