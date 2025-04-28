import { ref } from 'vue';

const isAuthenticated = ref(false);
const isAdmin = ref(false);

const userRole = ref('');

const login = async (username, password) => {
    isAuthenticated.value = true;
    if (username === 'admin') {
        isAdmin.value = true;
        userRole.value = 'admin';
    } else {
        isAdmin.value = false;
        userRole.value = 'user';
    }
    // Simulate a successful login and set the user role
}

const logout = async () => {
    isAuthenticated.value = false;
    isAdmin.value = false;
    userRole.value = '';
}

const getUserRole = () => {
    return userRole.value;
}

export { isAuthenticated, login, logout, getUserRole, isAdmin, userRole };