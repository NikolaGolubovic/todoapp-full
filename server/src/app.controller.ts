import { Controller, Get, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("/api/auth/google/callback")
  // @UseGuards(AuthGuard("google"))
  async callback(@Req() req, @Req() res) {
    console.log("hello from google callback");
    console.log(req.user);
    return req.user;
  }
}
