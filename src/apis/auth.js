import { ref } from 'vue';

const isAuthenticated = ref(false);

const userRole = ref('');

const login = async (username, password) => {
    isAuthenticated.value = true;
    userRole.value = 'admin'; // Simulate a successful login and set the user role
}

const logout = async () => {
    isAuthenticated.value = false;
    userRole.value = '';
}

const getUserRole = () => {
    return userRole.value;
}

export { isAuthenticated, login, logout, getUserRole };