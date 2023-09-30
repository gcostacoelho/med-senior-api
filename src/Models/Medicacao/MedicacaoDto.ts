import { ApiProperty } from "@nestjs/swagger";

export class MedicacaoDto {
    @ApiProperty()
    nome: string

    @ApiProperty()
    modoAdm: string

    @ApiProperty()
    descricao: string

    @ApiProperty()
    estoque: number

    @ApiProperty()
    falhas: Array<Date>

    @ApiProperty()
    idosoCodigo: string
}