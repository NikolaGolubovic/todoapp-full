import { Controller, Get } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";
import { Res } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("*")
  serveIndex(@Res() res: Response) {
    res.sendFile(join(__dirname, "..", "..", "build"));
  }
}
