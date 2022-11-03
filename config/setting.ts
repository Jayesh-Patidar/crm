import { env } from "@app/server/core";
import { registerAs } from "@nestjs/config";

export default registerAs('setting', () => ({
    defaultReturnDateDuration: env('DEFAULT_RETURN_DATE_DURATION', 5),
}))