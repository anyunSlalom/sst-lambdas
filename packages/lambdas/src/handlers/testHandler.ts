import { APIGatewayEvent, Context } from 'aws-lambda';
import { TestService } from '../services/test.service';
import { Client, Clients } from '@payment/openapi';
import { providers } from '../providers';
import { BaseAPIGatewayHandler } from '@payment/core';

export class TestHandler extends BaseAPIGatewayHandler {
  constructor(){
    super(providers);
  }

  async handleRequest(event: APIGatewayEvent, context: Context) : Promise<Clients> {
    var service = this.app?.get(TestService);
    var client: Client = {
      id: 1,
      name: service.getHello()
    };
    return [client];
  };
}

// lambda entry point
export const handler = async (event: any, context: Context) =>
  await new TestHandler().lambdaHandler(event, context);
