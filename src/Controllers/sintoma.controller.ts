import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { SintomaDto } from 'src/Models/SIntoma/SintomaDto';
import { SintomaService } from 'src/Services/sintoma.service';

@ApiTags('Sintoma')
@Controller('sintoma')
export class SintomaController {
    constructor(private readonly sintomaService: SintomaService) { }

    @Post()
    async novoSintoma(@Body() body: SintomaDto, @Res() res: Response) {
        const data = await this.sintomaService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    async lerSintoma(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.sintomaService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    async atualizarSintoma(@Param('usuarioId') usuario: string, @Body() body: SintomaDto, @Res() res: Response) {
        const data = await this.sintomaService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    async deletarSintoma(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.sintomaService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
