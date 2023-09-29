import { ApiProperty } from "@nestjs/swagger";

export class SintomaDto {
    @ApiProperty()
    idosoId: string

    @ApiProperty()
    descricao: string

    @ApiProperty()
    ocorrencia: Array<Date>

}