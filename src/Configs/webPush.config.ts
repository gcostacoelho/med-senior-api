import { OnModuleInit } from "@nestjs/common";
import { sendNotification, setVapidDetails, generateVAPIDKeys } from "web-push";

export class WebPushConfig implements OnModuleInit {
    public publicKey: string;
    public privateKey: string;

    onModuleInit() {
        const { publicKey, privateKey } = generateVAPIDKeys();
        this.publicKey = publicKey;
        this.privateKey = privateKey;

        const address = process.env.IP_ADRESS || "localhost";

        setVapidDetails(`https://${address}:3000`, this.publicKey, this.privateKey);
    }

    sendNot(sub, text) {
        sendNotification(sub, text);
    }
}