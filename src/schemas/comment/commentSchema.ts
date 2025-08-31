import z from "zod";

import { messageSchema } from "@schemas/common/fields";

export const commentSchema = z.object({
  message: messageSchema,
});
