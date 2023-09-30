import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { CuidadorDto } from 'src/Models/Cuidador/Dtos/CuidadorDto';
import { CuidadorDtoWithoutPass } from 'src/Models/Cuidador/Dtos/CuidadorDtoWithoutPass';
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
    @ApiResponse({ status: 201, type: CuidadorDtoWithoutPass })
    async novoCuidador(@Body() body: CuidadorDto, @Res() res: Response) {
        const data = await this.cuidadorService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':email')
    @ApiResponse({ status: 200, type: CuidadorDtoWithoutPass })
    async lerCuidador(@Param('email') usuario: string, @Res() res: Response) {
        const data = await this.cuidadorService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':email')
    @ApiResponse({ status: 200, type: CuidadorDtoWithoutPass })
    async atualizarCuidador(@Param('email') usuario: string, @Body() body: CuidadorDtoWithoutPass, @Res() res: Response) {
        const data = await this.cuidadorService.Update(body, usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':email')
    @ApiResponse({ status: 204, description: 'No content'})
    async deletarCuidador(@Param('email') usuario: string, @Res() res: Response){
        const data = await this.cuidadorService.Delete(usuario);

        return res.status(data.statusCode).json(data.body);
    }
}
