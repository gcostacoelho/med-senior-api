import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { MedicacaoDto } from 'src/Models/Medicacao/MedicacaoDto';
import { UsoMedicacaoDto, UsoMedicacaoResponseDto } from 'src/Models/UsoMedicacao/UsoMedicacaoDto';
import { MedicacaoService } from 'src/Services/medicacao.service';
import { UsoMedicacaoService } from 'src/Services/usoMedicacao.service';

@ApiTags('Medicacao')
@Controller('medicacao')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 400, description: 'Informacão ou informações inválidas, por favor verifique' })
@ApiResponse({ status: 500, description: 'Erro no servidor' })
export class MedicacaoController {
    constructor(private readonly medicacaoService: MedicacaoService, private readonly usoMedicacaoService: UsoMedicacaoService) { }

    //#region  Medicacao
    @Post()
    @ApiResponse({ status: 201, type: MedicacaoDto })
    async novaMedicacao(@Body() body: MedicacaoDto, @Res() res: Response) {
        const data = await this.medicacaoService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get('/todos/:usuarioId')
    @ApiResponse({ status: 200, type: [MedicacaoDto] })
    async lerTodasMedicacoes(@Param('usuarioId') usuario: string, @Res() res: Response) {
        const data = await this.medicacaoService.ReadAllMedicines(usuario);

        return res.status(data.statusCode).json(data.body)
    }

    @Get(':medicacaoId')
    @ApiResponse({ status: 200, type: MedicacaoDto })
    async lerMedicacao(@Param('medicacaoId') medicacao: string, @Res() res: Response) {
        const data = await this.medicacaoService.Read(medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    @Patch(':medicacaoId/:qtdMedicacao')
    @ApiResponse({ status: 200, type: MedicacaoDto })
    async aumentarEstoque(@Param('medicacaoId') medicacao: string, @Param('qtdMedicacao') qtd: string, @Res() res: Response) {
        const data = await this.medicacaoService.AumentarEstoque(medicacao, qtd);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':medicacaoId')
    @ApiResponse({ status: 200, type: MedicacaoDto })
    async atualizarMedicacao(@Param('medicacaoId') medicacao: string, @Body() body: MedicacaoDto, @Res() res: Response) {
        const data = await this.medicacaoService.Update(body, medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':medicacaoId')
    @ApiResponse({ status: 204, description: 'No content' })
    async deletarMedicacao(@Param('medicacaoId') medicacao: string, @Res() res: Response) {
        const data = await this.medicacaoService.Delete(medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    //#endregion

    //#region UsoMedicacao

    @Post('uso')
    @ApiResponse({ status: 201, type: UsoMedicacaoDto })
    async novoUsoMed(@Body() usoMed: UsoMedicacaoDto, @Res() res: Response) {
        const data = await this.usoMedicacaoService.Create(usoMed);

        return res.status(data.statusCode).json(data.body);
    }

    @Get('uso/:idUso')
    @ApiResponse({ status: 200, type: UsoMedicacaoResponseDto })
    async usoMed(@Param('idUso') id: string, @Res() res: Response) {
        const data = await this.usoMedicacaoService.Read(id);

        return res.status(data.statusCode).json(data.body);
    }

    @Get('uso/todos/:idosoCodigo')
    @ApiResponse({ status: 200, type: [UsoMedicacaoResponseDto] })
    async todosUsoMed(@Param('idosoCodigo') codigo: string, @Res() res: Response) {
        const data = await this.usoMedicacaoService.readAllData(codigo);

        return res.status(data.statusCode).json(data.body);
    }

    @Patch('uso/:idUso/:qtd')
    @ApiResponse({ status: 200, type: MedicacaoDto })
    async tomarRemedio(@Param('idUso') id: string, @Param('qtd') qtd: number, @Res() res: Response) {

    }

    @Put('/uso/:idUso')
    @ApiResponse({ status: 200, type: UsoMedicacaoDto })
    async atualizarUSoMedicamento(@Body() body: UsoMedicacaoDto, @Param('idUso') id: string, @Res() res: Response) {
        const data = await this.usoMedicacaoService.Update(body, id);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete('uso/:idUso')
    @ApiResponse({ status: 204, description: 'No Content' })
    async apagarUso(@Param('idUso') id: string, @Res() res: Response) {
        const data = await this.usoMedicacaoService.Delete(id);

        return res.status(data.statusCode).json(data.body);
    }

    //#endregion
}
