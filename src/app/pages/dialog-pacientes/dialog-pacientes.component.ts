import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Register from 'src/app/models/register.interface';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-pacientes',
  templateUrl: './dialog-pacientes.component.html',
  styleUrls: ['./dialog-pacientes.component.css']
})
export class DialogPacientesComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Guardar"
  hide = true;

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      folio: ["",Validators.required],
      nombre : ['',Validators.required],
      apellidoP : ['',Validators.required],
      apellidoM: ['',Validators.required],
      edad:['',Validators.required],
      sexo:['',Validators.required],
      telefono: ['', Validators.required],
      correo:['',Validators.required]
    });

    if(this.editData){
      console.log(this.editData);
      this.actionBtn = "Actualizar";
      this.productForm.controls["folio"].setValue(this.editData.folio);
      this.productForm.controls["nombre"].setValue(this.editData.nombre);
      this.productForm.controls["apellidoP"].setValue(this.editData.apellidoP);
      this.productForm.controls["apellidoM"].setValue(this.editData.apellidoM);
      this.productForm.controls["edad"].setValue(this.editData.edad);
      this.productForm.controls["sexo"].setValue(this.editData.sexo);
      this.productForm.controls["telefono"].setValue(this.editData.telefono);
      this.productForm.controls["correo"].setValue(this.editData.correo);
      }
    }
  
    addPaciente(form:Register){
      if(!this.editData){
        if(this.productForm.valid){
          this.api.postPaciente(form).subscribe({
            next:(res)=>{
              Swal.fire('Exito','Se ha registrado el usuario','success')
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              Swal.fire('Error','Se ha producido un error al registar el usuario','error')
            }
          })
        }
      }else{
        this.updateUser(form)
      }
    }
    updateUser(form:Register){
      console.log(this.productForm.get("code")?.value)
      this.api.putUser(this.productForm.get("code")?.value, form).subscribe({
        next:(res)=>{
          Swal.fire('Exito','Se ha actualizado el usuario','success')
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          Swal.fire('Exito','Se ha producido un error al actualizar el usuario','error')
        }
      })
    }
  }

