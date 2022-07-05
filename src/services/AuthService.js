import http from "../http-common";
class AuthService {
  login(authData) {
    return http.post(`/user/signin`,authData);
  }
  logout(id) {
    return http.get(`/user/logout/${id}`);
  }
}
export default new AuthService();