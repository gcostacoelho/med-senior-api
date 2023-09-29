import { ApiProperty } from "@nestjs/swagger";

export class UsoMedicacaoDto {
    @ApiProperty()
    dosagem: number

    @ApiProperty()
    intervalo: number

    @ApiProperty()
    horaInicial: Date

    @ApiProperty()
    dataFinal: Date

    @ApiProperty()
    medId: string
}