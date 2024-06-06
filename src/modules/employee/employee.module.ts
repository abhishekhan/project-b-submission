import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmployeeEntity } from 'src/entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueService } from 'src/services/queue.service';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([EmployeeEntity]),
    DatabaseModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, QueueService, EmailService],
})
export class EmployeeModule {}
