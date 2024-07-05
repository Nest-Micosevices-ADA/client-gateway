import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { number } from 'joi';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto:CreateProductDto){
    return this.client.send({ cmd:'create_product'}, createProductDto)
  }

  @Get()
  findAllProducs(@Query() paginationDto: PaginationDto){
    
    return this.client.send({cmd:'find_all_poducts'},paginationDto)
  }


  @Get(':id')
  async getOne(@Param('id') id:string){


    return this.client.send({cmd:'find_one_product'},{id})
    .pipe(
      catchError(err =>{
        throw new RpcException(err)
      })
    )

   /*  try {
      const product= await firstValueFrom(this.productsClient.send({cmd:'find_one_product'},{id})) 
      return product;
    } catch (error) {
      throw new RpcException(error)
    } */

  }

  @Delete(':id')
    deleteProduct(@Param('id') id: string){
      return this.client.send({cmd:'delete_product'},{ id })
      .pipe(
        catchError(err =>{
          throw new RpcException(err)
        })
      )
    }
  

    @Patch(':id')
    updateProducts(
      @Param('id',ParseIntPipe) id:number,
      @Body() updateProductDto: UpdateProductDto
      ){
        return this.client.send({cmd:'update_product'},{
          id,
          ...updateProductDto
        }).pipe(
          catchError(err =>{
            throw new RpcException(err)
          })
        )
    }

}
