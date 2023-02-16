import {Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'genero'
})
export class GeneroPipe implements PipeTransform  {

    transform(value: string) {

        return (value === 'Masculino') 
        ? value = 'M'
        : value = 'F'
        
    }

}