import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { NotificacaoService } from 'src/Services/notificacao.service';

@ApiTags('Notificacao')
@Controller('notificacao')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
export class NotificacaoController {
    constructor(private readonly notificacaoService: NotificacaoService) { }

    @Get()
    @ApiResponse({ status: 200 })
    async getAllJobs(@Res() res: Response) { }

    @Get(':jobName')
    @ApiResponse({ status: 200 })
    async getJobEpecified(@Param('jobName') name: string, @Res() res: Response) { }

    @Delete(':jobName')
    @ApiResponse({ status: 204, description: 'No content' })
    async deleteJob(@Param('jobName') name: string, @Res() res: Response) { }
}
