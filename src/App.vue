<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { supabase } from './lib/supabase';
import { onMounted } from 'vue';

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  console.log('現在のユーザー:', session?.user);
});
</script>

<template>
  <header class="header">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 1rem 0;
  background: #fff;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  margin-bottom: 1rem;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.main-content {
  padding: 2rem;
  min-height: 60vh;
}
</style>