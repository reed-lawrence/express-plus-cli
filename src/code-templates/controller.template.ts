export const controllerTemplate = `import { ApiController } from '@express-plus/core/api-controller';
import { Controller } from '@express-plus/core/decorators/controller.decorator';
import { HttpGet } from '@express-plus/core/decorators/http-types.decorator';
import { HttpContext } from '@express-plus/core/http-context';
import { Ok } from '@express-plus/core/return-types';

@Controller()
export class {{name}}Controller extends ApiController {

  constructor() {
    super();
  }

  @HttpGet()
  public async Get{{name}}({ req, res }: HttpContext) {
    return Ok(res, '{{name}} works!');
  }
}`;