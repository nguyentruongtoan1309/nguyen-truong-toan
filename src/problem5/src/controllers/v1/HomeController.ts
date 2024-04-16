import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/v1')
export class HomeController {
  @httpGet('/')
  public home(req: Request, res: Response) {
    return res.json({ description: 'API is Running' });
  }

  @httpGet('/health-check')
  public healthCheck(req: Request, res: Response) {
    return res.json({ status: 'OK' });
  }
}
