import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
