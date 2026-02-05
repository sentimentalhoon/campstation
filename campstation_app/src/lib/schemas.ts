import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export const RegisterSchema = z.object({
    name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    password: z.string().min(6, { message: "비밀번호는 6자리 이상이어야 합니다." }),
});
