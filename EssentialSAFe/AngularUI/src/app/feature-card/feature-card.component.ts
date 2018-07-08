import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feature } from '../feature/feature.component';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  editing: boolean = false;
  constructor() { }

  @Output() updated = new EventEmitter<Feature>();
  @Output() deleted = new EventEmitter<Feature>();


  @Input() feature: Feature;

  edit(): void {
    this.editing = true;
  }

  save(): void {
    this.editing = false;
    console.log(this.feature.Name);
    this.updated.emit(this.feature);
  }

  delete(): void {
    this.deleted.emit(this.feature);
  }

  ngOnInit() {
  }

}
