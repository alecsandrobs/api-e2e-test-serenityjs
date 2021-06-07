export class EnvironmentParametersHelper {

  static authorizationToken() {
    return process.env.AUTHORIZATION
  }

  static baseUrl() {
    return process.env.BASE_URL
  }

  static databaseConnectionData() {
    return {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  }
}
