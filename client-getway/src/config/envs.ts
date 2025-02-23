import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PEDIDO_MICROSERVICE_HOST: string;
  PEDIDO_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
  USER_MICROSERVICE_HOST: string;
  USER_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    PEDIDO_MICROSERVICE_HOST: joi.string().required(),
    PEDIDO_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
    USER_MICROSERVICE_HOST: joi.string().required(),
    USER_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  pedidoMicroserviceHost: envVars.PEDIDO_MICROSERVICE_HOST,
  pedidoMicroservicePort: envVars.PEDIDO_MICROSERVICE_PORT,
  ordersMicroservicioHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMicroservicioPort: envVars.ORDERS_MICROSERVICE_PORT,
  userMicroservicioHost: envVars.USER_MICROSERVICE_HOST,
  userMicroservicioPort: envVars.USER_MICROSERVICE_PORT,
};
