import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log("llega orden", createOrderDto);

    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderpaginationDto: OrderPaginationDto) {

  try {

    const orders= await firstValueFrom(
     this.client.send('findAllOrders',  orderpaginationDto )

    )
    return orders;
  } catch (error) {
    
  }
  
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id })
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto) {

    try {
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      })

    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Patch(':id')
  changueStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.client.send('changeOrderStatus',{id, status: statusDto.status})
    } catch (error) {
      throw new RpcException(error);
      
    }
 
            
    
  }
}

