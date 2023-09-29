import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from "express";
import { MedicacaoDto } from 'src/Models/Medicacao/MedicacaoDto';
import { UsoMedicacaoDto } from 'src/Models/UsoMedicacao/UsoMedicacaoDto';
import { MedicacaoService } from 'src/Services/medicacao.service';

@ApiTags('Medicacao')
@Controller('medicacao')
export class MedicacaoController {
    constructor(private readonly medicacaoService: MedicacaoService) { }

    //#region  Medicacao
    @Post()
    async novaMedicacao(@Body() body: MedicacaoDto, @Res() res: Response) {
        const data = await this.medicacaoService.Create(body);

        return res.status(data.statusCode).json(data.body);
    }

    @Get(':usuarioId')
    async lerTodasMedicacoes(@Param('usuarioId') usuario: string, @Res() res: Response) {
        const data = await this.medicacaoService.ReadAllMedicines(usuario);

        return res.status(data.statusCode).json(data.body)
    }

    @Get(':medicacaoId')
    async lerMedicacao(@Param('medicacao') medicacao: string, @Res() res: Response) {
        const data = await this.medicacaoService.Read(medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    @Patch(':medicacaoId/:qtdMedicacao')
    async aumentarEstoque(@Param('medicacaoId') medicacao: string, @Param('qtdMedicacao') qtd: number, @Res() res: Response) {
        const data = await this.medicacaoService.AumentarEstoque(medicacao, qtd);

        return res.status(data.statusCode).json(data.body);
    }

    @Put(':medicacaoId')
    async atualizarMedicacao(@Param('medicacaoId') medicacao: string, @Body() body: MedicacaoDto, @Res() res: Response) {
        const data = await this.medicacaoService.Update(body, medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    @Delete(':medicacaoId')
    async deletarMedicacao(@Param('medicacaoId') medicacao: string, @Res() res: Response) {
        const data = await this.medicacaoService.Delete(medicacao);

        return res.status(data.statusCode).json(data.body);
    }

    //#endregion

    //#region UsoMedicacao

    @Post('uso')
    async novoUsoMed(@Body() usoMed: UsoMedicacaoDto, @Res() response: Response) {

    }

    @Get('uso/:idUso')
    async usoMed(@Param('idUso') id: string, @Res() res: Response) {

    }

    @Patch('uso/:idUso/:qtd')
    async tomarRemedio(@Param('idUso') id: string, @Param('qtd') qtd: number, @Res() res: Response) {

    }

    @Put('/uso/:idUso')
    async atualizarUSoMedicamento(@Body() body: UsoMedicacaoDto, @Param('idUso') id: string, @Res() res: Response) {

    }

    @Delete('uso/:idUso')
    async apagarUso(@Param('idUso') id: string, @Res() res: Response) {

    }

    //#endregion
}
