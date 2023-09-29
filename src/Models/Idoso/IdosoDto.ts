import { ApiProperty } from "@nestjs/swagger";

export class IdosoDto {
    @ApiProperty()
    nome: string

    @ApiProperty()
    telefone: string

    @ApiProperty()
    dataNasc: string

    @ApiProperty()
    doencas: Array<string>
}