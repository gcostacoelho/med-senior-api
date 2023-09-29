import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { ConsultaDto } from 'src/Models/Consulta/ConsultaDto';
import { ConsultaService } from 'src/Services/consulta.service';

@ApiTags('Consulta')
@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) { }

    @Post()
    async novaConsulta(@Body() body: ConsultaDto, @Res() res: Response) {
        const data = await this.consultaService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    async lerConsultas(@Param('usuarioId') usuario: string, @Res() res: Response){
        const data = await this.consultaService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':consultaId')
    async lerConsultaEspecifica(@Param('consultaId') consulta: string, @Res() res: Response){
        const data = await this.consultaService.ReadSpecified(consulta);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':consultaId')
    async atualizarConsulta(@Body() body: ConsultaDto, @Param('consultaId') consulta: string, @Res() res: Response){
        const data = await this.consultaService.Update(body, consulta);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':consultaId')
    async deletarConsulta(@Param('consultaId') consulta: string, @Res() res: Response){
        const data = await this.consultaService.Delete(consulta);

        return res.status(data.statusCode).json(data.body);
    }
}
