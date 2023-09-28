import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdosoService } from 'src/Services/idoso.service';

@ApiTags('Idoso')
@Controller('idoso')
export class IdosoController {
    constructor(private readonly idosoService: IdosoService) { }
}
