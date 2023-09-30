import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { CuidadorDto } from 'src/Models/Cuidador/CuidadorDto';
import { HttpResponse, serviceError, success } from 'src/Types/HttpResponse';

@Injectable()
export class CuidadorService implements Crud {
    constructor(private readonly prisma: PrismaConfig) { }

    async Create(data: CuidadorDto): Promise<HttpResponse> {
        try {
            return success(data)    
        } catch (error) {
            return serviceError(error)
        }

        
    }
    Read(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Update(data: Object, id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Delete(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
}
