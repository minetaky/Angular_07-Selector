import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  guardar(){
   console.log( this.miFormulario.value() );
  }

}
