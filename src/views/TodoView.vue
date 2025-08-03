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
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase';

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

onMounted(fetchTodos);
</script>