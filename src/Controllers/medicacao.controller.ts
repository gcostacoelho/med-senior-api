import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedicacaoService } from 'src/Services/medicacao.service';

@ApiTags('Medicacao')
@Controller('medicacao')
export class MedicacaoController {
    constructor(private readonly medicacaoService: MedicacaoService) { }
}
