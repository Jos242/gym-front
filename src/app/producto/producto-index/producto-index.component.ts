import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-producto-index',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,MatDividerModule,
    MatCheckboxModule,
    MatSliderModule,
    MatMenuModule,
    RouterLink, 
    CommonModule,
  ],
  templateUrl: './producto-index.component.html',
  styleUrl: './producto-index.component.scss'
})
export class ProductoIndexComponent {
  value = '';
  max = 5000000;
  min = 0;
  step = 50000;
  thumbLabel = false;
  value2 = 0;

  filteredProducts = [];  // Lista filtrada de productos
  searchValue: string = '';

  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  datosImgs: any;
  datosComb:any;
  baseUrl: string = environment.apiURL;

  constructor(private gService:GenericService,
    private router:Router,
    private route:ActivatedRoute,
    private httpClient:HttpClient,
    private sanitizer: DomSanitizer
    ){
      this.listaProductos();
      
    }

  ngOnInit(): void {
    
  }

  listaProductos(){
    this.gService.list('all-products/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.datos=data;
        console.log(this.datos);
        // this.filteredProducts = data;
        this.listaImagenes();
      });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  hideFilters(){
    console.log("hola")
  }

  ordernarPor(){
    console.log("hola2")
  }

  // onSearchChange(): void {
  //   this.filterProducts();
  //   // console.log(this.filterProducts())
  // }

  // onPriceChange(): void {
  //   this.filterProducts();
  // }


  // filterProducts(): void {
  //   this.filteredProducts = this.datosComb.filter(product => {
  //     const matchesSearch = product.pname.toLowerCase().includes(this.searchValue.toLowerCase()) ||
  //                           product.pdescription.toLowerCase().includes(this.searchValue.toLowerCase());
  //     const withinPriceRange = product.pprice >= this.min && product.pprice <= this.max;
  //     console.log(matchesSearch)
  //     return matchesSearch && withinPriceRange;
  //   });
  // }

  listaImagenes(){
    this.gService.list('imgs-names/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.datosImgs=data;
        console.log(this.datosImgs);

        this.datosComb = this.datos.map(product => {
          const imageData = this.datosImgs.find(image => image.id === product.id);
          if (imageData) {
            console.log(product);
            return {
              ...product,
              imgUrl: imageData.imgs_list.length ? `${this.baseUrl}${product.pimgspath}${imageData.imgs_list[0]}` : null
            };
          }
          return product;
        });
        console.log("datos:" );
        console.log(this.datosComb);
      });
  }


  

}