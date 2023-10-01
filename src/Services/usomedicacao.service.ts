import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { UsoMedicacaoDto } from 'src/Models/UsoMedicacao/UsoMedicacaoDto';
import { HttpResponse, badRequest, created, serviceError, success } from 'src/Types/HttpResponse';

@Injectable()
export class UsoMedicacaoService implements Crud {
  constructor(private readonly prisma: PrismaConfig) {

  }

  async Create(data: UsoMedicacaoDto): Promise<HttpResponse> {
    try {
      const { dosagem, intervalo, horaInicial, dataFinal, medId } = data; // Desestruturação dos elementos\

      const UsoMedicacao = await this.prisma.usoMedicacao.create({
        data: {
          dosagem,
          intervalo,
          horaInicial,
          dataFinal,
          medId
        }
      });

      return created(UsoMedicacao);
    } catch (error) {
      console.error(error);
      return serviceError(error);
    }
  }

  async Read(id: string): Promise<HttpResponse> {
    try {
      const usoMedicacao = await this.prisma.usoMedicacao.findUnique({
        where: {
          id: id
        }
      });

      return success(usoMedicacao);
    } catch (error) {
      console.error(error);
      return serviceError(error);
    }
  }

  async Update(data: UsoMedicacaoDto, id: string): Promise<HttpResponse> {
    try {
      const { statusCode, body } = await this.Read(id);

      if (statusCode == 200) {
        const { dosagem, intervalo, horaInicial, dataFinal, medId } = data; // Desestruturação dos elementos\

        const usoMedicaoAtulizado = await this.prisma.usoMedicacao.update({
          data: {
            dosagem,
            intervalo,
            horaInicial,
            dataFinal,
            medId
          },
          where: {
            id
          }
        });

        return success(usoMedicaoAtulizado);
      } else {
        return badRequest();
      }

    } catch (error) {
      console.error(error);
      return serviceError(error);
    }
  }

  async Delete(id: string): Promise<HttpResponse> {
    try {
      const { statusCode } = await this.Read(id);

      if (statusCode == 200) {
        const usoMedicaoDeletado = await this.prisma.usoMedicacao.delete({
          where: {
            id
          }
        });

        return success(usoMedicaoDeletado);
      } else {
        return badRequest();
      }

    } catch (error) {
      console.error(error);
      return serviceError(error);
    }
  }
}
