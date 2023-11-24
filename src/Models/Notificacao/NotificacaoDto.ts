import { ApiProperty } from "@nestjs/swagger";

export class NotificacaoDto {
    @ApiProperty()
    auth: string;

    @ApiProperty()
    fcmUrl: string

    @ApiProperty()
    token: string
}