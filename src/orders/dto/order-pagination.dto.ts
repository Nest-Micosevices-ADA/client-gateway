import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStausList } from "../enum/order.enum";

export  class OrderPaginationDto extends PaginationDto{

    @IsOptional()
    @IsEnum(OrderStausList,{
        message:`Valid status are ${OrderStausList}`
    })
    status: OrderStatus
}