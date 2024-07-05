import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStausList } from "../enum/order.enum";

export class StatusDto{

    @IsOptional()
    @IsEnum(OrderStausList,{
        message:`Valid status are ${OrderStausList}`
    })
    status: OrderStatus;
}
    