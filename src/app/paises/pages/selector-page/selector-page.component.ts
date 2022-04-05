import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  //UI
  cargando: boolean = false;




  miFormulario: FormGroup = this.fb.group({
    region    : ['', Validators.required ],
    pais      : ['', Validators.required ],
    frontera  : ['', Validators.required ]
  })

  //Llenar selectores
  regiones   : string[] = []; 
  paises     : PaisSmall[] = [];
  fronteras  : PaisSmall[] = [];


  constructor( private fb: FormBuilder,
                private _paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this._paisesService.regiones;

    //cuando cambia la region
    // this.miFormulario.get('region')?.valueChanges
    //     .subscribe( region => {
    //       console.log(region)

    //       this._paisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         this.paises = paises;
    //         console.log(paises)
    //       })
    //     })

    //Cambiando la region
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( ( _ ) => { //limpiamos el selector de paises cuando hay cambios en la region
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      } ),
      switchMap( region => this._paisesService.getPaisesPorRegion( region ) ) //Devolvemos 
    )
    .subscribe( paises => {
      console.log( paises[0].name.common );
      this.paises = paises;
      this.cargando = false;
    })

     //Cuando cambian el pais
     this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( () => {
          this.fronteras=[];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap( codigo => this._paisesService.getPaisPorCodigo( codigo )),
        switchMap( pais => this._paisesService.getPaisesPorCodigos( pais ? pais[0].borders : [] ) )
      )
      .subscribe( paises2 => {
        
        // if(pais)
        // {
        //   this.fronteras = pais[0].borders || [];
        // }
        this.fronteras = paises2;
        this.cargando = false;

      })


    

  }


  guardar(){
   console.log( this.miFormulario.value() );
  }


  onChangePais(){
       
  }


}
