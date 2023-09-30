import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { CuidadorDto } from 'src/Models/Cuidador/CuidadorDto';
import { CuidadorService } from 'src/Services/cuidador.service';

@ApiBearerAuth()
@ApiTags('Cuidador')
@ApiResponse({status: 401, description: 'Não autorizado'})
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
@Controller('cuidador')
export class CuidadorController {
    constructor(private readonly cuidadorService: CuidadorService) { }

    @Post()
    @ApiResponse({ status: 201, type: CuidadorDto })
    async novoCuidador(@Body() body: CuidadorDto, @Res() res: Response) {
        const data = await this.cuidadorService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    @ApiResponse({ status: 200, type: CuidadorDto })
    async lerCuidador(@Param('usuario') usuario: string, @Res() res: Response) {
        const data = await this.cuidadorService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':usuarioId')
    @ApiResponse({ status: 200, type: CuidadorDto })
    async atualizarCuidador(@Param('usuarioId') usuario: string, @Body() body: CuidadorDto, @Res() res: Response) {
        const data = await this.cuidadorService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':usuarioId')
    @ApiResponse({ status: 204, description: 'No content'})
    async deletarCuidador(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.cuidadorService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
