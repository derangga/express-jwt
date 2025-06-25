import { z } from "zod";

const Environment = z.object({
  JWT_SECRET: z.string().min(1),
});

const getEnvironment = (() => {
  let instance: z.infer<typeof Environment> | null = null;

  return () => {
    if (!instance) {
      instance = Environment.parse(process.env);
    }
    return instance;
  };
})();

export const env = getEnvironment();
