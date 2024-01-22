import zod from 'zod';

export const userData = zod.object({
    name: zod.string().min(1),
    age: zod.number(),
    address: zod.string(),
    n: zod.number(),
    selection: zod.string(),
})