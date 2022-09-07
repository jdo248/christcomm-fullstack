export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    document.cookie = "token=;email=;";
    window.location.href = "/";
    }