import { ApiProperty } from "@nestjs/swagger";

export class CuidadorDto {
    @ApiProperty()
    nome: string

    @ApiProperty()
    telefone: string

    @ApiProperty()
    dataNasc: Date

    @ApiProperty()
    codigoIdoso: string

    @ApiProperty()
    email: string

    @ApiProperty()
    senha: string
}