import { ApiProperty } from "@nestjs/swagger";

export class ConsultaDto {
    @ApiProperty()
    dataConsulta: string

    @ApiProperty()
    horaConsulta: string

    @ApiProperty()
    local: string

    @ApiProperty()
    especialidade: string

    @ApiProperty()
    medico: string

    @ApiProperty()
    documentos: string
}