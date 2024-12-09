import { PartialType } from '@nestjs/mapped-types';
import { CreateProvisionerDto } from './create-provisioner.dto';

export class UpdateProvisionerDto extends PartialType(CreateProvisionerDto) {}
