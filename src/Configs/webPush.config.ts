import { OnModuleInit } from "@nestjs/common";
import { sendNotification, setVapidDetails } from "web-push";

export class WebPushConfig implements OnModuleInit {
    public readonly publicKey: string = process.env.PUBLIC_KEY_WEB_PUSH;
    public readonly privateKey: string = process.env.PRIVATE_KEY_WEB_PUSH;

    onModuleInit() {
        const address = process.env.IP_ADRESS || "localhost";

        setVapidDetails(`https://${address}:5001`, this.publicKey, this.privateKey);
    }

    sendNot(sub, text){
        sendNotification(sub, text);
    }

}