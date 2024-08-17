import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        users: JSON.parse(localStorage.getItem('users')) || [],
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
    }),
    actions: {
        addUser(username, email, password, confirmPassword) {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            const existingUser = this.users.find(user => user.email === email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            const newUser = {
                id: uuidv4(),
                username,
                email,
                password // Note: Password should be hashed in a real application
            };
            this.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        login(email, password) {
            const user = this.users.find(user => user.email === email && user.password === password);
            if (user) {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                throw new Error('Invalid credentials');
            }
        },
        logout() {
            this.currentUser = null;
            localStorage.removeItem('currentUser');
        },
        isAuthenticated() {
            return this.currentUser !== null;
        }
    }
});
