import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { QueueService } from '../../services/queue.service';
import * as Joi from 'joi';

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  jobTitle: Joi.string().required(),
  email: Joi.string().required().email(),
  department: Joi.string().valid('TECH', 'MARKETING'),
});

@Injectable()
export class EmployeeService {
  constructor(
    private readonly queueService: QueueService,
    @InjectRepository(EmployeeEntity)
    private employeeRepo: Repository<EmployeeEntity>,
  ) {}
  async createEmployee(data: Employee, res) {
    try {
      const { error } = employeeSchema.validate(data);
      if (error) {
        return res.json({
          success: false,
          message: error.details.map((o) => o.message).join(', '),
        });
      }
      const employee = await this.employeeRepo.save(data);
      await this.queueService.addToQueue(data.email);
      return res.json({
        success: true,
        data: {
          employee,
        },
      });
    } catch (e) {
      return res.json({
        success: false,
        message: e.message,
      });
    }
  }
  async updateEmployee(id: string, data: Employee, res) {
    try {
      const { error } = employeeSchema.validate(data);
      if (error) {
        return res.json({
          success: false,
          message: error.details.map((o) => o.message).join(', '),
        });
      }
      await this.employeeRepo.update(
        { id },
        { jobTitle: data.jobTitle, department: data.department },
      );
      await res.json({
        success: true,
      });
    } catch (e) {
      res.json({
        success: false,
        message: e.message,
      });
    }
  }
  async getEmployee(id, res) {
    const employee = await this.employeeRepo.findOne({
      where: {
        id,
      },
    });
    return res.json({
      success: true,
      data: {
        employee,
      },
    });
  }
  async deleteEmployee(id, res) {
    await this.employeeRepo.softDelete({
      id,
    });
    return res.json({
      success: true,
    });
  }
}
