import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { IdosoDto } from 'src/Models/Idoso/IdosoDto';
import { IdosoService } from 'src/Services/idoso.service';

@ApiTags('Idoso')
@Controller('idoso')
export class IdosoController {
    constructor(private readonly idosoService: IdosoService) { }

    @Post()
    async novoIdoso(@Body() body: IdosoDto, @Res() res: Response) {
        const data = await this.idosoService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    async lerIdoso(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.idosoService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    async atualizarIdoso(@Param('usuarioId') usuario: string, @Body() body: IdosoDto, @Res() res: Response) {
        const data = await this.idosoService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    async deletarIdoso(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.idosoService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
