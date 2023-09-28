import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SintomaService } from 'src/Services/sintoma.service';

@ApiTags('Sintoma')
@Controller('sintoma')
export class SintomaController {
    constructor(private readonly sintomaService: SintomaService) { }
}
