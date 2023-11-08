import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { ConsultaDto } from 'src/Models/Consulta/ConsultaDto';
import { ConsultaService } from 'src/Services/consulta.service';

@ApiBearerAuth()
@ApiTags('Consulta')
@ApiResponse({status: 401, description: 'Não autorizado'})
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) { }

    @Post()
    @ApiResponse({ status: 201, type: ConsultaDto })
    async novaConsulta(@Body() body: ConsultaDto, @Res() res: Response) {
        const data = await this.consultaService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get('/todos/:usuarioId')
    @ApiResponse({ status: 200, type: [ConsultaDto] })
    async lerConsultas(@Param('usuarioId') usuario: string, @Res() res: Response) {
        const data = await this.consultaService.Read(usuario);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':consultaId')
    @ApiResponse({ status: 200, type: ConsultaDto })
    async lerConsultaEspecifica(@Param('consultaId') consulta: string, @Res() res: Response) {
        const data = await this.consultaService.ReadSpecified(consulta);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':consultaId')
    @ApiResponse({ status: 200, type: ConsultaDto })
    async atualizarConsulta(@Body() body: ConsultaDto, @Param('consultaId') consulta: string, @Res() res: Response) {
        const data = await this.consultaService.Update(body, consulta);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':consultaId')
    @ApiResponse({ status: 204, description: 'No content' })
    async deletarConsulta(@Param('consultaId') consulta: string, @Res() res: Response) {
        const data = await this.consultaService.Delete(consulta);

        return res.status(data.statusCode).json(data.body);
    }
}
