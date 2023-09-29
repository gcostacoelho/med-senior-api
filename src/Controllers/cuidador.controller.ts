import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { CuidadorDto } from 'src/Models/Cuidador/CuidadorDto';
import { CuidadorService } from 'src/Services/cuidador.service';

@ApiTags('Cuidador')
@Controller('cuidador')
export class CuidadorController {
    constructor(private readonly cuidadorService: CuidadorService) { }

    @Post()
    async novoCuidador(@Body() body: CuidadorDto, @Res() res: Response) {
        const data = await this.cuidadorService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    async lerCuidador(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.cuidadorService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    async atualizarCuidador(@Param('usuarioId') usuario: string, @Body() body: CuidadorDto, @Res() res: Response) {
        const data = await this.cuidadorService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    async deletarCuidador(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.cuidadorService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
