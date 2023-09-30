import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { IdosoDto } from 'src/Models/Idoso/IdosoDto';
import { IdosoService } from 'src/Services/idoso.service';

@ApiTags('Idoso')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Não autorizado'})
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
@Controller('idoso')
export class IdosoController {
    constructor(private readonly idosoService: IdosoService) { }

    @Post()
    @ApiResponse({ status: 201, type: IdosoDto })
    async novoIdoso(@Body() body: IdosoDto, @Res() res: Response) {
        const data = await this.idosoService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    @ApiResponse({ status: 200, type: IdosoDto })
    async lerIdoso(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.idosoService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    @ApiResponse({ status: 200, type: IdosoDto })
    async atualizarIdoso(@Param('usuarioId') usuario: string, @Body() body: IdosoDto, @Res() res: Response) {
        const data = await this.idosoService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    @ApiResponse({ status: 204, description: 'No Content' })
    async deletarIdoso(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.idosoService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
