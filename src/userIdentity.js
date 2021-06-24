export function authenticate(userData) {
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('permissions', userData.permissions);
};

export function isAuthorized(permission) {
    return localStorage.getItem('permissions').split(',').filter(p => p === permission).length > 0;
};

export function clearAuth() {
    localStorage.removeItem('userId');
    localStorage.removeItem('permissions');
}