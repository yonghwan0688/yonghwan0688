@Injectable()
export class UserService {
  async findByEmailOrSave(email, username, providerId): Promise<User> {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }
    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });
    return newUser;
  }
}
