import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Medicine } from '../_model/medicine.model';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { MedicineService } from '../_services/medicine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  medicineDetails: Medicine[] = [];

  pageNumber: number = 0;
  showLoadButton = false;

  constructor(private medicineService: MedicineService, private imageProcessingService: ImageProcessingService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllMedicines();
  }

  searchByKeyword(searchkeyword: any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.medicineDetails = [];
    this.getAllMedicines(searchkeyword);
  }

  public getAllMedicines(searchKey: string = "") {
    this.medicineService.getAllMedicines(this.pageNumber, searchKey)
      .pipe(
        map((x: Medicine[], i) => x.map((medicine: Medicine) => this.imageProcessingService.createImages(medicine)))
      )
      .subscribe(
        (resp: Medicine[]) => {

          console.log(resp);
          if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          resp.forEach(m => this.medicineDetails.push(m))
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }

      );
  }
  public loadMoreProduct() {

    this.pageNumber = this.pageNumber + 1;
    this.getAllMedicines();
  }


  showMedicineDetails(medicineId: any) {

    this.router.navigate(['/medicineViewDetails', { medicineId: medicineId }]);
  }


}
