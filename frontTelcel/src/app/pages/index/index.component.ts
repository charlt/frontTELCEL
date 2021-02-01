import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import noUiSlider from "nouislider";
import { RadioBaseService } from '../../services/radiobase.service';
@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})

export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  muestraRadio = false;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  busqueda1 = ''
  radiobasesGral = []
  radiobasesGralAhora = []
  totals = 0;
  page = 1;
  rows = []
  columns = [{ name: 'radiobase' }, { name: 'consultar' }];
  detail = [];
  actual=[]
  displayedColumns = ["radiobase", "consultar"];
  busqueda2 = '';
  constructor(private radioBaseService: RadioBaseService,) { }
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    this.radioBaseService.obtenerRadiobases().subscribe(radiobases => {
      let arreglo = [];
      let miindice = 1;
      for (let index = 0; index < radiobases.data.length; index++) {
        if (miindice <= 100) {
          let element = radiobases.data[index];
          arreglo.push(element)
          miindice++;
        } else {
          this.radiobasesGral.push(arreglo)
          miindice = 1;
          arreglo = []
        }
      }
      this.radiobasesGralAhora = this.radiobasesGral[0];
      this.totals = this.radiobasesGral.length * 10;
    })

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  getDataRegion() {
    let name = this.actual[0].radiobase
    if (this.busqueda2) {

      this.detail = []
      this.radioBaseService.obtenerRadiobasesDetailRegion(name, this.busqueda2).subscribe(radiobases => {

        for (let index = 0; index < radiobases.data.length; index++) {
          const element = radiobases.data[index];


          if (parseInt(element.trafico) < 15) {
            element.style = "btn-danger"
          } else if (parseInt(element.trafico) > 15 && parseInt(element.trafico) <= 40) {
            element.style = "btn-warning"
          } else if (parseInt(element.trafico) > 40 && parseInt(element.trafico) <= 90) {
            element.css = "background:yellow !important;color:black !important"
          } else if (parseInt(element.trafico) > 90) {
            element.style = "btn-success"
          }
          this.detail.push(element);
        }
        this.muestraRadio = true;
      })
    } else {
      this.detail = []
      this.radioBaseService.obtenerRadiobasesDetail(name).subscribe(radiobases => {
        for (let index = 0; index < radiobases.data.length; index++) {
          const element = radiobases.data[index];
          if (parseInt(element.trafico) < 15) {
            element.style = "btn-danger"
          } else if (parseInt(element.trafico) > 15 && parseInt(element.trafico) <= 40) {
            element.style = "btn-warning"
          } else if (parseInt(element.trafico) > 40 && parseInt(element.trafico) <= 90) {
            element.css = "background:yellow !important;color:black !important"
          } else if (parseInt(element.trafico) > 90) {
            element.style = "btn-success"
          }
          this.detail.push(element);
        }
        this.muestraRadio = true;
      })
    }
  }
  getDataRadiobase(radiobase) {
    this.detail = []
    this.actual=[]
    this.radioBaseService.obtenerRadiobasesDetail(radiobase).subscribe(radiobases => {
      for (let index = 0; index < radiobases.data.length; index++) {
        const element = radiobases.data[index];


        if (parseInt(element.trafico) < 15) {
          element.style = "btn-danger"
        } else if (parseInt(element.trafico) > 15 && parseInt(element.trafico) <= 40) {
          element.style = "btn-warning"
        } else if (parseInt(element.trafico) > 40 && parseInt(element.trafico) <= 90) {
          element.css = "background:yellow !important;color:black !important"
        } else if (parseInt(element.trafico) > 90) {
          element.style = "btn-success"
        }
        this.detail.push(element);
        
      }
      this.actual.push(this.detail[0])
      this.muestraRadio = true;
    })
  }

  getData() {
    this.muestraRadio = false;
    if (this.busqueda1 != "") {
      this.radioBaseService.obtenerRadiobasesByName(this.busqueda1).subscribe(radiobases => {
        this.radiobasesGral = []
        let arreglo = [];
        let miindice = 1;
        for (let index = 0; index < radiobases.data.length; index++) {

          if (miindice <= 100) {
            let element = radiobases.data[index];
            arreglo.push({ "_id": element.radiobase })
            miindice++;
          } else {
            this.radiobasesGral.push(arreglo)
            miindice = 1;
            arreglo = []
          }
        }
        if (miindice < 100) {
          this.radiobasesGral.push(arreglo)

        }
        this.radiobasesGralAhora = this.radiobasesGral[0];
        this.totals = this.radiobasesGral.length * 10;
      })


    } else {
      this.radioBaseService.obtenerRadiobases().subscribe(radiobases => {
        this.radiobasesGral = []

        let arreglo = [];
        let miindice = 1;
        for (let index = 0; index < radiobases.data.length; index++) {
          if (miindice <= 100) {
            let element = radiobases.data[index];
            arreglo.push(element)
            miindice++;
          } else {
            this.radiobasesGral.push(arreglo)
            miindice = 1;
            arreglo = []
          }
        }
        this.radiobasesGralAhora = this.radiobasesGral[0];
        this.totals = this.radiobasesGral.length * 10;
      })
    }
  }
}

export interface UserData {
  radiobase: string;
  consultar: string;
}