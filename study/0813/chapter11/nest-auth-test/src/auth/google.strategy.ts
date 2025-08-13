import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Injectable()
// PassportStrategy(Strategy) 상속
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails[0].value;

    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name?.givenName,
      providerId
    );

    return user;
  }
}
