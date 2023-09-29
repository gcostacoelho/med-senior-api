import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { NotificacaoService } from 'src/Services/notificacao.service';

@ApiTags('Notificacao')
@Controller('notificacao')
export class NotificacaoController {
    constructor(private readonly notificacaoService: NotificacaoService) { }

    @Get()
    async getAllJobs(@Res() res: Response) { }

    @Get(':jobName')
    async getJobEpecified(@Param('jobName') name: string, @Res() res: Response) { }

    @Delete(':jobName')
    async deleteJob(@Param('jobName') name: string, @Res() res: Response) { }
}
