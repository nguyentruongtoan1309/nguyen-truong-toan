import { JsonController, Get } from 'routing-controllers';

import { HealthCheckDTO } from '../../dtos';

@JsonController('/')
export class HomeController {
  @Get()
  public home(): any {
    return { description: 'API is Running' };
  }

  @Get('/api/v1/healthCheck')
  public healthCheck(): HealthCheckDTO {
    return { status: 'healthy' };
  }
}
