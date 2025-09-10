import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
//control hace referencia a una caja de texto o cualquier componente
//hay dos posibles resultados que se muestre el error de validacion
//o si toda la data se ingreso correctamente retorno un null
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //se toma los dos valores de la caja de texto
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');
//se pregunta si son iguales y se retorna null
  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }
// y si los dos son diferentes se retorna los errores
//se setean mediante setErrors
  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
    confirmPasswordControl.setErrors(null);
  }

  return null;
};
