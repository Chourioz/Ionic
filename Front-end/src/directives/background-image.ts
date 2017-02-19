import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[background-image]'
})

export class BackgroundImage {

  private elm: HTMLElement;

  constructor(elm: ElementRef){
    this.elm = elm.nativeElement;
  }

  @Input('background-image') backgroundImage: string;

  ngAfterViewInit(){
    this.elm.style.backgroundImage = 'url('+this.backgroundImage+')';
  }
}
