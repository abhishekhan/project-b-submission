import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/api/v1/employees')
  createEmployee(@Body() data: Employee, @Res() res) {
    return this.employeeService.createEmployee(data, res);
  }

  @Get('/api/v1/employees/:id')
  getEmployee(@Param('id') id: string, @Res() res) {
    return this.employeeService.getEmployee(id, res);
  }

  @Patch('/api/v1/employees/:id')
  updateEmployee(@Param('id') id: string, @Body() data: Employee, @Res() res) {
    return this.employeeService.updateEmployee(id, data, res);
  }

  @Delete('/api/v1/employees/:id')
  deleteEmployee(@Param('id') id: string, @Res() res) {
    return this.employeeService.deleteEmployee(id, res);
  }
}
