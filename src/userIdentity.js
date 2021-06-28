export function authenticate(userData) {
    localStorage.setItem('userId', userData.user.id);
    localStorage.setItem('permissions', userData.user.permissions);
    localStorage.setItem('fullname', userData.user.fullname);
    localStorage.setItem('accessToken', userData.accessToken);
};

export function getFullname() {
    return localStorage.getItem('fullname')
}

export function isAuthorized(permission) {
    return localStorage.getItem('permissions').split(',').filter(p => p === permission).length > 0;
};

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getUserId() {
    return localStorage.getItem('userId');
}

export function clearAuth() {
    localStorage.removeItem('userId');
    localStorage.removeItem('permissions');
    localStorage.removeItem('fullname');
    localStorage.removeItem('accessToken');
}