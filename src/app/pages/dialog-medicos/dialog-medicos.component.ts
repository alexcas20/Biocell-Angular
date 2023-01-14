import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Register from 'src/app/models/register.interface';
import RegistroMedico from 'src/app/models/registerMedicos.interface';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-medicos',
  templateUrl: './dialog-medicos.component.html',
  styleUrls: ['./dialog-medicos.component.css'],
})
export class DialogMedicosComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Guardar';
  hide = true;

  folioCode = ['B','C','L','A','B','B','C','L','A','B']
  folioCode2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
  folioRandomCode = Math.floor(Math.random()*this.folioCode.length)
  folioPositionCode = this.folioCode[this.folioRandomCode]

  folioRandomCode2 = Math.floor(Math.random()*this.folioCode2.length)
  folioPositionCode2 = this.folioCode2[this.folioRandomCode2]
  folioRandomNumber = Math.floor(Math.random()*10000)

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogMedicosComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      folio: ["MBCL"+this.folioPositionCode+this.folioPositionCode2+this.folioRandomNumber,Validators.required],
      nombreMedico: ['', [Validators.required, Validators.maxLength(30)]],
      apellidoP:['',Validators.required],
      apellidoM:['',Validators.required],
      especialidad:['',Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.maxLength(120)]],
    });

    if (this.editData) {
      console.log(this.editData);
      this.actionBtn = 'Actualizar';
      this.productForm.controls['folio'].setValue(this.editData.folio);
      this.productForm.controls['nombreMedico'].setValue(this.editData.nombreMedico);
      this.productForm.controls['apellidoP'].setValue(this.editData.apellidoP);
      this.productForm.controls['apellidoM'].setValue(this.editData.apellidoM);
      this.productForm.controls['especialidad'].setValue(this.editData.especialidad);
      this.productForm.controls['edad'].setValue(this.editData.edad);
      this.productForm.controls['sexo'].setValue(this.editData.sexo);
      this.productForm.controls['telefono'].setValue(this.editData.telefono);
      this.productForm.controls['correo'].setValue(this.editData.correo);
    }
  }

  addMedico(form: RegistroMedico) {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postMedicos(form).subscribe({
          next: (res) => {
            Swal.fire('Exito', 'Se ha registrado al medico', 'success');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            Swal.fire(
              'Error',
              'Se ha producido un error al registar al medico',
              'error'
            );
          },
        });
      }
    } else {
      this.updateMedico(form);
    }
  }

  updateMedico(form: RegistroMedico) {
    console.log(this.productForm.get('folio')?.value);
    this.api.putMedico(this.productForm.get('folio')?.value, form).subscribe({
      next: (res) => {
        Swal.fire('Exito', 'Se ha actualizado el Medico', 'success');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        Swal.fire(
          'Exito',
          'Se ha producido un error al actualizar el Medico',
          'error'
        );
      },
    });
  }
}
