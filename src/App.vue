<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/">Main Page</router-link>
    </nav>
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppFooter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button{
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
