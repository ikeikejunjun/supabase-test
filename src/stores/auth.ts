import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

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
  };
});