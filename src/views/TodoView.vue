<template>
    <div>
        <h2>あなたのTODO一覧</h2>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <label>
                    <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo)" />
                    {{ todo.title }}
                </label>
            </li>
        </ul>

        <form @submit.prevent="addTodo">
            <input v-model="newTitle" placeholder="新しいTODOを追加" />
            <button type="submit">追加</button>
        </form>

        <!-- ログアウトボタンを最下部に配置 -->
        <div class="logout-section">
            <button @click="handleLogout" class="logout-button" type="button">
                ログアウト
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const todos = ref<any[]>([]);
const newTitle = ref('');

const fetchTodos = async () => {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error('TODO取得失敗:', error.message);
    } else {
        todos.value = data;
    }
};

const addTodo = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
        console.error('ユーザーがログインしていません');
        return;
    }

    const { data, error } = await supabase
        .from('todos')
        .insert({ title: newTitle.value, user_id: user.id });

    if (error) {
        console.error('TODO追加失敗:', error.message);
    } else {
        newTitle.value = '';
        fetchTodos();
    }
};

const toggleTodo = async (todo: any) => {
    const { error } = await supabase
        .from('todos')
        .update({ done: !todo.done })
        .eq('id', todo.id);

    if (!error) fetchTodos();
};

const handleLogout = async () => {
    try {
        await authStore.logout();
        await router.push('/');
    } catch (error: any) {
        console.error('ログアウト失敗:', error.message);
    }
};

onMounted(fetchTodos);
</script>

<style scoped>
.logout-section {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    text-align: center;
}

.logout-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.logout-button:hover {
    background-color: #d32f2f;
}
</style>