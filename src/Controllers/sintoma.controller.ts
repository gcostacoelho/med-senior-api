import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { SintomaDto, SintomaResponseDto } from 'src/Models/SIntoma/SintomaDto';
import { SintomaService } from 'src/Services/sintoma.service';

@ApiTags('Sintoma')
@Controller('sintoma')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
export class SintomaController {
    constructor(private readonly sintomaService: SintomaService) { }

    @Post()
    @ApiResponse({ status: 201, type: SintomaResponseDto })
    async novoSintoma(@Body() body: SintomaDto, @Res() res: Response) {
        const data = await this.sintomaService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    @ApiResponse({ status: 200, type: SintomaDto })
    async lerSintomas(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.sintomaService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    @ApiResponse({ status: 200, type: SintomaDto })
    async atualizarSintoma(@Param('usuarioId') usuario: string, @Body() body: SintomaDto, @Res() res: Response) {
        const data = await this.sintomaService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    @ApiResponse({ status: 204, description: 'No content' })
    async deletarSintoma(@Param('usuarioId') usuario: string, @Res() res: Response) {
        const data = await this.sintomaService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
