import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements AfterViewInit {
  @Input() index;
  @Input() file;
  @Input() updatable;
  @Input() removable;
  @Output() update = new EventEmitter;
  @Output() delete = new EventEmitter;
  @ViewChild("img", {static: false}) img: ElementRef;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    if (this.file.url) {
      this.img.nativeElement.src = this.url;
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.img.nativeElement.src = reader.result;
    };
  }

  onUpdate(target: HTMLInputElement) {
    this.file = target.files[0];
    this.fileInput.nativeElement.value = '';

    const reader = new FileReader();

    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.img.nativeElement.src = reader.result;
    };

    this.update.emit({index: this.index, file: this.file});
  }

  onDelete() {
    this.delete.emit(this.file);
  }

  get url() {
    return this.file.url;
  }
}
