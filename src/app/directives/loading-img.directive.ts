import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[LoadingImg]',
})
export class LoadingImgDirective {
  constructor(private elementImg: ElementRef) {}
  private check: number = 0;

  @HostListener('load')
  onLoad(): any {
    console.log(`Directive loaded!`);

    // this.elementImg.nativeElement.src =
    //   'https://icon-library.com/images/gif-loading-icon/gif-loading-icon-16.jpg';
  }
  @HostListener('loadstart')
  onLoadStart(): any {
    console.log(`Directive is loading!`);

    // this.elementImg.nativeElement.src =
    //   'https://icon-library.com/images/gif-loading-icon/gif-loading-icon-16.jpg';
  }
}
