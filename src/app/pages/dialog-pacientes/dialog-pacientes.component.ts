import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import RegistroPaciente from 'src/app/models/registerPaciente.interface';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog-pacientes',
  templateUrl: './dialog-pacientes.component.html',
  styleUrls: ['./dialog-pacientes.component.css']
})
export class DialogPacientesComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Guardar"
  hide = true;
  
  folioCode = ['B','C','L','A','B']
  folioCode2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
  folioRandomCode = Math.floor(Math.random()*this.folioCode.length)
  folioPositionCode = this.folioCode[this.folioRandomCode]

  folioRandomCode2 = Math.floor(Math.random()*this.folioCode2.length)
  folioPositionCode2 = this.folioCode2[this.folioRandomCode2]
  folioRandomNumber = Math.floor(Math.random()*10000)


  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogPacientesComponent>) { }

  ngOnInit(): void {
  
    this.productForm = this.formBuilder.group({
      folio: ["BCL"+this.folioPositionCode+this.folioPositionCode2+this.folioRandomNumber,Validators.required],
      nombre : ['',[Validators.required, Validators.maxLength(30)]],
      apellidoP : ['',[Validators.required, Validators.maxLength(30)]],
      apellidoM: ['',[Validators.required, Validators.maxLength(30)]],
      edad:['',Validators.required],
      sexo:['',Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      correo:['',[Validators.required, Validators.maxLength(120)]]
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
  
    addPaciente(form:RegistroPaciente){
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
        this.editPaciente(form)
      }
    }
  
  
    editPaciente(form:RegistroPaciente){
      console.log(this.productForm.get("folio")?.value)
      this.api.updatePaciente(this.productForm.get("folio")?.value, form).subscribe({
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
  

