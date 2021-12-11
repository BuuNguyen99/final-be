import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { object, ObjectSchema, string } from 'joi';

@Injectable()
export class CreateUserValidation implements PipeTransform {
  private schema: ObjectSchema;
  constructor() {
    this.schema = object({
      deviceToken: string().required(),
    });
  }
  transform(value: any): any {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException('VALIDATION ERROR HERE');
    }

    return value;
  }
}
