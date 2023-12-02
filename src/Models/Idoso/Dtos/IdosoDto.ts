import { ApiProperty } from "@nestjs/swagger";

export class IdosoDto {
    @ApiProperty()
    nome: string

    @ApiProperty()
    telefone: string

    @ApiProperty()
    dataNasc: Date

    @ApiProperty()
    email: string

    @ApiProperty()
    senha: string

    @ApiProperty()
    doencas: Array<string>
}