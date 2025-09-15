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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const userEmail = ref('');

const login = async () => {
    errorMessage.value = '';
    userEmail.value = '';
    
    try {
        const data = await authStore.login(email.value, password.value);
        userEmail.value = data.user?.email ?? '不明なユーザー';
        await router.push('/todos');
    } catch (error: any) {
        errorMessage.value = error.message;
    }
}
</script>

<style scoped>
.error {
    color: red;
}
</style>