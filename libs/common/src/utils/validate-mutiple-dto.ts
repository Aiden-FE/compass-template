import { validateSync, ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VALIDATION_OPTION } from '@app/common';

function mergeValidationErrorMessage(errs: ValidationError[]) {
  const errMsg: string[] = [];
  errs.forEach((errValid) => {
    errMsg.push(
      // @ts-ignore
      ...Object.keys(errValid.constraints).reduce((msg, k) => {
        // @ts-ignore
        msg.push(errValid.constraints[k]);
        return msg;
      }, []),
    );
  });
  return errMsg.join(';');
}

export default function validateMultipleDto(data: object, dtos: (new () => any)[], condition: 'AND' | 'OR' = 'OR') {
  const errValids: (ValidationError | true)[] = dtos.reduce((valid, Dto) => {
    const d = new Dto();
    Object.keys(data).forEach((key) => {
      d[key] = data[key];
    });
    const errValidations = validateSync(d, VALIDATION_OPTION);
    if (!errValidations || errValidations.length === 0) {
      // @ts-ignore
      valid.push(true);
    } else {
      // @ts-ignore
      valid.push(...errValidations);
    }
    return valid;
  }, []);
  // 并集
  if (condition === 'AND') {
    const result: ValidationError[] = errValids.filter((valid) => valid !== true) as ValidationError[];
    if (result.length) {
      throw new HttpException(mergeValidationErrorMessage(result), HttpStatus.BAD_REQUEST);
    }
  }
  // 或集
  const result = errValids.find((valid) => valid === true);
  if (!result) {
    throw new HttpException(mergeValidationErrorMessage(errValids as ValidationError[]), HttpStatus.BAD_REQUEST);
  }
}
