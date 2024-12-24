import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: z.string().min(6, { message: 'Пароль должен содержать не менее 6 символов' }),
});
