import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  LoginGuard,
} from "./auth.guard";

@AbortController("auth")
export class AuthController {
  @Get("to-google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
