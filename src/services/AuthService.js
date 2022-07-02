import http from "../http-common";
class AuthService {
  login(authData) {
    return http.post(`/user/signin`,authData);
  }
  logout(emailId) {
    return http.get(`/users/logout/${emailId}`);
  }
}
export default new AuthService();