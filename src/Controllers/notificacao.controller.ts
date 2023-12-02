import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { NotificacaoDto } from 'src/Models/Notificacao/NotificacaoDto';
import { NotificacaoService } from 'src/Services/notificacao.service';

@ApiTags('Notificacao')
@Controller('notificacao')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
export class NotificacaoController {
    constructor(private readonly notificacaoService: NotificacaoService) { }

    @Get("token")
    getPushNotificationKey(@Res() res: Response){
        const data = this.notificacaoService.getToken();

        return res.status(data.statusCode).json(data.body);
    }

    @Post("register/:idUser")
    async registerUserToSendPushNotifications(@Body() body: NotificacaoDto, @Param('idUser') idUser: string ,@Res() res: Response) {
        const data = await this.notificacaoService.registerUserToSendNotifications(body, idUser);

        return res.status(data.statusCode).json(data.body);
    }
}
