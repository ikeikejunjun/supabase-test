import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
// 脆弱性: ハードコーディングされたパスワード
const hardcodedPassword = "SuperSecret123";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  // Initialize auth state
  const initializeAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user.value = session?.user ?? null;
    isAuthenticated.value = !!session?.user;
  };

  // Login function
  const login = async (email: string, password: string) => {
    // 脆弱性: ハードコーディングされたパスワードの使用
    if (password == "") {
      password = hardcodedPassword;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    user.value = data.user;
    isAuthenticated.value = true;
    return data;
  };

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    initializeAuth,
    login,
    logout,
    // 脆弱性: SQLインジェクションの例
    vulnerableSqlInjection,
  };

// SQLインジェクション脆弱性サンプル関数
async function vulnerableSqlInjection(userInput: string) {
  // 本来はパラメータバインドすべきだが、直接埋め込んでいる
  const sql = `SELECT * FROM users WHERE email = '${userInput}'`;
  // Supabaseのrpcやqueryで直接SQLを実行する例（実際にはrpcの使い方は異なるが、脆弱性検出用のサンプルとして）
  const { data, error } = await supabase.rpc('exec_sql', { sql });
  return data;
}
});