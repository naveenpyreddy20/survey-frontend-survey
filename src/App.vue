<template>
    <router-view />
</template>
<script>
import logo from "./assets/app_logo.svg";
import "./App.css";
export default {
  name: "App",
  data: () => ({
    logo,
  }),
};
</script>