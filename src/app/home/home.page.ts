import { ReadVarExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera } from '@capacitor/camera';
import {
  CameraResultType,
  CameraSource,
} from '@capacitor/camera/dist/esm/definitions';
import { PoNavbarItem, PoUploadFileRestrictions } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  navbarItems: Array<PoNavbarItem> = [
    {
      label: 'Teste',
      link: '',
    },
    {
      label: 'Navbar',
    },
    {
      label: 'PO-UI',
    },
  ];
  onlyImageUpload: PoUploadFileRestrictions = {
    allowedExtensions: ['.jpg', '.png'],
  };
  photoIonic!: SafeResourceUrl;
  photoPoUi!: any;

  constructor(private sanitizer: DomSanitizer) {}

  async takePicture(framework: 'ionic' | 'po-ui') {
    this.photoIonic = '';
    this.photoPoUi = '';
    const image = Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true,
    });
    const photo: any = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && (await image).dataUrl!
    );
    console.log(photo);
    if (framework === 'ionic') this.photoIonic = photo;
    else this.photoPoUi = photo.changingThisBreaksApplicationSecurity;

    this.downloadImage((await image).dataUrl!, (await image).base64String!);
  }

  async downloadImage(image: string, base64: string) {
    // save image to disk
    var link = document.createElement('a');
    document.body.appendChild(link); // for Firefox

    link.setAttribute('href', image);
    link.setAttribute('download', 'teste.jpg');
    // link.click();
  }

  onClick() {
    alert('deu certo');
  }

  changeUpload(event: any) {
    console.log('Evento chamado: ', event);
    if (event[0]?.rawFile) {
      const reader = new FileReader();
      reader.readAsDataURL(event[0].rawFile);
      reader.onload = (e) => {
        console.log(e);
        this.photoPoUi = e.target!.result;
      };
    } else {
      this.photoPoUi = '';
    }
  }

}
