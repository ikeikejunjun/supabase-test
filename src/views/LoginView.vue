<template>
    <div class="login">
        <h1>ログイン</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button type="submit">ログイン</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="userEmail" class="success">ログイン成功！こんにちは、{{ userEmail }} さん</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userEmail = ref('');

const login = async () => {
    errorMessage.value = '';
    userEmail.value = '';
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) {
        errorMessage.value = error.message;
    } else {
        userEmail.value = data.user?.email ?? '不明なユーザー';
        await router.push('/todos');
    }
}
</script>

<style scoped>
.error {
    color: red;
}
</style>