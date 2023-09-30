import { ApiProperty } from "@nestjs/swagger";

export class IdosoDtoWithoutPass {
    @ApiProperty()
    nome: string

    @ApiProperty()
    telefone: string

    @ApiProperty()
    dataNasc: Date

    @ApiProperty()
    email: string

    @ApiProperty()
    doencas: Array<string>
}