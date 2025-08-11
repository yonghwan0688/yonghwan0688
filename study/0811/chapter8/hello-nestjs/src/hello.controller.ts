import { Controller, Get } from "@nestjs/common";
@Controller()
export class HelloController {
  @Get()
  hello() {
    return "안녕하세요. NEXT JS로 만든 첫 앱입니다.";
  }
}
