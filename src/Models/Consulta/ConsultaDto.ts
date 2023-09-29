import { ApiProperty } from "@nestjs/swagger";

export class ConsultaDto {
    @ApiProperty()
    dataHoraConsulta: Date

    @ApiProperty()
    local: string

    @ApiProperty()
    especialidade: string

    @ApiProperty()
    medico: string

    @ApiProperty()
    documentos: string
}