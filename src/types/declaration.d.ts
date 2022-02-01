declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET_KEY: string;
  }
}
