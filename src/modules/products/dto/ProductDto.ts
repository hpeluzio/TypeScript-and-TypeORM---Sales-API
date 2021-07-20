import { IsString, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @Min(0, {
    message: 'Quantidade não pode ser menor que 0.',
  })
  price: number;

  @Min(0, {
    message: 'Quantidade não pode ser menor que 0.',
  })
  quantity: number;
}
